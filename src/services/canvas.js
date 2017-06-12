export const WIDTH = 3;
export const START_X = 3;
export const START_Y = 20;
export const HEIGHT = 100;

export default class Canvas {
  constructor() {
    const c = document.getElementById('field');
    this.ctx = c.getContext('2d');
  }

  drawBarcode(sequence) {
    let x = START_X;
    for (let i = 0; i < sequence.length; i++) {
      const module = sequence[i];
      if (module === 1) {
        this.createModule(x);
      }
      // this.createSigh(x + WIDTH/2, START_Y + HEIGHT + 12, module);
      x = x + WIDTH;
    }
  }

  createSigh(x, y, text) {
    const sizeFont = 12;
    this.ctx.font = `bold ${sizeFont}px sans-serif`;
    this.ctx.fillText(text, x - sizeFont / 2 + 1, y);
  }

  createModule(x, height = HEIGHT) {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(x, START_Y, WIDTH, height);
  }
}
