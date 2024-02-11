/*jshint esversion: 6 */

// CANVAS
const canvas_static = document.getElementById("staticCanvas");
const ctx = canvas_static.getContext("2d");

// SOUND EFFECTS
let sound = new Audio("click.mp3");
sound.preload = 'auto';

function playSFX() {
  sound.currentTime = 0.25;
  sound.play();
  // sound.currentTime = 0.25;
}

function gameLoop() {

  ctx.clearRect(0, 0, canvas_static.width, canvas_static.height); // wipe canvas

  // draw static elements - text data

  ctx.beginPath();
  ctx.fillStyle = "#333333";
  ctx.shadowBlur = 4;
  ctx.shadowColor = "black";
  ctx.roundRect(30, 360, 440, 100, [10]);  // draw filled
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowColor = false;
  ctx.closePath();

  // draw sprites

  BlockObject.clssLoop();
  SwarmObject.clssLoop();

}

// define HTML buttons

function setSize1() {
  playSFX();
  SwarmObject.swarmS = 1;
}
function setSize3() {
  playSFX();
  SwarmObject.swarmS = 3;
}
function setSize5() {
  playSFX();
  SwarmObject.swarmS = 5;
}
function setSize7() {
  playSFX();
  SwarmObject.swarmS = 7;
}
function setSize10() {
  playSFX();
  SwarmObject.swarmS = 10;
}
function setSize15() {
  playSFX();
  SwarmObject.swarmS = 15;
}

function setDens1() {
  playSFX();
  SwarmObject.swarmD = 1;
}
function setDens5() {
  playSFX();
  SwarmObject.swarmD = 5;
}
function setDens10() {
  playSFX();
  SwarmObject.swarmD = 10;
}
function setDens20() {
  playSFX();
  SwarmObject.swarmD = 20;
}
function setDens30() {
  playSFX();
  SwarmObject.swarmD = 30;
}
function setDens50() {
  playSFX();
  SwarmObject.swarmD = 50;
}

function color1() {
  playSFX();
  SwarmObject.swarmB = "lime";
  swarmC = "black";
}
function color2() {
  playSFX();
  SwarmObject.swarmB = "red";
  SwarmObject.swarmC = "black";
}
function color3() {
  playSFX();
  SwarmObject.swarmB = "lime";
  SwarmObject.swarmC = "purple";
}
function color4() {
  playSFX();
  SwarmObject.swarmB = "deeppink";
  SwarmObject.swarmC = "black";
}
function color5() {
  playSFX();
  SwarmObject.swarmB = "dodgerblue";
  SwarmObject.swarmC = "slategrey";
}

function reset() {
  playSFX();
  SwarmObject.instHist = [];
  SwarmObject.spwnPool = [];
}

function get_swarmD() {

  let myNew = document.getElementById("get_swarmD").value;
  SwarmObject.swarmD = parseInt(myNew);
}
function get_swarmS() {
  sound.currentTime = 0.25;
  sound.play();
  sound.currentTime = 0.25;

  // GET VALUE
  let myNew = document.getElementById("get_swarmS").value;
  SwarmObject.swarmS = parseInt(myNew);
}

// EXECUTION  ------------------------------------------------------------------


// define walls
BlockObject.drawGrid(x = 10, y = 10, w = 10, h = 10, rowNum = 9, colNum = 9, rowGap = 30, colGap = 30, "grey");

// draw tower objects
// abc = new inputObject(400,400,20,20,"slateblue");
// ttt = new towerObject(200,300,25,25,"yellow");

setInterval(gameLoop, frameR);
