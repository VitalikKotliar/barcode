export default class GenerateEANController {
  constructor(Canvas, Ean, ITF, CanvasITF, CalculationHelper) {
    this.canvas = Canvas;
    this.ean = Ean;
    this.ITF = ITF;
    this.canvasITF = CanvasITF;
    this.calculationHelper = CalculationHelper;

    this.number = '482001118203'; // ean
    // this.number = '0061414100041';
    this.codeLength = this.number.length;
    this.generate();
  }

  generate() {
    if (this.isITF()) {
      const sequences = this.ITF.transformToSequences(this.number);
      this.canvasITF.drawBarcode(sequences);
    } else {
      const sequences = this.ean.transformToSequences(this.number);
      this.canvas.drawBarcode(sequences);
    }
  }

  isITF() {
    return this.codeLength === 13;
  }
}
