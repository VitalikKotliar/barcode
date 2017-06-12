export const WIDTH = 3;
export const START_X = 60;
export const START_Y = 20;
export const HEIGHT = WIDTH * 50;
export const HEIGHT_BORDER = HEIGHT * 1.07221007;

export default class Canvas {
  constructor() {
    const c = document.getElementById('field');
    this.ctx = c.getContext('2d');
    this.x = START_X;
  }

  drawBarcode(sequences) {
    this.clear();
    this.drawBorder();
    this.drawSequence(sequences.left);
    this.drawCore();
    this.drawSequence(sequences.right);
    this.drawBorder();
  }

  drawBorder() {
    this.drawSequence([1, 0, 1], HEIGHT_BORDER);
  }

  drawCore() {
    this.drawSequence([0, 1, 0, 1, 0], HEIGHT_BORDER);
  }

  drawSequence(sequence, height = HEIGHT) {
    for (let i = 0; i < sequence.length; i++) {
      const module = sequence[i];
      if (module === 1) {
        this.createModule(this.x, height);
      }
      // this.createSign(x + WIDTH/2, START_Y + HEIGHT + 12, module);
      this.x += WIDTH;
    }
  }

  createSign(x, y, text) {
    const sizeFont = 12;
    this.ctx.font = `bold ${sizeFont}px sans-serif`;
    this.ctx.fillText(text, x - sizeFont / 2 + 1, y);
  }

  createModule(x, height = HEIGHT) {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(x, START_Y, WIDTH, height);
  }

  clear() {
    this.x = START_X;
    this.ctx.clearRect(0, 0, 400, 400);
  }
}
