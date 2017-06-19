export const WIDTH = 2;
export const START_X = 150;
export const START_Y = 200;
export const HEIGHT = WIDTH * 50;
export const HEIGHT_BORDER = HEIGHT * 1.07221007;
// signature
export const FONT_SIZE = WIDTH * 7;
export const SIGNATURE_X = START_X;
export const SIGNATURE_Y = START_Y + HEIGHT + FONT_SIZE;

export default class Canvas {
  constructor() {
    const c = document.getElementById('field');
    this.ctx = c.getContext('2d');
    this.ctx.font = `bold ${FONT_SIZE}px sans-serif`;
    this.x = START_X;
    this.constants = {
      WIDTH, START_X, START_Y, HEIGHT,
      HEIGHT_BORDER, FONT_SIZE, SIGNATURE_X, SIGNATURE_Y
    };
  }

  drawBarcode(sequences) {
    this.clear();
    this.drawBorder();
    this.drawSequence(sequences.left);
    this.drawCore();
    this.drawSequence(sequences.right);
    this.drawBorder();
    this.drawSignature(sequences.parts);
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
      this.x += WIDTH;
    }
  }

  drawSignature(parts) {
    let x = SIGNATURE_X + FONT_SIZE * 0.7;
    this.createSign(SIGNATURE_X - FONT_SIZE, SIGNATURE_Y, parts.key);
    parts.left.map((digit) => {
      this.createSign(x, SIGNATURE_Y, digit);
      x += FONT_SIZE;
    });
    x += FONT_SIZE * 0.7;
    parts.right.push(parts.sum);
    parts.right.map((digit) => {
      this.createSign(x, SIGNATURE_Y, digit);
      x += FONT_SIZE;
    });
  }

  createSign(x, y, text) {
    this.ctx.fillText(text, x, y);
  }

  createModule(x, height = HEIGHT) {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(x, START_Y, WIDTH, height);
  }

  clear() {
    this.x = START_X;
    this.ctx.clearRect(0, 0, 800, 800);
  }
}
