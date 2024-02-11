class towerObject {
  static instHist = [];
  static mainLoop() {
    towerObject.instHist.forEach(element => element.mainLoop());
  }
  constructor(x, y, w, h, c) {
    this.x = x; // XCOOR
    this.y = y; // YCOOR
    this.w = w; // WIDTH
    this.h = h; // HIGHT
    this.c = c; // COLOR

    this.reach = 50;

    towerObject.instHist.push(this);

  }
  drawItem() {
    // DRAW
    cta.beginPath();
    cta.rect(this.x, this.y, this.w, this.h);  // draw filled
    cta.fillStyle = this.c;
    cta.fill();
    cta.closePath();
  }

  mainLoop() {
    drawItem();

    // DISTANT COLLISION DETECTION METHOD

    if (paddleX <= this.x + this.reach &&
      paddleX >= this.x - this.reach &&
      paddleY <= this.y + this.reach &&
      paddleY >= this.y - this.reach
    ) {
      // console.log("contact");
      cta.beginPath();
      cta.moveTo(this.x + (.5 * this.w), this.y + (.5 * this.h));
      cta.lineTo(paddleX + (.5 * paddleW), paddleY + (.5 * paddleH));
      cta.stroke();
    }
  }
}
