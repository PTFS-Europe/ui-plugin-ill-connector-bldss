import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { ConfigManager as UnconnectedConfigManager } from '@folio/stripes/smart-components';

import ApiSettingsForm from './ApiSettingsForm';

const ConfigManager = stripesConnect(UnconnectedConfigManager);

const getInitialValues = (settings) => {
  let config;
  const value = isEmpty(settings) ? '' : settings[0].value;
  const defaultConfig = {
    apiUrl: '',
    apiKey: '',
    apiKeyAuth: '',
    apiApplication: '',
    apiApplicationAuth: ''
  };

  try {
    config = { ...defaultConfig, ...JSON.parse(value) };
  } catch (e) {
    config = defaultConfig;
  }

  return config;
};

const ApiSettings = () => (
  <ConfigManager
    configFormComponent={ApiSettingsForm}
    configName="apiSettings"
    getInitialValues={getInitialValues}
    label={<FormattedMessage id="ui-plugin-ill-connector-bldss.settings.apiSettings" />}
    moduleName="UI-PLUGIN-ILL-CONNECTOR-BLDSS"
    onBeforeSave={JSON.stringify}
  />
);

export default ApiSettings;
