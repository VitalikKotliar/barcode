export default class CalculationHelper {
  splitToDigits(number) {
    let output = [];
    let sNumber = number.toString();

    for (var i = 0, len = sNumber.length; i < len; i += 1) {
      output.push(+sNumber.charAt(i));
    }

    return output;
  }
}
