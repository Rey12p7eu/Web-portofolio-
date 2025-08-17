
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
      // audio.src = 'https://example.com/aurora-theme.mp3';
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
