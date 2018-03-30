import angular from 'angular';
import _ from 'lodash';
import DialogController from './dialogcontroller';
import defaultProfile from '../defaultProfile.json';

export default class SettingsDialogController extends DialogController {
  constructor($scope, $mdDialog) {
    'ngInject';

    super($scope, $mdDialog);

    $scope.settings = this.mainCtrl.getCurrentProfile().settings;
    if (!$scope.settings) {
      $scope.settings = _.extend({}, defaultProfile.settings);
      this.mainCtrl.getCurrentProfile().settings = $scope.settings;
    }

    $scope.defaultButton = {
      action: {
        type: 'command',
        command: '/timeout {{user.name}} 60'
      },
      tooltip: '1 min timeout',
      icon: {
        type: 'text',
        text: '60s'
      },
      hotkey: ''
    };

    this.defaultChatPreset = {
      name: 'Chat',
      icon: {
        type: 'icon',
        code: 'chat'
      },
      settings: {
        incognito: false,
        messageFilters: [
          'modlogs',
          'chat',
          'bots',
          'mentions',
          'bits',
          'automod'
        ]
      }
    };

    console.log('Initialized SettingsDialogController', this);
    this.initDefault('style');
    this.initDefault('styleSheet');
    this.initDefault('modButtons');
    this.initDefault('modCardButtons');
    this.initDefault('chatHeaderButtons');
    this.initDefault('colorAdjustment');
    this.initDefault('monoColor');
    this.initDefault('chatSettings');
    this.initDefault('chatPresets');
    this.initDefault('timeFormat');
  }

  initDefault(setting) {
    if (_.get(this.$scope.settings, setting) === undefined) {
      _.set(this.$scope.settings, setting, this.mainCtrl.getSetting(setting));
    }
  }

  addChatPreset() {
    this.$scope.settings.chatPresets.push(angular.copy(this.defaultChatPreset));
  }
}
