(function(){
  const sections = document.querySelectorAll('.pitch-content section[id]');
  const tocList = document.querySelector('.pitch-toc-list');
  const select = document.querySelector('.pitch-toc-select');
  sections.forEach(section => {
    const title = section.querySelector('h2')?.textContent || '';
    const id = section.id;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = title;
    li.appendChild(a);
    tocList.appendChild(li);
    const option = document.createElement('option');
    option.value = `#${id}`;
    option.textContent = title;
    select.appendChild(option);
  });
  select.addEventListener('change', () => {
    const target = document.querySelector(select.value);
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
  document.querySelectorAll('.pitch-toc a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      target?.scrollIntoView({behavior:'smooth'});
    });
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.pitch-toc a[href="#${id}"]`);
      if(entry.isIntersecting){
        document.querySelectorAll('.pitch-toc a').forEach(el=>el.removeAttribute('aria-current'));
        link?.setAttribute('aria-current','true');
        select.value = `#${id}`;
      }
    });
  },{rootMargin:'-50% 0px -50% 0px'});
  sections.forEach(section => observer.observe(section));
  document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
})();
