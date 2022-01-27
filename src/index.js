import React, { useEffect } from 'react';

import { useIntl } from 'react-intl';

import CreateRequest from './components/CreateRequest';
import Settings from './settings';

import { BACKEND } from './common/constants';

const Connector = (props) => {
  const intl = useIntl();

  const { data, actAs } = props;

  // Call the passed function to set the name of an enclosing component
  useEffect(() => {
    if (data.hasOwnProperty('updateConnectorName')) {
      data.updateConnectorName({
        id: data.connector.id,
        name: intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.meta.title' })
      });
    }
  });

  const Comp = actAs === 'settings' ? Settings : CreateRequest;
  return <Comp {...props} />;
};

// Handle an event requiring us to return a component
Connector.illHandler = (event, _stripes, data) => {
  if (
    event === 'ui-ill-ra-request-create' &&
    data?.connector?.id.includes(BACKEND)
  ) {
    return Connector;
  } else {
    return null;
  }
}

export default Connector;
