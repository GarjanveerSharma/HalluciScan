export interface EvidenceItem {
  source: string;
  url: string;
  snippet: string;
}

/**
 * Search Wikipedia for evidence related to a claim.
 * Uses the free Wikipedia API — no API key required.
 */
export async function searchEvidence(claim: string): Promise<EvidenceItem[]> {
  const evidence: EvidenceItem[] = [];

  try {
    // Step 1: Search Wikipedia for relevant articles
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      claim
    )}&srlimit=3&format=json&origin=*`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.query?.search?.length) {
      return evidence;
    }

    // Step 2: Get snippets from each matching article
    for (const result of searchData.query.search) {
      // Clean HTML tags from Wikipedia snippet
      const cleanSnippet = result.snippet
        .replace(/<[^>]*>/g, '')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      evidence.push({
        source: `Wikipedia: ${result.title}`,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(
          result.title.replace(/ /g, '_')
        )}`,
        snippet: cleanSnippet,
      });
    }

    // Step 3: Get the extract (summary) of the top article for richer evidence
    if (searchData.query.search.length > 0) {
      const topTitle = searchData.query.search[0].title;
      const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        topTitle
      )}&prop=extracts&exintro=true&explaintext=true&exsentences=5&format=json&origin=*`;

      const extractResponse = await fetch(extractUrl);
      const extractData = await extractResponse.json();

      const pages = extractData.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId]?.extract;
        if (extract && extract.length > 20) {
          evidence.unshift({
            source: `Wikipedia (Summary): ${topTitle}`,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(
              topTitle.replace(/ /g, '_')
            )}`,
            snippet: extract.substring(0, 500),
          });
        }
      }
    }
  } catch (error) {
    console.error('Wikipedia search failed for claim:', claim, error);
  }

  return evidence;
}
