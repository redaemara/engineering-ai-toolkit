(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.Engineering=api;})(globalThis,()=>{
'use strict';
const num=(x,name='value',zero=false)=>{if(typeof x!=='number'||!Number.isFinite(x)||(zero?x<0:x<=0))throw Error(name+' must be '+(zero?'nonnegative':'positive')+' and finite');return x};
const qty=x=>{num(x,'quantity');if(!Number.isSafeInteger(x))throw Error('Quantity must be an integer');return x};
const units={length:{mm:.001,cm:.01,m:1,km:1000,in:.0254,ft:.3048,yd:.9144},area:{mm2:1e-6,cm2:1e-4,m2:1,ft2:.09290304,in2:.00064516,yd2:.83612736},volume:{mm3:1e-9,cm3:1e-6,m3:1,L:.001,ft3:.028316846592,in3:.000016387064,yd3:.764554857984},mass:{g:.001,kg:1,t:1000,lb:.45359237,oz:.028349523125}};
function convert(value,dimension,from,to){num(value,'value',true);const u=Object.hasOwn(units,dimension)&&units[dimension];if(!u||!Object.hasOwn(u,from)||!Object.hasOwn(u,to))throw Error('Incompatible units');return num(value*u[from]/u[to],'result',true)}
function section(shape,{b,h,d,t,a}){
 let area,ix,iy;
 if(shape==='rectangle'||shape==='plate'){num(b,'width');num(h,'height');area=b*h;ix=b*h**3/12;iy=h*b**3/12;}
 else if(shape==='rhs'){num(b,'width');num(h,'height');num(t,'thickness');if(2*t>=Math.min(b,h))throw Error('Wall too thick');area=b*h-(b-2*t)*(h-2*t);ix=(b*h**3-(b-2*t)*(h-2*t)**3)/12;iy=(h*b**3-(h-2*t)*(b-2*t)**3)/12;}
 else if(shape==='round'||shape==='chs'){num(d,'diameter');let inner=0;if(shape==='chs'){num(t,'thickness');if(2*t>=d)throw Error('Wall too thick');inner=d-2*t;}area=Math.PI*(d*d-inner*inner)/4;ix=iy=Math.PI*(d**4-inner**4)/64;}
 else if(shape==='custom'){area=num(a,'area');ix=iy=null;}else throw Error('Unknown section');
 return {area:num(area,'area'),ix:ix===null?null:num(ix,'Ix'),iy:iy===null?null:num(iy,'Iy')};
}
function weight(shape,dimensions,density,length,count=1){num(density,'density');num(length,'length');qty(count);const s=section(shape,dimensions);const kgPerM=s.area*1e-6*density;return {...s,kgPerM,totalKg:num(kgPerM*length*count,'mass')}}
function takeoff(type,length,width,height,count=1,rate=0){num(length,'length');qty(count);num(rate,'rate',true);let per=length;if(type==='area'||type==='volume')per*=num(width,'width');if(type==='volume')per*=num(height,'height');if(!['linear','area','volume'].includes(type))throw Error('Unknown quantity type');const total=num(per*count,'total');return {type,unit:{linear:'m',area:'m²',volume:'m³'}[type],perElement:per,count,total,rate,cost:num(total*rate,'cost',true)}}
function consumption(net,wastePercent,rate=0){num(net,'net',true);num(wastePercent,'waste',true);num(rate,'rate',true);const allowance=net*wastePercent/100;return {net,allowance,gross:num(net+allowance,'gross',true),cost:num((net+allowance)*rate,'cost',true)}}
function cutting(stock,kerf,trim,rows){
 // Integer millimetres; trim is material reserved at EACH end, inclusive of its trim cut.
 [stock,kerf,trim].forEach((v,i)=>{num(v,['stock','kerf','trim'][i],i>0);if(!Number.isSafeInteger(v)||v>10000000)throw Error('Use integer mm up to 10,000,000')});
 if(!Array.isArray(rows)||!rows.length)throw Error('Enter cutting list');
 const cap=stock-2*trim;if(cap<=0)throw Error('Trim consumes stock');
 let pieces=[];
 for(const row of rows){const l=num(row.length,'cut length');const n=qty(row.quantity);if(!Number.isSafeInteger(l)||l+kerf>cap)throw Error('Cut plus kerf exceeds usable stock or is not integer mm');if(pieces.length+n>5000)throw Error('Maximum 5000 pieces');for(let i=0;i<n;i++)pieces.push(l);}
 pieces.sort((a,b)=>b-a);
 // Conservative policy: one kerf per finished piece.
 let bins=[];
 for(const p of pieces){let best=-1,left=Infinity;for(let i=0;i<bins.length;i++){const r=cap-bins[i].used-p-kerf;if(r>=0&&r<left){best=i;left=r}}if(best<0)bins.push({used:p+kerf,cuts:[p]});else{bins[best].used+=p+kerf;bins[best].cuts.push(p)}}
 const lowerBound=Math.ceil(pieces.reduce((s,p)=>s+p+kerf,0)/cap);
 const bars=bins.map((b,i)=>({bar:i+1,cuts:b.cuts,product:b.cuts.reduce((s,p)=>s+p,0),kerf:b.cuts.length*kerf,trim:2*trim,remnant:cap-b.used}));
 const product=bars.reduce((s,b)=>s+b.product,0), purchased=stock*bars.length, sawLoss=bars.reduce((s,b)=>s+b.kerf+b.trim,0),remnant=bars.reduce((s,b)=>s+b.remnant,0);
 return {stock,bars,lowerBound,optimal:bars.length===lowerBound,method:'Best-fit decreasing; optimum certified only if capacity lower bound reached',product,purchased,sawLoss,remnant,unused:purchased-product,utilization:100*product/purchased};
}
function csv(headers,rows){const cell=v=>{let s=String(v??'');if(typeof v==='string'&&/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};return [headers,...rows].map(r=>r.map(cell).join(',')).join('\r\n')+'\r\n'}
return {units,convert,section,weight,takeoff,consumption,cutting,csv};
});
