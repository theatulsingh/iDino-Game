score=0;
cross=true; 
audio = new Audio('./audios/music.mp3');
audiogo = new Audio('./audios/gameover.mp3');
setTimeout(()=> {
	audio.play()
},500);
document.onkeydown = function(e){
	console.log("Your Key Code is: ",e.keyCode);
	if(e.keyCode==87){
		dino = document.querySelector('.dino');
		dino.classList.add('animatedino');
		setTimeout(
			()=>{
				dino.classList.remove('animatedino');
			}, 1410);
	}
	if(e.keyCode==83){
		dino.classList.remove('animatedino');
	}
	if(e.keyCode==68){
		dino = document.querySelector('.dino');
		dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
		if(dx<800)dino.style.left = dx+50+"px"; dino
	}
	if(e.keyCode==65){
		dino = document.querySelector('.dino');
		dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
		if(dx>50) dino.style.left = dx-50+"px";
	}


}
setInterval(()=>{
	dino = document.querySelector('.dino');
	obstacle = document.querySelector('.obstacle');
	gameover = document.querySelector('.gameover');
	dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
	dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
	ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
	oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));
	offsetx = Math.abs(dx-ox);
	offsety = Math.abs(dy-oy);
	console.log(offsetx, offsety);
	if(offsetx<140 && offsety<20 ){
		gameover.style.visibility= 'visible';
		obstacle.classList.remove('animateob');
		if(ox<0) ox+30; 
		obstacle.style.left= ox+"px"; 
		audiogo.play();
		setTimeout(()=>{
            audiogo.pause();
            audio.pause();
        }, 800);
	}else if(cross && offsetx<150){
		if(gameover.style.visibility != 'visible') score+=10;
		updatescr(score);
		cross=false;
		setTimeout(()=>{
			cross=true;
		} ,1000);
		setTimeout(()=>{
			ad=parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
			nad=ad-0.4+'s';
		    if(ad>2.5){ 
		        obstacle.style.animationDuration=nad;
		        console.log("New Animation Duration: ",nad);
		     }
		},1000);
	}
} , 50);
function updatescr(score){
	scorecnt.innerHTML="Your score : " +score;
}