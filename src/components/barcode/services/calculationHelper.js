export default class CalculationHelper {
  splitToDigits(number) {
    let output = [];
    let sNumber = number.toString();

    for (var i = 0, len = sNumber.length; i < len; i += 1) {
      output.push(+sNumber.charAt(i));
    }

    return output;
  }

  calculateSum(digits) { // [4, 8, 2, 0, 0, 1, 1, 1, 8, 2, 0, 3]
    let sumEven = 0;
    let sumOdd = 0; // для непарного
    for (let i = 0; i < digits.length; i++) {
      const digit = parseInt(digits[i], 10);
      if (i % 2 === 0) {
        sumOdd += digit;
      } else {
        sumEven += digit;
      }
    }
    const sum = 3 * sumOdd + sumEven;
    const result = 10 - sum % 10;
    return result === 10 ? 0 : result;
  }
}
