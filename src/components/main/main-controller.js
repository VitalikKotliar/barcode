import codes from './codes';

export default class HomeController {
  constructor() {
    this.number = '78020137962';
    this.x = 20;
    this.weight = 2;
    const c = document.getElementById('field');
    this.ctx = c.getContext('2d');
    this.ctx.strokeStyle = '#000000';
    this.drawBorder();
    this.drawNumber();
    this.drawBorder();
  }

  drawBorder() {
    this.createModule(100);
    this.x = this.x + this.weight;
    this.createModule(100);
    this.x = this.x + this.weight;
  }

  drawNumber() {
    const spitedNumber = this.splitToDigits(this.number);
    this.draw(spitedNumber);
  }

  splitToDigits(number) {
    let output = [];
    let sNumber = number.toString();

    for (var i = 0, len = sNumber.length; i < len; i += 1) {
      output.push(+sNumber.charAt(i));
    }

    return output;
  }

  draw(number) {
    for (let i = 0; i < number.length; i++) {
      const digit = number[i];
      const modules = codes[digit];
      this.drawDigit(modules);
    }
  }

  drawDigit(modules) {
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      // this.ctx.strokeStyle = module ? '#000000' : '#FFFFFF';
      if (module) {
        this.createModule(70);
      }
      this.x = this.x + this.weight;
    }
  }

  createModule(height) {
    this.ctx.fillRect(this.x, 20, this.weight - 1, height);
    this.ctx.stroke();
  }
}
