const fs = require('fs');
const acorn = require('acorn');
const html = fs.readFileSync('/Users/anakolte/Documents/GitHub/My-Premium-Portfolio/public/landing-pages/complete-shelf-v2.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)];

scriptMatches.forEach((match, index) => {
  const code = match[1];
  try {
    acorn.parse(code, { ecmaVersion: 2022, sourceType: 'module' });
    console.log(`Script ${index} is valid`);
  } catch (e) {
    console.error(`Script ${index} error at line ${e.loc.line}, col ${e.loc.column}: ${e.message}`);
    // Show surrounding lines
    const lines = code.split('\n');
    console.log(lines.slice(Math.max(0, e.loc.line - 3), e.loc.line + 3).join('\n'));
  }
});
