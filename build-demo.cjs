const fs=require('node:fs');const path=require('node:path');const root=__dirname;
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html').replace('<link rel="stylesheet" href="src/style.css">','<style>'+read('src/style.css')+'</style>').replace('<script defer src="src/engine.js"></script><script defer src="src/ui.js"></script>','').replace('</body>','<script>'+read('src/engine.js')+'</script><script>'+read('src/ui.js')+'</script></body>');
fs.writeFileSync(path.join(root,'demo.html'),html);
