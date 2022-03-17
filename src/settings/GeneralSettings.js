import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { ConfigManager as UnconnectedConfigManager } from '@folio/stripes/smart-components';

import GeneralSettingsForm from './GeneralSettingsForm';

const ConfigManager = stripesConnect(UnconnectedConfigManager);

const getInitialValues = (settings) => {
  let config;
  const value = isEmpty(settings) ? '' : settings[0].value;
  const defaultConfig = {
    libraryPrivilege: 0,
    outsideUk: 0
  };

  try {
    config = { ...defaultConfig, ...JSON.parse(value) };
  } catch (e) {
    config = defaultConfig;
  }

  return config;
};

const GeneralSettings = () => (
  <ConfigManager
    configFormComponent={GeneralSettingsForm}
    configName="generalSettings"
    getInitialValues={getInitialValues}
    label={<FormattedMessage id="ui-plugin-ill-connector-bldss.settings.generalSettings" />}
    moduleName="UI-PLUGIN-ILL-CONNECTOR-BLDSS"
    onBeforeSave={JSON.stringify}
  />
);

export default GeneralSettings;

