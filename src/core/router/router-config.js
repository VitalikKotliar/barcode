import mainTpl from '../../components/main/main-tpl.html';
import generateEANTpl from '../../components/barcode/ean/generate/generateEAN.tpl.html';
import decodeEANTpl from '../../components/barcode/ean/decode/decodeEAN.tpl.html';

export default function routerConfig($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      template: mainTpl
    })
    .state('main.eanGenerate', {
      url: 'ean-generate',
      template: generateEANTpl,
      controller: 'GenerateEANController',
      controllerAs: 'generateEANCtrl'
    })
    .state('main.eanDecode', {
      url: 'ean-decode',
      template: decodeEANTpl,
      controller: 'DecodeEANController',
      controllerAs: 'decodeEANCtrl'
    });
}

routerConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
