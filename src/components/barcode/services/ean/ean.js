import CODES from './constants/CODES';
import STRUCTURE from './constants/STRUCTURE';

export default class EAN {
  constructor(CalculationHelper) {
    this.calculationHelper = CalculationHelper;
  }

  transformToSequences(number) {
    const digits = this.calculationHelper.splitToDigits(number); // [4,8,2,0...]
    const parts = this.prepareParts(digits);
    const leftPart = this.transformLeftPart(parts.left, parts.key);
    const rightPart = this.transformRightPart([...parts.right, parts.sum]);
    return {left: leftPart, right: rightPart, parts};
  }

  transformLeftPart(digits, key) {
    const structure = STRUCTURE[key];
    let result = '';
    for (let i = 0; i < structure.length; i++) {
      const sign = structure[i];
      result += CODES[sign][digits[i]];
    }
    return this.calculationHelper.splitToDigits(result);
  }

  transformRightPart(digits) {
    let result = '';
    for (let i = 0; i < digits.length; i++) {
      result += CODES.R[digits[i]];
    }
    return this.calculationHelper.splitToDigits(result);
  }

  prepareParts(digits) {
    return {
      key: digits[0],
      left: digits.slice(1, 7),
      right: digits.slice(7, 12),
      sum: this.calculationHelper.calculateSum(digits)
    };
  }


}
