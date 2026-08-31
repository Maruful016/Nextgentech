const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
const themeBtn=document.getElementById("themeBtn");
menuBtn?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
themeBtn?.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  themeBtn.textContent=document.body.classList.contains("light")?"☀":"☾";
});
document.getElementById("year").textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("formMessage").textContent=
    "Demo form submitted. Connect this form to Formspree, Google Apps Script or your own backend to receive messages.";
  e.target.reset();
});
