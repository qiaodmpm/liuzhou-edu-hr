const fs = require('fs');
let c = fs.readFileSync('promote-list-teacher.html', 'utf8');

// Remove "编辑重提" for first_rejected (now terminal state)
// Old: if (r.status === 'first_rejected') { view + editRecord }
// New: if (r.status === 'first_rejected' || r.status === 'completed') { view only }
c = c.replace(
  "if (r.status === 'first_rejected') {\n" +
  "        h += '<a class=\"action-link\" onclick=\"viewDetail(\\'\" + r.id + \"\\')\">查看</a>';\n" +
  "        h += '<a class=\"action-link\" onclick=\"editRecord(\\'\" + r.id + \"\\')\">编辑重提</a>';",

  "if (r.status === 'first_rejected' || r.status === 'completed') {\n" +
  "        h += '<a class=\"action-link\" onclick=\"viewDetail(\\'\" + r.id + \"\\')\">查看</a>';"
);

fs.writeFileSync('promote-list-teacher.html', c, 'utf8');
console.log('Done');

const ss = c.indexOf('<script>') + 8;
const se = c.indexOf('</script>', ss);
try { new Function(c.substring(ss, se)); console.log('Syntax OK'); } catch(e) { console.log('ERROR: ' + e.message.substring(0,60)); }
