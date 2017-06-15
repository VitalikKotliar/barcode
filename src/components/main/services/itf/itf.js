import CODES from './constants/CODES';

export default class ITF {
  constructor(CalculationHelper) {
    this.calculationHelper = CalculationHelper;
  }

  transformToSequences(number) {
    let newNumber = this.addBorders(number);
    let codes = this.mapToCodes(newNumber);
    return this.mapToSequence(codes);
  }

  addBorders(number) {
    let result = ['a', 'a'];
    if (number.length % 2 !== 0) {
      result.push(0);
    }
    result.push(...number);
    result.push('a', 'z');
    return result;
  }

  mapToCodes(number) {
    let result = [];
    for (let i = 0; i < number.length; i += 2) {
      const firstCode = CODES[number[i]];
      const secondCode = CODES[number[i + 1]];
      for (let j = 0; j < 5; j++) {
        result.push(firstCode[j]);
        result.push(secondCode[j]);
      }
    }
    return result.join('');
  }

  mapToSequence(codes) {
    let result = [];
    let isBlackColor = true;
    codes.split('').map((code) => {
      if (code === 'w') {
        result.push(+isBlackColor, +isBlackColor);
      } else {
        result.push(+isBlackColor);
      }
      isBlackColor = !isBlackColor;
    });
    return result;
  }
}
