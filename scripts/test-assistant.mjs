import assert from 'node:assert/strict';
import { companyKnowledge } from '../src/data/companyKnowledge.js';
import { findBestKnowledgeResponse } from '../src/utils/assistantEngine.js';

const tests = [
  ['Who is the founder and CEO?', 'founder-ceo'],
  ['How did the founder start his career?', 'founder-journey'],
  ['Can you build a boardroom with video conferencing?', 'av-services'],
  ['Do you work with Crestron and AMX control systems?', 'control-automation'],
  ['Can you design AV over IP and VLAN networks?', 'it-networking'],
  ['Can you build an ERP for my business?', 'software-erp'],
  ['Can you make logistics and warehouse tracking software?', 'tracking-logistics'],
  ['Do you develop Android mobile apps and websites?', 'web-mobile'],
  ['How do you design the user interface?', 'ui-ux'],
  ['What industry certifications and training do you have?', 'training-certifications'],
  ['Have you worked in hospitals, government and stadiums?', 'experience-sectors'],
  ['Can you handle a multi-site enterprise project?', 'scale'],
  ['How do you begin a new project?', 'approach'],
  ['Can you work with a small budget?', 'budget'],
  ['Do you provide maintenance after installation?', 'support'],
  ['What is your vision for North East India?', 'vision'],
  ['How can I contact sales?', 'contact'],
  ['What does AviT Solutions do?', 'company-overview'],
];

for (const [query, expected] of tests) {
  const { match, score } = findBestKnowledgeResponse(query, companyKnowledge);
  assert.ok(match, `No match for: ${query}`);
  assert.equal(match.id, expected, `Wrong match for: ${query} (score ${score})`);
}

const fallback = findBestKnowledgeResponse('Who won the football match yesterday?', companyKnowledge);
assert.equal(fallback.match, null, 'Out-of-scope question should not match company knowledge');

const greeting = findBestKnowledgeResponse('Hello', companyKnowledge);
assert.equal(greeting.match?.id, 'greeting');

console.log(`Assistant knowledge tests passed: ${tests.length + 2}`);
