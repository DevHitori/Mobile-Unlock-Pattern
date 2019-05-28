var isDrawing = false;
var lastOrigin;
var mouseLocation;
var lines= [];
var bounds;
var circleBounds=[];
var currentCircle;
var pattern=[];

function createline() {
        ctx.clearRect(0, 0, 350, 350);
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 6;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        if (pattern.length>0) {
          for (var i = 0; i < pattern.length-1; i++) {
            var j = i+1;
            start = {x: circleBounds[pattern[i]-1].right-circleBounds[pattern[i]-1].width/2- bounds.left, y: circleBounds[pattern[i]-1].bottom - circleBounds[pattern[i]-1].height/2- bounds.top};
            end = {x: circleBounds[pattern[j]-1].right-circleBounds[pattern[j]-1].width/2- bounds.left, y: circleBounds[pattern[j]-1].bottom - circleBounds[pattern[j]-1].height/2- bounds.top};
				    ctx.moveTo(start.x,start.y);
            ctx.lineTo(end.x,end.y);
            }
          }
        ctx.stroke();
				if (isDrawing) {
					ctx.beginPath();
					ctx.moveTo(lastOrigin.x,lastOrigin.y);
					ctx.lineTo(mouseLocation.x,mouseLocation.y);
					ctx.stroke();
				}
			}


function onmouseup(event){
  isDrawing=false;
  lines=[];
  createline();
}

function onmouseover(event){
  if (isDrawing) {
    if (!pattern.includes(event.target.dataset.id)) {
      pattern.push(event.target.dataset.id);
      lastOrigin = {x: circleBounds[event.target.dataset.id-1].right-circleBounds[event.target.dataset.id-1].width/2- bounds.left, y: circleBounds[event.target.dataset.id-1].bottom - circleBounds[event.target.dataset.id-1].height/2- bounds.top};
    }
}
}

function onmousedown(event){
  pattern=[];
  if (true) {
    lastOrigin = {x: circleBounds[event.target.dataset.id-1].right-circleBounds[event.target.dataset.id-1].width/2- bounds.left, y: circleBounds[event.target.dataset.id-1].bottom - circleBounds[event.target.dataset.id-1].height/2- bounds.top};
    pattern.push(event.target.dataset.id);
    isDrawing=true;
  }
}

function onmousemove(event){
  mouseLocation = {x: event.clientX- bounds.left, y: event.clientY- bounds.top};
  if (isDrawing) {
    createline();
  }
}

var canvas = document.getElementById("canvasBox");
var circles = document.getElementsByClassName("circle");
var patternBox = document.getElementsByClassName("patternBox");

for(circle of circles){
  circle.onmousedown = onmousedown;
  circle.onmouseover = onmouseover;
  circleBounds.push(circle.getBoundingClientRect());
}




console.log(circleBounds.left,circleBounds.right,circleBounds.top,circleBounds.bottom);
document.onmouseup = onmouseup;
document.onmousedown = onmousedown;

patternBox[0].onmousemove = onmousemove;

bounds = canvas.getBoundingClientRect();
console.log(bounds.left,bounds.right,bounds.top,bounds.bottom);
var ctx = canvas.getContext("2d");
createline();
