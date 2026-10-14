const B = "https://www.bonkerscorner.com/cdn/shop/files/";
const products = [
 ["Greenline Drift Knit Polo",1799,1599,"GreenlineDriftKnitPolo_10.jpg?v=1778069606"],
 ["Dragline Track Pants",1899,1499,"DraglineTrackPants2_9c299dfb-e405-40ee-869e-6dbfc5ab3754.jpg?v=1774863361"],
 ["Split Apex Track Pants",1899,1599,"SplitApexTrackPants_5.jpg?v=1773405112"],
 ["Circuit State Long Sleeve T-shirt",1299,1199,"CircuitStateLongSleeveT-shirt8_1db802b9-5f47-4235-a739-05d66d999a6b.jpg?v=1774858192"],
 ["07 Moto Oversized T-shirt",1299,999,"07MotoOversizedT-shirt2_8343d00c-07e4-4724-a75b-d9019e9ba02b.jpg?v=1774856253"],
 ["Championship 20 Oversized T-shirt",1299,999,"Championship_CO20OversizedT-shirt2.jpg?v=1774857794"],
 ["Championship 20 Oversized T-shirt",1299,999,"BNKRS_DRIFTV2_19_bc0bc154-7e89-4f85-b8cf-3e8471c4c643.png?v=1773406031"],
 ["Circuit State Long Sleeve T-shirt",1299,1199,"BNKRS_DRIFTV2_28_TECHPACK.png?v=1773405701"],
 ["Raptor 22 Oversized T-shirt",1299,1199,"Bonkers_Corner_05-03-202647468.jpg?v=1773741179"],
 ["Overdrive 08 Oversized T-shirt",1299,1099,"BNKRS_DRIFTV2_14.png?v=1773406232"],
 ["07 Moto Oversized T-shirt",1299,999,"mock-drift.jpg?v=1777096031"],
 ["Raptor 22 Oversized T-shirt",1299,1199,"RAPTOR22.jpg?v=1780298722"],
 ["Overdrive 08 Oversized T-shirt",1299,1099,"Overdrive08OversizedT-shirt2_b18c6963-5d49-4da1-9897-682bddac9fdc.jpg?v=1775019876"],
 ["Supersonic 07 Oversized T-shirt",1299,1099,"GREY_CUTNSEW.jpg?v=1773988346"],
 ["Dirt Crew Oversized T-shirt",1299,1099,"BonkersCorner05-03-202647336.jpg?v=1773732717"],
 ["Track 75 Oversized T-shirt",1299,999,"Track75OversizedT-shirt3_35497cb1-4ed4-4545-befa-271e1b395989.jpg?v=1775023977"],
 ["Eternal Lap Oversized T-shirt",1299,999,"Eternal_Lap_Oversized_T-shirt-01.jpg?v=1774004637"],
 ["Senna Immortal Oversized T-shirt",1299,999,"SennaImmortalOversizedT-shirt4_9453776e-1482-45a7-bc61-e1c6fb0d4bb3.jpg?v=1775021629"],
 ["Supra Drift Oversized T-shirt",1299,999,"SupraDriftOversizedT-shirt8_1b9142c8-1854-46a3-b529-cf3e2b424639.jpg?v=1775023146"],
 ["Underground Winners Oversized T-shirt",1299,999,"UndergroundWinnersOversizedT-shirt8_16d8ed7f-0bfc-4877-a7cd-dc1596c920db.jpg?v=1775024279"]
].map((p,i)=>({i,name:p[0],mrp:p[1],price:p[2],img:B+p[3]}));

const grid=document.getElementById("grid"), fmt=n=>"Rs."+n.toLocaleString("en-IN")+".00";
let shown=12, cart=0, order=[...products];

function render(){
  grid.innerHTML=order.slice(0,shown).map(p=>`
  <article class="card">
    <div class="img"><span class="badge-save">Save ${Math.round((1-p.price/p.mrp)*100)}%</span>
      <button class="heart" aria-label="Add to wishlist">♡</button>
      <img loading="lazy" src="${p.img}" alt="${p.name}">
      <button class="add">Add To Cart</button></div>
    <h3>${p.name}</h3>
    <div class="price"><s>${fmt(p.mrp)}</s><b>${fmt(p.price)}</b></div>
  </article>`).join("");
  document.getElementById("loadMore").style.display=shown>=order.length?"none":"";
}
grid.addEventListener("click",e=>{
  if(e.target.classList.contains("heart")){const h=e.target;h.classList.toggle("on");h.textContent=h.classList.contains("on")?"♥":"♡";}
  if(e.target.classList.contains("add")){document.getElementById("cartCount").textContent=++cart;}
});
document.getElementById("loadMore").onclick=()=>{shown+=8;render();};
document.getElementById("sort").onchange=e=>{
  const v=e.target.value, a=[...products];
  if(v==="az")a.sort((x,y)=>x.name.localeCompare(y.name));
  if(v==="za")a.sort((x,y)=>y.name.localeCompare(x.name));
  if(v==="low")a.sort((x,y)=>x.price-y.price);
  if(v==="high")a.sort((x,y)=>y.price-x.price);
  order=a;render();
};
document.getElementById("clear").onclick=()=>document.querySelectorAll(".filters input").forEach(i=>i.type==="checkbox"?i.checked=false:i.value="");
document.getElementById("burger").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.getElementById("filterBtn").onclick=()=>document.getElementById("filters").classList.toggle("open");
render();
