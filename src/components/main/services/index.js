import Canvas from './canvas';
import Ean from './ean/ean';
import ITF from './itf/itf';
import CanvasITF from './itf/canvasITF';
import CalculationHelper from './calculationHelper';

export default angular
  .module('app.main.services', [])
  .service('Ean', Ean)
  .service('ITF', ITF)
  .service('CanvasITF', CanvasITF)
  .service('Canvas', Canvas)
  .service('CalculationHelper', CalculationHelper)
  .name;
