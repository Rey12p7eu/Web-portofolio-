
/* Aurora Theme Behaviors */
(function(){
  const $ = (sel, ctx=document)=>ctx.querySelector(sel);
  const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

  // --- Particles ---
  function spawnParticles(){
    const container = document.createElement('div');
    container.id = 'particles';
    document.body.appendChild(container);
    const COUNT = 36;
    for(let i=0;i<COUNT;i++){
      const p = document.createElement('div');
      p.className = 'particle';
      const left = Math.random()*100;
      const delay = Math.random()*6;
      const dur = 8 + Math.random()*10;
      const size = 3 + Math.random()*7;
      p.style.left = left+'vw';
      p.style.bottom = (-10 - Math.random()*30)+'vh';
      p.style.width = size+'px';
      p.style.height = size+'px';
      p.style.animationDuration = dur+'s';
      p.style.animationDelay = delay+'s';
      container.appendChild(p);
    }
  }

  // guard: only add once
  if(!$('#particles')) spawnParticles();

  // --- Compass (radial nav) ---
  function initCompass(){
    let wrap = $('.compass-wrap');
    if(!wrap){
      wrap = document.createElement('div');
      wrap.className = 'compass-wrap';
      wrap.innerHTML = `
        <div class="compass" id="compassBtn" aria-label="Navigasi">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm3.536 6.464-2.12 5.303a1 1 0 0 1-.577.578l-5.303 2.12 2.12-5.303a1 1 0 0 1 .578-.577l5.303-2.12Z"/>
          </svg>
        </div>
        <nav class="compass-menu" aria-label="Menu Cepat">
          <a class="compass-link" href="#home">Home</a>
          <a class="compass-link" href="#about">Tentang</a>
          <a class="compass-link" href="#projects">Proyek</a>
          <a class="compass-link" href="#contact">Kontak</a>
        </nav>`;
      document.body.appendChild(wrap);
    }
    const btn = $('#compassBtn', wrap);
    btn?.addEventListener('click', ()=>{
      wrap.classList.toggle('open');
    });
  }
  initCompass();

  // --- Music Toggle ---
  function initMusic(){
    let btn = $('.music-btn');
    if(!btn){
      btn = document.createElement('button');
      btn.className = 'music-btn';
      btn.id = 'musicBtn';
      btn.type = 'button';
      btn.textContent = 'Music';
      btn.setAttribute('aria-pressed','false');
      document.body.appendChild(btn);
    }
    let audio = $('#bgm');
    if(!audio){
      audio = document.createElement('audio');
      audio.id = 'bgm';
      audio.loop = true;
      // Set your own track URL below (MP3). Left empty by default.
      audio.src = 'assets/nature.mp3';
      document.body.appendChild(audio);
    }

    const saved = localStorage.getItem('aurora:music') === 'on';
    if(saved){ btn.setAttribute('aria-pressed','true'); audio.play().catch(()=>{}); }

    btn.addEventListener('click', async ()=>{
      const active = btn.getAttribute('aria-pressed') === 'true';
      if(active){
        audio.pause();
        btn.setAttribute('aria-pressed','false');
        localStorage.setItem('aurora:music','off');
      } else {
        try{
          await audio.play();
          btn.setAttribute('aria-pressed','true');
          localStorage.setItem('aurora:music','on');
        }catch(e){
          // Autoplay blocked or no source. Surface minimal hint.
          btn.textContent = 'Music (tap again)';
          setTimeout(()=>btn.textContent='Music', 2000);
        }
      }
    });
  }
  initMusic();

  // --- Respect prefers-reduced-motion for particles ---
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(media.matches){ $('#particles')?.remove(); }

})();


/* === Theme + Language + Nature Music === */
(function(){
  const $ = (s, c=document)=>c.querySelector(s);
  const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

  // --- Theme (dark/light) ---
  const html = document.documentElement;
  function applyTheme(t){
    if(t==='light'){ html.classList.remove('dark'); html.classList.add('light'); }
    else { html.classList.add('dark'); html.classList.remove('light'); }
    localStorage.setItem('aurora:theme', t);
    const icon = $('#themeIcon');
    if(icon){ icon.textContent = t==='light' ? 'ðŸŒž' : 'ðŸŒ™'; }
  }
  const savedTheme = localStorage.getItem('aurora:theme') || 'dark';
  applyTheme(savedTheme);
  $('#themeToggle')?.addEventListener('click', ()=>{
    const t = html.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(t);
  });

  // --- Language (ID/EN) ---
  const dict = {
    id: {
      name: "Raihan Mirzayani",
      role: "Prompt Engineer & Kreator Digital",
      heroDesc: "Saya membangun solusi AI & automasi yang rapi, cepat, dan relevan â€” fokus pada Prompt Engineering, eksperimen kreatif, dan strategi digital yang berdampak.",
      ctaProjects: "Lihat Proyek",
      ctaContact: "Kontak",
      aboutTitle: "Tentang",
      aboutBody: "Saya pemula di banyak hal, namun berjalan mantap untuk menguasainya. Dengan disiplin, rasa ingin tahu, dan keberanian bereksperimen, saya merancang sistem yang membantu orang bekerja lebih cerdas.",
      toolsTitle: "Peralatan",
      projectsTitle: "Proyek Unggulan",
      contactTitle: "Kontak",
      footer: "Â© 2025 Raihan Mirzayani â€” Portofolio",
      music: "Musik Alam",
      langLabel: "ID",
      navHome:"Beranda", navAbout:"Tentang", navProjects:"Proyek", navContact:"Kontak"
    },
    en: {
      name: "Raihan Mirzayani",
      role: "Prompt Engineer & Digital Creator",
      heroDesc: "I build tidy, fast, and relevant AI & automation solutions â€” focusing on Prompt Engineering, creative experiments, and impactful digital strategy.",
      ctaProjects: "View Projects",
      ctaContact: "Contact",
      aboutTitle: "About",
      aboutBody: "I'm a beginner in many things, steadily moving toward mastery. With discipline, curiosity, and bold experimentation, I design systems that help people work smarter.",
      toolsTitle: "Tools",
      projectsTitle: "Featured Projects",
      contactTitle: "Contact",
      footer: "Â© 2025 Raihan Mirzayani â€” Portfolio",
      music: "Nature Music",
      langLabel: "EN",
      navHome:"Home", navAbout:"About", navProjects:"Projects", navContact:"Contact"
    }
  };
  function applyLang(lang){
    const d = dict[lang] || dict.id;
    $$('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(d[key]) el.textContent = d[key];
    });
    localStorage.setItem('aurora:lang', lang);
    const btn = $('#langLabel');
    if(btn) btn.textContent = d.langLabel;
    // compass labels
    const links = $$('.compass-wrap .compass-link');
    if(links.length === 4){
      links[0].textContent = d.navHome;
      links[1].textContent = d.navAbout;
      links[2].textContent = d.navProjects;
      links[3].textContent = d.navContact;
    }
  }
  const savedLang = localStorage.getItem('aurora:lang') || 'id';
  applyLang(savedLang);
  $('#langToggle')?.addEventListener('click', ()=>{
    const next = (localStorage.getItem('aurora:lang') || 'id') === 'id' ? 'en' : 'id';
    applyLang(next);
  });

  // --- Music (nature) ---
  (function initMusic(){
    let btn = $('#musicToggle');
    if(!btn){
      btn = document.createElement('button');
      btn.id = 'musicToggle';
      btn.className = 'toolbtn';
      btn.innerHTML = 'ðŸŽµ <span class="label" data-i18n="music">Musik Alam</span>';
      $('.toolbar')?.appendChild(btn);
    }
    let audio = $('#bgm');
    if(!audio){
      audio = document.createElement('audio');
      audio.id = 'bgm';
      audio.loop = true;
      audio.preload = 'none';
      // Provide your own track at /assets/nature.mp3 (or set audio.src here)
      audio.src = 'assets/nature.mp3';
      document.body.appendChild(audio);
    }
    const saved = localStorage.getItem('aurora:music') === 'on';
    if(saved){ audio.play().catch(()=>{}); btn.setAttribute('aria-pressed','true'); }
    btn.addEventListener('click', async ()=>{
      const playing = !audio.paused;
      if(playing){ audio.pause(); btn.removeAttribute('aria-pressed'); localStorage.setItem('aurora:music','off'); }
      else {
        try{ await audio.play(); btn.setAttribute('aria-pressed','true'); localStorage.setItem('aurora:music','on'); }
        catch(e){ btn.classList.add('ring'); setTimeout(()=>btn.classList.remove('ring'),1200); }
      }
    });
  })();

})();

// --- Music (nature) ---
  (function initMusic(){
    let btn = $('#musicToggle');
    if(!btn){
      btn = document.createElement('button');
      btn.id = 'musicToggle';
      btn.className = 'toolbtn';
      btn.innerHTML = 'ðŸŽµ <span class="label" data-i18n="music">Musik Alam</span>';
      $('.toolbar')?.appendChild(btn);
    }
    let audio = $('#bgm');
    if(!audio){
      audio = document.createElement('audio');
      audio.id = 'bgm';
      audio.loop = true;
      audio.preload = 'none';
      // Multi-source for broad browser support (Opus â†’ M4A â†’ MP3)
      audio.innerHTML = `
        <source src="assets/audio/nature.opus" type='audio/ogg; codecs="opus"'>
        <source src="assets/audio/nature.m4a"  type="audio/mp4">
        <source src="assets/nature.mp3"        type="audio/mpeg">
      `;
      audio.volume = 0.4; // optional
      document.body.appendChild(audio);
    }
    const saved = localStorage.getItem('aurora:music') === 'on';
    if(saved){ audio.play().catch(()=>{}); btn.setAttribute('aria-pressed','true'); }
    btn.addEventListener('click', async ()=>{
      const playing = !audio.paused;
      if(playing){ audio.pause(); btn.removeAttribute('aria-pressed'); localStorage.setItem('aurora:music','off'); }
      else {
        try{ await audio.play(); btn.setAttribute('aria-pressed','true'); localStorage.setItem('aurora:music','on'); }
        catch(e){ btn.classList.add('ring'); setTimeout(()=>btn.classList.remove('ring'),1200); }
      }
    });
  })();  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(media.matches){ $('#particles')?.remove(); }

})();


/* === Theme + Language + Nature Music === */
(function(){
  const $ = (s, c=document)=>c.querySelector(s);
  const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

  // --- Theme (dark/light) ---
  const html = document.documentElement;
  function applyTheme(t){
    if(t==='light'){ html.classList.remove('dark'); html.classList.add('light'); }
    else { html.classList.add('dark'); html.classList.remove('light'); }
    localStorage.setItem('aurora:theme', t);
    const icon = $('#themeIcon');
    if(icon){ icon.textContent = t==='light' ? 'ðŸŒž' : 'ðŸŒ™'; }
  }
  const savedTheme = localStorage.getItem('aurora:theme') || 'dark';
  applyTheme(savedTheme);
  $('#themeToggle')?.addEventListener('click', ()=>{
    const t = html.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(t);
  });

  // --- Language (ID/EN) ---
  const dict = {
    id: {
      name: "Raihan Mirzayani",
      role: "Prompt Engineer & Kreator Digital",
      heroDesc: "Saya membangun solusi AI & automasi yang rapi, cepat, dan relevan â€” fokus pada Prompt Engineering, eksperimen kreatif, dan strategi digital yang berdampak.",
      ctaProjects: "Lihat Proyek",
      ctaContact: "Kontak",
      aboutTitle: "Tentang",
      aboutBody: "Saya pemula di banyak hal, namun berjalan mantap untuk menguasainya. Dengan disiplin, rasa ingin tahu, dan keberanian bereksperimen, saya merancang sistem yang membantu orang bekerja lebih cerdas.",
      toolsTitle: "Peralatan",
      projectsTitle: "Proyek Unggulan",
      contactTitle: "Kontak",
      footer: "Â© 2025 Raihan Mirzayani â€” Portofolio",
      music: "Musik Alam",
      langLabel: "ID",
      navHome:"Beranda", navAbout:"Tentang", navProjects:"Proyek", navContact:"Kontak"
    },
    en: {
      name: "Raihan Mirzayani",
      role: "Prompt Engineer & Digital Creator",
      heroDesc: "I build tidy, fast, and relevant AI & automation solutions â€” focusing on Prompt Engineering, creative experiments, and impactful digital strategy.",
      ctaProjects: "View Projects",
      ctaContact: "Contact",
      aboutTitle: "About",
      aboutBody: "I'm a beginner in many things, steadily moving toward mastery. With discipline, curiosity, and bold experimentation, I design systems that help people work smarter.",
      toolsTitle: "Tools",
      projectsTitle: "Featured Projects",
      contactTitle: "Contact",
      footer: "Â© 2025 Raihan Mirzayani â€” Portfolio",
      music: "Nature Music",
      langLabel: "EN",
      navHome:"Home", navAbout:"About", navProjects:"Projects", navContact:"Contact"
    }
  };
  function applyLang(lang){
    const d = dict[lang] || dict.id;
    $$('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(d[key]) el.textContent = d[key];
    });
    localStorage.setItem('aurora:lang', lang);
    const btn = $('#langLabel');
    if(btn) btn.textContent = d.langLabel;
    // compass labels
    const links = $$('.compass-wrap .compass-link');
    if(links.length === 4){
      links[0].textContent = d.navHome;
      links[1].textContent = d.navAbout;
      links[2].textContent = d.navProjects;
      links[3].textContent = d.navContact;
    }
  }
  const savedLang = localStorage.getItem('aurora:lang') || 'id';
  applyLang(savedLang);
  $('#langToggle')?.addEventListener('click', ()=>{
    const next = (localStorage.getItem('aurora:lang') || 'id') === 'id' ? 'en' : 'id';
    applyLang(next);
  });

  // --- Music (nature) ---
  (function initMusic(){
    let btn = $('#musicToggle');
    if(!btn){
      btn = document.createElement('button');
      btn.id = 'musicToggle';
      btn.className = 'toolbtn';
      btn.innerHTML = 'ðŸŽµ <span class="label" data-i18n="music">Musik Alam</span>';
      $('.toolbar')?.appendChild(btn);
    }
    let audio = $('#bgm');
    if(!audio){
      audio = document.createElement('audio');
      audio.id = 'bgm';
      audio.loop = true;
      audio.preload = 'none';
      // Provide your own track at /assets/nature.mp3 (or set audio.src here)
      audio.src = 'assets/nature.mp3';
      document.body.appendChild(audio);
    }
    const saved = localStorage.getItem('aurora:music') === 'on';
    if(saved){ audio.play().catch(()=>{}); btn.setAttribute('aria-pressed','true'); }
    btn.addEventListener('click', async ()=>{
      const playing = !audio.paused;
      if(playing){ audio.pause(); btn.removeAttribute('aria-pressed'); localStorage.setItem('aurora:music','off'); }
      else {
        try{ await audio.play(); btn.setAttribute('aria-pressed','true'); localStorage.setItem('aurora:music','on'); }
        catch(e){ btn.classList.add('ring'); setTimeout(()=>btn.classList.remove('ring'),1200); }
      }
    });
  })();

})();  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(media.matches){ $('#particles')?.remove(); }

})();
