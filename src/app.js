import './styles/main.scss';

import angular from 'angular';
import router from './core/router';
import i18n from './core/i18n';
import services from './services';

import main from './components/main';

angular
  .module('barcode', [
    services,
    main,
    router,
    i18n
  ])
  .run(function ($log) {
    $log.log('application online');
  });
