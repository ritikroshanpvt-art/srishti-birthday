
const audio = document.getElementById('birthdayAudio');
const musicButtons = document.querySelectorAll('[data-music]');
function setMusicLabel(playing){musicButtons.forEach(b=>{b.innerHTML=playing?'♫ Music On':'♫ Play Music';b.classList.toggle('playing',playing);});}
async function playMusic(){
 if(!audio)return;
 try{await audio.play();sessionStorage.setItem('srishtiMusic','on');setMusicLabel(true);}
 catch(e){setMusicLabel(false);}
}
function pauseMusic(){if(!audio)return;audio.pause();sessionStorage.setItem('srishtiMusic','off');setMusicLabel(false);}
musicButtons.forEach(b=>b.addEventListener('click',()=>audio && !audio.paused?pauseMusic():playMusic()));
if(audio){audio.addEventListener('play',()=>setMusicLabel(true));audio.addEventListener('pause',()=>setMusicLabel(false));if(sessionStorage.getItem('srishtiMusic')==='on'){playMusic();}}

/* AUTO MUSIC START */
playMusic();

document.addEventListener('pointerdown', function startMusicOnce() {
  if (audio && audio.paused) {
    playMusic();
  }
}, { once: true });


const countdown=document.getElementById('countdown');
if(countdown){const target=new Date('2026-11-06T00:00:00');function tick(){let ms=target-new Date();if(ms<0)ms=0;let d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000),s=Math.floor(ms%60000/1000);[['days',d],['hours',h],['minutes',m],['seconds',s]].forEach(([id,v])=>{let el=document.getElementById(id);if(el)el.textContent=String(v).padStart(2,'0');});}tick();setInterval(tick,1000);}
const lightbox=document.getElementById('lightbox');
if(lightbox){document.querySelectorAll('.photo-card img').forEach(img=>img.addEventListener('click',()=>{lightbox.querySelector('img').src=img.src;lightbox.classList.add('open');}));lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target.tagName==='BUTTON')lightbox.classList.remove('open');});document.addEventListener('keydown',e=>{if(e.key==='Escape')lightbox.classList.remove('open');});}
const openWish=document.getElementById('openWish');
if(openWish){openWish.addEventListener('click',()=>{const letter=document.getElementById('wishLetter');letter.classList.add('show');openWish.textContent='Your wish is open ♡';openWish.disabled=true;burstConfetti();});}
function burstConfetti(){const colors=['#f2a8cf','#d7b0f0','#f5d995','#fff0fa','#c58ad6'];for(let i=0;i<85;i++){const c=document.createElement('i');c.className='confetti';c.style.left=Math.random()*100+'vw';c.style.background=colors[i%colors.length];c.style.animationDelay=(Math.random()*.8)+'s';c.style.transform=`rotate(${Math.random()*360}deg)`;document.body.appendChild(c);setTimeout(()=>c.remove(),4300);}}

/* ULTRA SRISHTI LOVE HEART ANIMATION */
(() => {
  const canvas = document.getElementById("heart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const stage = canvas.closest(".heart-stage");

  let W = 0, H = 0, pulse = 0;
  let frame;

  function resize() {
    const rect = stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    W = rect.width;
    H = rect.height;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function heartX(t) {
    return 16 * Math.pow(Math.sin(t), 3);
  }

  function heartY(t) {
    return 13 * Math.cos(t)
      - 5 * Math.cos(2*t)
      - 2 * Math.cos(3*t)
      - Math.cos(4*t);
  }

  const sparkles = Array.from({length: 45}, () => ({
    x: Math.random(),
    y: Math.random(),
    size: Math.random() * 2 + 0.5,
    phase: Math.random() * 6.28
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pulse += 0.035;

    const scale = Math.min(W / 38, H / 36)
      * (1 + Math.sin(pulse) * 0.025);

    const cx = W / 2;
    const cy = H / 2;

    const count = W < 480 ? 110 : 150;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${Math.max(7, Math.min(14, scale * .7))}px Arial`;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;

      const x = cx + heartX(t) * scale;
      const y = cy - heartY(t) * scale;

      ctx.shadowBlur = 24;
      ctx.shadowColor = "#ff4fa3";
      ctx.fillStyle = i % 3 === 0 ? "#ffe0ef" : "#ff75b8";

      ctx.fillText("I LOVE YOU", x, y);
    }

    // Floating magical sparkles
    sparkles.forEach(p => {
      const glow = .25 + Math.abs(
        Math.sin(pulse + p.phase)
      ) * .75;

      ctx.globalAlpha = glow;
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#ff9ccc";

      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    frame = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
})();
