const http = require('http');
http.get('http://localhost:5174/projects/Project-1-image.webp', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.on('data', () => {});
  res.on('end', () => console.log('Done'));
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
