export default class HomeController {
  constructor(Canvas, Ean) {
    this.canvas = Canvas;
    this.ean = Ean;
    this.number = '482001118203';
    this.generate();
  }

  generate() {
    const sequences = this.ean.transformToSequences(this.number);
    this.canvas.drawBarcode(sequences);
  }
}
