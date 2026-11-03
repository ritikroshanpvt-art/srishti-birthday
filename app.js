
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
const unlock=document.getElementById('unlockBtn'), overlay=document.getElementById('introOverlay');
if(unlock){unlock.addEventListener('click',()=>{playMusic();if(overlay)overlay.classList.add('hide');document.body.classList.add('unlocked');});}
const countdown=document.getElementById('countdown');
if(countdown){const target=new Date('2026-11-06T00:00:00');function tick(){let ms=target-new Date();if(ms<0)ms=0;let d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000),s=Math.floor(ms%60000/1000);[['days',d],['hours',h],['minutes',m],['seconds',s]].forEach(([id,v])=>{let el=document.getElementById(id);if(el)el.textContent=String(v).padStart(2,'0');});}tick();setInterval(tick,1000);}
const lightbox=document.getElementById('lightbox');
if(lightbox){document.querySelectorAll('.photo-card img').forEach(img=>img.addEventListener('click',()=>{lightbox.querySelector('img').src=img.src;lightbox.classList.add('open');}));lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target.tagName==='BUTTON')lightbox.classList.remove('open');});document.addEventListener('keydown',e=>{if(e.key==='Escape')lightbox.classList.remove('open');});}
const openWish=document.getElementById('openWish');
if(openWish){openWish.addEventListener('click',()=>{const letter=document.getElementById('wishLetter');letter.classList.add('show');openWish.textContent='Your wish is open ♡';openWish.disabled=true;burstConfetti();});}
function burstConfetti(){const colors=['#f2a8cf','#d7b0f0','#f5d995','#fff0fa','#c58ad6'];for(let i=0;i<85;i++){const c=document.createElement('i');c.className='confetti';c.style.left=Math.random()*100+'vw';c.style.background=colors[i%colors.length];c.style.animationDelay=(Math.random()*.8)+'s';c.style.transform=`rotate(${Math.random()*360}deg)`;document.body.appendChild(c);setTimeout(()=>c.remove(),4300);}}
