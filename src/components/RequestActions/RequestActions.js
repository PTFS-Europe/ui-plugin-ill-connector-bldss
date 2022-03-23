import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from 'react-intl';

import {
  Dropdown,
  DropdownMenu,
  Button,
  Icon
} from '@folio/stripes/components';

import {
  useShowCallout
} from '@folio/stripes-acq-components';

import { useConnectorMutation } from '../../common/hooks/useConnectorApi';

const RequestActions = ({ data }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const intl = useIntl();
  const showCallout = useShowCallout();

  const { request, connector } = data;

  const { mutate } = useConnectorMutation({
    endpoint: 'action',
    method: 'post',
    connectorId: connector.id
  });

  const handleAction = (actionName) => {
    const payload = {
      actionName,
      actionMetadata: JSON.stringify({
        localRequestId: request.id,
        supplierRequestId: request.supplierRequestId
      })
    };
    mutate(payload, {
      onSuccess: () => {
        showCallout({
          messageId: 'ui-plugin-ill-connector-bldss.request.action.cancellationSentSuccess',
          type: 'success'
        });
        setDropdownOpen(false);
      },
      onError: () => {
        showCallout({
          messageId: 'ui-plugin-ill-connector-bldss.request.action.cancellationSentError',
          type: 'error'
        });
        setDropdownOpen(false);
      }
    });
  };

  return (
    <Dropdown
      id={`RequestMenu-${request.id}`}
      label={intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.request.actions'})}
      buttonProps={{ buttonStyle: 'primary' }}
      open={dropdownOpen}
      onToggle={() => setDropdownOpen(!dropdownOpen)}
    >
      <DropdownMenu
        aria-label={intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.request.actions'})}
      >
        <Button
          buttonStyle="dropdownItem"
          data-testid="request-supplier-cancel"
          data-test-button-request-supplier-cancel
          onClick={() => handleAction('cancel')}
          disabled={!request.supplierRequestId}
        >
          <Icon size="small" icon="times-circle">
            {intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.request.action.cancel' })}
          </Icon>
        </Button>
      </DropdownMenu>
    </Dropdown>
  );
};

RequestActions.propTypes = {
  data: PropTypes.object.isRequired
};

export default RequestActions;
