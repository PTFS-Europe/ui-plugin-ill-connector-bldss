import React, { useEffect } from 'react';

import { useIntl } from 'react-intl';

import DisplayRequest from './components/DisplayRequest';
import CreateRequest from './components/CreateRequest';
import Settings from './settings';

import { BACKEND } from './common/constants';

const Connector = (props) => {
  const intl = useIntl();

  const { data, actAs } = props;

  // Call the passed function to set the name of an enclosing component
  useEffect(() => {
    if (data && data.hasOwnProperty('updateConnectorName')) {
      data.updateConnectorName({
        id: data.connector.id,
        name: intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.meta.title' })
      });
    }
  });

  // Determine the component we should be returning based
  // on the passed event
  let NonSettingsComp = null;
  if (data) {
    switch (data.event) {
      case 'ui-ill-ra-request-create':
        NonSettingsComp = CreateRequest;
        break;
      case 'ui-ill-ra-request-display':
        NonSettingsComp = DisplayRequest;
        break;
      default:
        return null;
    }
  }

  const Comp = actAs === 'settings' ? Settings : NonSettingsComp;
  return <Comp {...props} />;
};

// Handle an event, destined for us,
// requiring us to return a component
Connector.illHandler = (_event, _stripes, data) => {
  if (data?.connector?.id.includes(BACKEND)) {
    return Connector;
  } else {
    return null;
  }
}

export default Connector;
