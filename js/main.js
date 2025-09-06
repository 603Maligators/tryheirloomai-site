(function(){
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('theme');
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const current = document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
      document.documentElement.setAttribute('data-theme',current);
      localStorage.setItem('theme',current);
    });
  });
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('header nav');
  if(navToggle){
    navToggle.addEventListener('click',()=>nav.classList.toggle('open'));
  }
  const cta = document.querySelector('[data-scroll]');
  if(cta){
    cta.addEventListener('click',e=>{
      e.preventDefault();
      document.querySelector(cta.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
  }
  const address = document.getElementById('contact-address');
  if(address){
    const {street1='',street2='',city='',region='',postal='',country='',email='',phone=''} = address.dataset;
    const mapLink = document.getElementById('map-link');
    if(mapLink){
      const query = encodeURIComponent([street1,street2,city,region,postal,country].filter(Boolean).join(' '));
      mapLink.href = `https://maps.google.com/?q=${query}`;
    }
    const emailLink = address.querySelector('[data-email]');
    if(emailLink && email) emailLink.href = `mailto:${email}`;
    const phoneLink = address.querySelector('[data-phone]');
    if(phoneLink && phone){
      const digits = phone.replace(/[^+\d]/g,'');
      phoneLink.href = `tel:${digits}`;
    }
  }
  document.querySelectorAll('#faq-section dt').forEach(dt=>{
    const id = dt.id;
    if(!id) return;
    const btn = document.createElement('button');
    btn.className='ghost';
    btn.textContent='🔗';
    btn.setAttribute('aria-label','Copy link');
    btn.addEventListener('click',()=>{
      const url = `${location.origin}${location.pathname}#${id}`;
      navigator.clipboard?.writeText(url);
    });
    dt.appendChild(btn);
  });
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.style.setProperty('scroll-behavior','auto');
  }
})();
