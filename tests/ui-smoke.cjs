// Optional developer smoke test. Requires Playwright and local Chromium.
const {chromium}=require('playwright');const assert=require('node:assert/strict');const path=require('node:path');const {pathToFileURL}=require('node:url');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});try{
 const page=await browser.newPage({viewport:{width:1280,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
 for(const [module,expected] of [['Unit converter','1'],['Material weight','27.5064'],['Cutting stock','5,950'],['Quantity takeoff','588'],['Section properties','584'],['Consumption & cost','105']]){
 await page.getByRole('button',{name:module,exact:true}).click();await page.getByRole('button',{name:'Calculate'}).click();assert.ok((await page.locator('#result').innerText()).includes(expected),module);assert.equal(await page.locator('#error').innerText(),'');console.log('PASS '+module);
 }
 await page.getByRole('button',{name:'Cutting stock',exact:true}).click();await page.getByRole('button',{name:'Calculate'}).click();const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download CSV'}).click()]);assert.equal(download.suggestedFilename(),'engineering-results.csv');console.log('PASS CSV browser download');
 await page.screenshot({path:path.resolve(__dirname,'../docs/dashboard.png'),fullPage:true});
 await page.locator('[name=rows]').fill('9000,1');await page.getByRole('button',{name:'Calculate'}).click();assert.match(await page.locator('#error').innerText(),/exceeds/);console.log('PASS invalid cutting list');
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Unit converter',exact:true}).click();await page.getByRole('button',{name:'Calculate'}).click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);console.log('PASS responsive mobile and no runtime errors');
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
