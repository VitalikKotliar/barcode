import Canvas from '../canvas';
export default class CanvasITF extends Canvas {
  constructor() {
    super();
    this.BORDER_WIDTH = this.constants.WIDTH * 4;
    this.WHITE_BORDER = this.constants.WIDTH * 10;
    this.COL_MODULE = 110;
  }

  drawBarcode(parts) {
    this.clear();
    this.drawBorder();
    this.drawPlatform();
    this.drawSequence(parts.sequences);
    this.drawSignature(parts.number);
  }

  drawSignature(number) {
    let x = this.constants.SIGNATURE_X + this.constants.FONT_SIZE * 0.7;
    number.map((digit) => {
      this.createSign(x, this.constants.SIGNATURE_Y + this.BORDER_WIDTH, digit);
      x += this.constants.FONT_SIZE;
    });
  }

  drawBorder() {
    this.ctx.fillRect(
      this.constants.START_X - this.BORDER_WIDTH - this.WHITE_BORDER,
      this.constants.START_Y - this.BORDER_WIDTH,
      this.constants.WIDTH * this.COL_MODULE + 2 * this.WHITE_BORDER + 2 * this.BORDER_WIDTH,
      this.constants.HEIGHT + 2 * this.BORDER_WIDTH
    );
  }

  drawPlatform() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(
      this.constants.START_X - this.WHITE_BORDER,
      this.constants.START_Y,
      this.constants.WIDTH * this.COL_MODULE + 2 * this.WHITE_BORDER,
      this.constants.HEIGHT
    );
    this.ctx.fillStyle = '#000';
  }
}
