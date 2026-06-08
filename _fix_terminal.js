const fs = require('fs');
let c = fs.readFileSync('promote-list-teacher.html', 'utf8');

// The code has: onclick="viewDetail('" + r.id + "')" - the \" is JS escaping for HTML attribute quotes
// In the file it looks like: onclick="viewDetail(\'" + r.id + "\')"

// Match the pattern: first_rejected case with editRecord
const oldPattern = "if (r.status === 'first_rejected') {\n" +
"        h += '<a class=\"action-link\" onclick=\"viewDetail(\\')" + r.id + "\\')\">查看</a>';\n" +
"        h += '<a class=\"action-link\" onclick=\"editRecord(\\')" + r.id + "\\')\">编辑重提</a>';";

// This won't work because of the complex escaping. Let me try a different approach.
// Just match the editRecord line directly

c = c.replace(
  "h += '<a class=\"action-link\" onclick=\"editRecord(\\'' + r.id + '\\')\">编辑重提</a>';",
  ""
);

// Also fix the if condition to include completed
c = c.replace(
  "if (r.status === 'first_rejected')",
  "if (r.status === 'first_rejected' || r.status === 'completed')"
);

fs.writeFileSync('promote-list-teacher.html', c, 'utf8');
console.log('Done');

const ss = c.indexOf('<script>') + 8;
const se = c.indexOf('</script>', ss);
try { new Function(c.substring(ss, se)); console.log('Syntax OK'); } catch(e) { console.log('ERROR: ' + e.message.substring(0,60)); }
