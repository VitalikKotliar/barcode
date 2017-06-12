import './_main.scss';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import services from './services';
import MainController from './main-controller';

export default angular
  .module('app.components.main', [
    uiRouter,
    services
  ])
  .controller('MainController', MainController)
  .name;
