const detailTitle = document.querySelector('#detailTitle');
const detailCopy = document.querySelector('#detailCopy');
const detailIcon = document.querySelector('#detailIcon');
document.querySelectorAll('.feature-card').forEach(card => card.addEventListener('click', () => {
  document.querySelector('.feature-card.active').classList.remove('active'); card.classList.add('active');
  detailTitle.textContent = card.dataset.title; detailCopy.textContent = card.dataset.copy; detailIcon.textContent = card.dataset.icon;
}));

const missions = { plant:{name:'PLANT PARENT 2.0',label:'SOIL MOISTURE',reading:'82%',stage:'plant'}, mood:{name:'MOOD-LIGHT MACHINE',label:'MOOD LEVEL',reading:'CHILL',stage:'mood'}, door:{name:'SECRET KNOCK DOOR',label:'LOCK STATUS',reading:'OPEN',stage:'door'} };
const missionName=document.querySelector('#missionName'), reading=document.querySelector('#reading'), readingLabel=document.querySelector('#readingLabel'), simStage=document.querySelector('#simStage');
document.querySelectorAll('.mission').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.mission.active').classList.remove('active');button.classList.add('active');const m=missions[button.dataset.mission];missionName.textContent=m.name;readingLabel.textContent=m.label;reading.textContent=m.reading;simStage.dataset.mode=m.stage;}));
document.querySelector('#runMission').addEventListener('click',e=>{const original=e.currentTarget.innerHTML;e.currentTarget.textContent='Testing…';reading.style.color='#c9ff38';setTimeout(()=>{e.currentTarget.innerHTML=original;reading.style.color='white'},850)});

const arena=document.querySelector('#arena'), gpio=document.querySelector('#gpioButton'), message=document.querySelector('#gameMessage'), scoreEl=document.querySelector('#score'),timeEl=document.querySelector('#time'), highEl=document.querySelector('#highScore'), fact=document.querySelector('#fact');
let score=0,time=20,playing=false,timer,moveTimer,high=Number(localStorage.getItem('esp32HighScore')||0);highEl.textContent=high;
const facts=['GPIO pins let the ESP32 read inputs and control outputs.','ESP32 can use Wi-Fi, so a button press can reach the web.','An LED needs a resistor—tiny protection, big difference.','Bluetooth Low Energy is great for battery-powered sensors.','GPIO means General Purpose Input/Output. You just learned it!'];
function placeButton(){const width=arena.clientWidth-80,height=arena.clientHeight-80;gpio.style.left=(10+Math.random()*width)+'px';gpio.style.top=(10+Math.random()*height)+'px';gpio.style.display='block';}
function finish(){playing=false;clearInterval(timer);clearTimeout(moveTimer);gpio.style.display='none';if(score>high){high=score;localStorage.setItem('esp32HighScore',high);highEl.textContent=high;}message.style.display='grid';message.innerHTML=`<span>MISSION COMPLETE</span><strong>You caught ${score} signal${score===1?'':'s'}!</strong><button id="startGame">Play again <span>↻</span></button>`;document.querySelector('#startGame').addEventListener('click',start);}
function start(){score=0;time=20;playing=true;scoreEl.textContent=score;timeEl.textContent=time;message.style.display='none';placeButton();timer=setInterval(()=>{time--;timeEl.textContent=time;if(time<=0)finish()},1000);}
document.querySelector('#startGame').addEventListener('click',start);
gpio.addEventListener('click',()=>{if(!playing)return;score++;scoreEl.textContent=score;fact.textContent=facts[score%facts.length];gpio.style.display='none';clearTimeout(moveTimer);moveTimer=setTimeout(placeButton,110);});
