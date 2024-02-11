/*jshint esversion: 6 */

let frameR = 16.66;    // 16.66 = ~60 FPS

class SwarmObject {

  // vars for class operation

  static spwnPool = []; // active instances
  static instHist = []; // all constructor calls
  static instNumb = 0;  // all instances
  static loopNumb = 0;  // COUNT OF MAINLOOP FUNCTION
  static removed = 0;   // removed particles
  static rate = 1;
  static timer = 0;

  // vars for particles

  static swarmX = 40;       // X POS
  static swarmY = 320;      // Y POS
  static swarmD = 5;        // density
  static swarmS = 5;        // size
  static swarmW = 225;      // spread
  static swarmB = "teal";   // color, base
  static swarmC = "orange"; // color, change
  static frameR = 16.66;    // 16.66 = ~60 FPS

  // class functions
  static get calcRate() {
    SwarmObject.rate = (SwarmObject.removed / SwarmObject.instNumb);

    // make percentage
    SwarmObject.rate = (Math.round(SwarmObject.rate * 100)).toFixed(0);
    return SwarmObject.rate + '%';
  }

  static drawData(x, y) {

    ctx.font = "14px verdana";
    ctx.shadowBlur = 2;
    ctx.shadowColor = "black";

    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillText("Spawned: " + SwarmObject.instNumb, x, y + 0);

    ctx.fillStyle = "darkred";
    ctx.fillText("Removed: " + SwarmObject.removed, x, y + 20);

    ctx.fillStyle = "slategray";
    ctx.fillText("OnScreen: " + SwarmObject.spwnPool.length, x, y + 40);

    ctx.fillStyle = "slategray";
    ctx.fillText("Rate: " + SwarmObject.calcRate, x + 200, y + 0);

    ctx.fillStyle = "slategray";
    ctx.fillText("Frame: " + SwarmObject.loopNumb, x + 200, y + 20);

    ctx.fillStyle = "slategray";
    ctx.fillText("Frame Time: " + SwarmObject.timer, x + 200, y + 40);

    ctx.fillStyle = "slategray";
    ctx.fillText("Clock: " + (Math.round(SwarmObject.loopNumb / 60)).toFixed(0), x + 200, y + 60);

    ctx.shadowBlur = 0;
    ctx.shadowColor = false;
    ctx.closePath();

  }
  static cleaner() {

    // filter undefined, else problems
    SwarmObject.spwnPool = SwarmObject.spwnPool.filter(Boolean);

    // clean dead instances
    for (let i = 0; i < SwarmObject.spwnPool.length; i++) {
      if (SwarmObject.spwnPool[i].drawMe == false) {
        SwarmObject.spwnPool.splice(i, 1);
        SwarmObject.removed++;
      }
    }

  }
  static whenHits(object) {

    // should be instance-level; needs fixing

    // disallow progression
    object.bashed = true;
    object.x = object.lx;
    object.y = object.ly;

    // color change
    if (object.c == SwarmObject.swarmB) {
      object.c = SwarmObject.swarmC;
    } else {
      object.c = SwarmObject.swarmB;
    }

  }
  static spawner() {

    // import globals - needs fixing
    let swarm_density = SwarmObject.swarmD;
    let x = Math.floor(Math.random() * SwarmObject.swarmW) + SwarmObject.swarmX;
    let y = SwarmObject.swarmY;
    let w = SwarmObject.swarmS;
    let h = SwarmObject.swarmS;
    let c = "steelblue";

    // make swarm particle
    for (let i = 0; i < swarm_density; i++) {
      SwarmObject.spwnPool[SwarmObject.instNumb] = new SwarmObject(x, y, w, h, c);
    }
  }

  constructor(x, y, w, h, c) {

    this.id = SwarmObject.instNumb;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    // save last position for revert upon collision
    this.lx = x;
    this.ly = y;

    this.drawMe = true;
    this.bashed = false;
    this.exited = false;

    // save constructor calls
    SwarmObject.instHist.push(this);
    SwarmObject.instNumb++; // FINALLY, INCREMENT COUNTER FOR NEXT INSTANCE

  }

  moveMent() {

    // IDLE MOVEMENT
    let negx = Math.floor(Math.random() * 2);
    let negy = Math.floor(Math.random() * 2);

    if (negx == 0) { negx = -1; } else { negx = 1; }
    if (negy == 0) { negy = -1; } else { negy = 1; }

    this.x += Math.floor(Math.random() * 2) * negx;
    this.y += Math.floor(Math.random() * 2) * negy;

    // MOVEMENT MATH - TRAVEL HORIZONTALLY

    if (Math.floor(Math.random() * 1) == 0) {
      this.x += 1;
      this.y -= 1;
    }
  }
  instExam() {

    // HAS COLLIDED - DISABLE TO ALLOW PERSISTENCE AFTER COLLISION
    // if (this.bashed == true) {
    //   this.drawMe = false;
    // }

    // exited visible area?
    if (
      (this.x < 0) ||
      (this.x > 450) ||
      (this.y < 40) ||
      (this.y > 500)
    ) {
      this.drawMe = false;
    }

  }
  drawInst() {
    if (this.drawMe) {  // Simplified condition
      ctx.beginPath();

      // Shadow settings (optional, uncomment if needed)
      // ctx.shadowBlur = 3;
      // ctx.shadowColor = "black";

      ctx.roundRect(this.x, this.y, this.w, this.h, 4);  // Draw filled rectangle
      ctx.fillStyle = this.c;
      ctx.fill();

      // Reset shadow settings (optional)
      // ctx.shadowBlur = 0;
      // ctx.shadowColor = false;

      ctx.closePath();
    }
  }


  static newcollisionDetection(object, wallList) {
    // ACCEPTS ARRAY OF OBJECTS WITH X,Y,W,D AND CALCULATES OVERLAP
    for (let i = 0; i < wallList.length; i++) {
      if (
        (object.x + object.w >= wallList[i].x) &&
        (object.x <= wallList[i].x + wallList[i].w) &&
        (object.y + object.h >= wallList[i].y) &&
        (object.y <= wallList[i].y + wallList[i].h)
      ) {
        return 1;
      }
    }
    // IF LOOP ENDS CORRECTLY, RETURN 0:
    return 0;
  }


  instLoop() {

    // don't draw if instance is dead
    if (this.drawMe == false) {
      // this.instKill();
      return;
    }

    // calc movment
    this.moveMent();

    // calc collision
    if (SwarmObject.newcollisionDetection(this, BlockObject.instHist)) {
      SwarmObject.whenHits(this);
    }

    // approve movement
    this.lx = this.x;
    this.ly = this.y;

    // draw instance
    this.instExam();
    this.drawInst();
  }

  // instKill() {
  //   // fails to maintain spawnpool length
  //   if (!this.drawMe) {
  //     const index = SwarmObject.spwnPool.indexOf(this);
  //     if (index !== -1) {
  //       SwarmObject.spwnPool.splice(index, 1);
  //       SwarmObject.removed++;
  //     }
  //   }
  // }

  static clssLoop() {
    const CLOCK_START = new Date();

    SwarmObject.loopNumb++;
    SwarmObject.drawData(45, 385);
    SwarmObject.spawner();
    SwarmObject.spwnPool.forEach(thingy => thingy.instLoop());
    SwarmObject.cleaner();


    const ELAPSED_TIME = new Date() - CLOCK_START;
    SwarmObject.timer = ELAPSED_TIME;
  }
}
