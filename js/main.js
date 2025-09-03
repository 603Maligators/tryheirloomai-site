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
})();
