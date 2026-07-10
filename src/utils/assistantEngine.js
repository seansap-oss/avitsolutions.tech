const stopWords = new Set([
  'a','an','and','are','as','at','be','can','could','do','does','for','from','how','i','in','is','it','me','my','of','on','or','our','please','tell','that','the','their','this','to','us','we','what','when','where','which','who','why','with','would','you','your'
]);

export function normalizeQuery(value = '') {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#./\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function meaningfulTokens(value) {
  return normalizeQuery(value)
    .split(' ')
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function tokenSimilarity(a, b) {
  if (a === b) return 1;
  if (a.length >= 5 && b.length >= 5 && (a.startsWith(b) || b.startsWith(a))) return 0.72;
  return 0;
}

export function findBestKnowledgeResponse(query, entries) {
  const normalized = normalizeQuery(query);
  if (!normalized) return { match: null, score: 0 };

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(normalized)) {
    return { match: { id: 'greeting', answer: 'Hello. How can I help you with AviT Solutions today? You can ask about the Founder and CEO, AV, IT, ERP, automation, software, project experience or support.' }, score: 100 };
  }

  if (/\b(thank you|thanks|thankyou)\b/.test(normalized)) {
    return { match: { id: 'thanks', answer: 'You are welcome. Ask another AviT Solutions question, or use the contact option if you would like the sales or support team to follow up.' }, score: 100 };
  }

  const queryTokens = meaningfulTokens(normalized);
  let best = null;
  let bestScore = 0;

  for (const entry of entries) {
    let score = 0;
    const title = normalizeQuery(entry.title);
    const searchable = `${title} ${entry.keywords.join(' ')} ${entry.answer}`;
    const entryTokens = meaningfulTokens(searchable);

    if (normalized.includes(title) && title.length > 3) score += 8;

    for (const keywordRaw of entry.keywords) {
      const keyword = normalizeQuery(keywordRaw);
      if (!keyword) continue;
      if (normalized === keyword) score += 14;
      else if (normalized.includes(keyword)) score += keyword.includes(' ') ? 9 : 5;

      const keywordTokens = meaningfulTokens(keyword);
      for (const qToken of queryTokens) {
        for (const kToken of keywordTokens) score += tokenSimilarity(qToken, kToken) * 1.8;
      }
    }

    for (const qToken of queryTokens) {
      let strongest = 0;
      for (const eToken of entryTokens) strongest = Math.max(strongest, tokenSimilarity(qToken, eToken));
      score += strongest * 0.75;
    }

    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  return { match: bestScore >= 2.4 ? best : null, score: bestScore };
}
