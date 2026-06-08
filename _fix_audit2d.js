var fs = require('fs');
var c = fs.readFileSync('post-audit-second.html', 'utf8');

// Fix: remove trailing ' after } in the inserted record
// Find: }' ,\n  { id:'PS20260522001'
// Replace: },\n  { id:'PS20260522001'
c = c.replace("}' ,\n  { id:'PS20260523001'", "},\n  { id:'PS20260523001'");

fs.writeFileSync('post-audit-second.html', c, 'utf8');
console.log('Fixed');
