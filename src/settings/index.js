import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';

import ApiSettings from './ApiSettings';
import GeneralSettings from './GeneralSettings';

const BldssSettings = props => {
  const pages = [
    {
      route: 'general-settings',
      label: <FormattedMessage id="ui-plugin-ill-connector-bldss.settings.generalSettings" />,
      component: GeneralSettings
    },
    {
      route: 'api-settings',
      label: <FormattedMessage id="ui-plugin-ill-connector-bldss.settings.apiSettings" />,
      component: ApiSettings
    },
  ];

  return (
    <Settings
      {...props}
      pages={pages}
      paneTitle={<FormattedMessage id="ui-plugin-ill-connector-bldss.meta.title" />}
    />
  );
};

export default BldssSettings;
