import angular from 'angular';
import uiRouter from 'angular-ui-router';
import services from './barcode/services';
import GenerateEANController from './barcode/ean/generate/generateEANController';
import DecodeEANController from './barcode/ean/decode/decodeEANController';

export default angular
  .module('app.components', [
    uiRouter,
    services
  ])
  .controller('GenerateEANController', GenerateEANController)
  .controller('DecodeEANController', DecodeEANController)
  .name;
