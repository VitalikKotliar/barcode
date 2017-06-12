import codes from './codes';

export default class HomeController {
  constructor(Canvas) {
    this.canvas = Canvas;
    this.number = '78020137962';
    // this.x = 20;
    // this.weight = 2;
    // this.ctx.strokeStyle = '#000000';
    // this.drawBorder();
    // this.drawNumber();
    // this.drawBorder();
    // this.canvas.createModule(100);
    this.draw();
  }

  drawBorder() {
    this.createModule(100);
    this.x = this.x + this.weight;
    this.createModule(100);
    this.x = this.x + this.weight;
  }

  draw() {
    const splitedNumber = this.splitToDigits(this.number);
    const sequence = this.transformNumber(splitedNumber);
    this.canvas.drawBarcode(sequence);
  }

  splitToDigits(number) {
    let output = [];
    let sNumber = number.toString();

    for (var i = 0, len = sNumber.length; i < len; i += 1) {
      output.push(+sNumber.charAt(i));
    }

    return output;
  }

  transformNumber(number) {
    let sequence = [];
    for (let i = 0; i < number.length; i++) {
      const digit = number[i];
      const modules = codes[digit];
      sequence.push(...modules);
    }
    return sequence;
  }
}
