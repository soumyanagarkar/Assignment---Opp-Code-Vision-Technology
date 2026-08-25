function normalize(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const matrix = Array.from(
    { length: b.length + 1 },
    () => Array(a.length + 1).fill(0)
  );

  for (let i = 0; i <= b.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] =
          matrix[i - 1][j - 1];
      } else {
        matrix[i][j] =
          Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + 1
          );
      }
    }
  }

  return matrix[b.length][a.length];
}

function similarity(a, b) {
  if (!a || !b) return 0;

  const distance = levenshtein(a, b);

  return (
    1 -
    distance /
      Math.max(a.length, b.length)
  );
}

function searchCompanies(
  companies,
  query,
  limit = 10
) {
  const normalizedQuery =
    normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  const queryWords =
    normalizedQuery.split(" ");

  const scored = companies
    .map((company) => {
      const name =
        normalize(company.name);

      const ticker =
        normalize(company.ticker);

      const sector =
        normalize(company.sector);

      const aliases =
        (company.aliases || [])
          .map(normalize);

      let score = 0;

      // --------------------------------
      // 1. Exact ticker
      // --------------------------------

      if (ticker === normalizedQuery) {
        score += 1000;
      }

      // --------------------------------
      // 2. Exact company name
      // --------------------------------

      if (name === normalizedQuery) {
        score += 950;
      }

      // --------------------------------
      // 3. Alias exact match
      // --------------------------------

      if (
        aliases.includes(
          normalizedQuery
        )
      ) {
        score += 900;
      }

      // --------------------------------
      // 4. Ticker starts with query
      // --------------------------------

      if (
        ticker.startsWith(
          normalizedQuery
        )
      ) {
        score += 800;
      }

      // --------------------------------
      // 5. Company starts with query
      // --------------------------------

      if (
        name.startsWith(
          normalizedQuery
        )
      ) {
        score += 750;
      }

      // --------------------------------
      // 6. Any word starts with query
      // --------------------------------

      const nameWords =
        name.split(" ");

      for (const word of nameWords) {
        if (
          word.startsWith(
            normalizedQuery
          )
        ) {
          score += 600;
        }
      }

      // --------------------------------
      // 7. Query appears in company name
      // --------------------------------

      if (
        name.includes(
          normalizedQuery
        )
      ) {
        score += 500;
      }

      // --------------------------------
      // 8. Query appears in ticker
      // --------------------------------

      if (
        ticker.includes(
          normalizedQuery
        )
      ) {
        score += 450;
      }

      // --------------------------------
      // 9. Multiple word matching
      // --------------------------------

      for (const word of queryWords) {
        if (
          nameWords.some(
            (nameWord) =>
              nameWord.startsWith(word)
          )
        ) {
          score += 100;
        }
      }

      // --------------------------------
      // 10. Sector match
      // --------------------------------

      if (
        sector.includes(
          normalizedQuery
        )
      ) {
        score += 100;
      }

      // --------------------------------
      // 11. Fuzzy company-name match
      // --------------------------------

      const nameSimilarity =
        similarity(
          normalizedQuery,
          name
        );

      if (
        normalizedQuery.length >= 3 &&
        nameSimilarity >= 0.65
      ) {
        score +=
          Math.round(
            nameSimilarity * 200
          );
      }

      // --------------------------------
      // 12. Fuzzy ticker match
      // --------------------------------

      const tickerSimilarity =
        similarity(
          normalizedQuery,
          ticker
        );

      if (
        normalizedQuery.length >= 2 &&
        tickerSimilarity >= 0.65
      ) {
        score +=
          Math.round(
            tickerSimilarity * 250
          );
      }

      return {
        ...company,
        score
      };
    })
    .filter(
      (company) =>
        company.score > 0
    )
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .slice(0, limit);

  return scored.map(
    ({
      score,
      ...company
    }) => company
  );
}

module.exports = {
  searchCompanies
};