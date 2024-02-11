class BlockObject {

  // hold all instances
  static instHist = [];

  static drawGrid(x, y, w, h, rowNum, colNum, rowGap, colGap, color) {
    // function to create a grid of block objects

    let xroot = x;

    for (let i = 0; i < rowNum; i++) {  // FOR EACH ROW
      y = y + rowGap;                   // increment y val for each row
      x = xroot;                        // reset x coordinate for each row

      for (let i = 0; i < colNum; i++) { // FOR EACH COLUMN
        x = x + colGap;                  // increment x val for each col
        const wall = new BlockObject(x, y, w, h, color);

      }
    }
  }

  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c; // color

    // log all instances
    BlockObject.instHist.push(this);

  }

  drawBlock() {
    // Begin a new drawing path:
    ctx.beginPath();

    // Set up shadow properties:
    ctx.shadowBlur = 12;
    ctx.shadowColor = "deepskyblue";

    // Define and fill the rectangle:
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    // Reset shadow properties for subsequent drawings:
    ctx.shadowBlur = 0;
    ctx.shadowColor = false;

    // Close the current path:
    ctx.closePath();
  }

  static clssLoop() {
    // function to draw all instances

    for (const instance of BlockObject.instHist) {
      instance.drawBlock();
    }

  }
}
