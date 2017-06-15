export default class HomeController {
  constructor(Canvas, Ean, ITF) {
    this.canvas = Canvas;
    this.ean = Ean;
    this.ITF = ITF;
    this.number = '482001118203';
    this.generate();
  }

  generate() {
    // const sequences = this.ean.transformToSequences(this.number);
    const sequences = this.ITF.transformToSequences(this.number);
    this.canvas.drawITFBarcode(sequences, this.number);
  }
}
