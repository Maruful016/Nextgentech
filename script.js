const nav=document.querySelector(".nav-links"), menu=document.querySelector(".menu-toggle");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const theme=document.querySelector(".theme-toggle");
if(localStorage.getItem("ngt-theme")==="light")document.body.classList.add("light");
theme?.addEventListener("click",()=>{document.body.classList.toggle("light");localStorage.setItem("ngt-theme",document.body.classList.contains("light")?"light":"dark")});
const year=document.getElementById("year"); if(year)year.textContent=new Date().getFullYear();
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.08});
document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));

let cart=JSON.parse(localStorage.getItem("ngt-cart")||"[]");
function money(s){return s}
function renderCart(){
 const box=document.getElementById("cartItems"), total=document.getElementById("cartTotal"), count=document.getElementById("cartCount"), itemCount=document.getElementById("cartTotalItems");
 if(count)count.textContent=cart.length;
 if(itemCount)itemCount.textContent=`${cart.length} item${cart.length===1?"":"s"}`;
 if(!box)return;
 if(!cart.length){box.innerHTML='<p class="muted">Your cart is empty.</p>'; if(total)total.textContent="৳0"; return}
 box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><div><b>${p.name}</b><small>${p.price}</small></div><button class="remove-cart" data-i="${i}">Remove</button></div>`).join("");
 let nums=cart.map(p=>Number((p.price||"").replace(/[^\d.]/g,""))||0); let sum=nums.reduce((a,b)=>a+b,0);
 if(total)total.textContent="৳"+sum.toLocaleString("en-BD");
 box.querySelectorAll(".remove-cart").forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.i),1);localStorage.setItem("ngt-cart",JSON.stringify(cart));renderCart()});
}
document.querySelectorAll(".add-cart").forEach(b=>b.addEventListener("click",()=>{cart.push({name:b.dataset.name,price:b.dataset.price});localStorage.setItem("ngt-cart",JSON.stringify(cart));renderCart();b.textContent="Added ✓";setTimeout(()=>b.textContent="Add to Cart",900)}));
renderCart();

const search=document.getElementById("productSearch"), filters=document.querySelectorAll(".filter"), cards=document.querySelectorAll(".product-card");
let active="all";
function filterProducts(){const q=(search?.value||"").toLowerCase();cards.forEach(c=>{const okCat=active==="all"||c.dataset.category===active;const okName=c.dataset.name.includes(q);c.style.display=okCat&&okName?"":"none"})}
search?.addEventListener("input",filterProducts);
filters.forEach(f=>f.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));f.classList.add("active");active=f.dataset.filter;filterProducts()}));
document.getElementById("checkoutBtn")?.addEventListener("click",()=>{
 if(!cart.length)return alert("Your cart is empty.");
 const lines=cart.map(p=>`• ${p.name} — ${p.price}`).join("\n");
 const msg=encodeURIComponent(`Hello NextGenTech, I want to order:\n${lines}\n\nPlease confirm availability and delivery.`);
 window.open(`https://wa.me/8801XXXXXXXXX?text=${msg}`,"_blank");
});
document.getElementById("contactForm")?.addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMessage").textContent="Demo submitted. Connect this form to Google Apps Script, Formspree or your backend to receive messages.";e.target.reset()});

// Video gallery: search, category filters and fullscreen modal
const videoSearch = document.getElementById("videoSearch");
const mediaTabs = document.querySelectorAll(".media-tab");
const mediaCards = document.querySelectorAll(".video-card");
let mediaActive = "all";
function filterMedia(){
  const q=(videoSearch?.value||"").toLowerCase();
  mediaCards.forEach(c=>{
    const title=(c.dataset.title||"").toLowerCase();
    const type=c.dataset.media||"";
    c.style.display=((mediaActive==="all"||type===mediaActive)&&title.includes(q))?"":"none";
  });
}
videoSearch?.addEventListener("input",filterMedia);
mediaTabs.forEach(t=>t.addEventListener("click",()=>{
  mediaTabs.forEach(x=>x.classList.remove("active"));
  t.classList.add("active");
  mediaActive=t.dataset.mediaFilter;
  filterMedia();
}));
const modal=document.getElementById("videoModal"), modalVideo=document.getElementById("modalVideo"), modalTitle=document.getElementById("modalVideoTitle");
document.querySelectorAll(".expand-video").forEach(btn=>btn.addEventListener("click",()=>{
  modalTitle.textContent=btn.dataset.title||"Video";
  modalVideo.src=btn.dataset.video;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  modalVideo.play().catch(()=>{});
}));
document.querySelectorAll("[data-close-video]").forEach(x=>x.addEventListener("click",()=>{
  modal?.classList.remove("open"); modal?.setAttribute("aria-hidden","true");
  if(modalVideo){modalVideo.pause();modalVideo.removeAttribute("src");modalVideo.load();}
}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal?.classList.contains("open"))document.querySelector("[data-close-video]")?.click()});
