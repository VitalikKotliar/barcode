import Canvas from './canvas';
import Ean from './ean/ean';
import CalculationHelper from './calculationHelper';

export default angular
  .module('app.main.services', [])
  .service('Ean', Ean)
  .service('Canvas', Canvas)
  .service('CalculationHelper', CalculationHelper)
  .name;
