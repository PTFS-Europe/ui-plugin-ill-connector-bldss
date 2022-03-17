import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Pane,
  TextField
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

const ApiSettingsForm = ({
  handleSubmit,
  label,
  pristine,
  submitting
}) => {
  const intl = useIntl();

  return (
    <form id="ui-plugin-ill-connector-bldss-settings-form" onSubmit={handleSubmit}>
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        id="pane-ui-plugin-ill-connector-bldss-settings-display"
        lastMenu={(
          <Button
            buttonStyle="primary"
            disabled={pristine || submitting}
            id="clickable-save-ill-connector-bldss-settings"
            marginBottom0
            type="submit"
          >
            <FormattedMessage id="ui-ill-ra.button.save" />
          </Button>
        )}
        paneTitle={label}
      >
        <Field
          component={TextField}
          id="ui-plugin-ill-connector-bldss-api-url"
          label={<FormattedMessage id="ui-plugin-ill-connector-bldss.settings.apiUrl" />}
          name="apiUrl"
          type="text"
          placeholder={`${intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.settings.eg' })} http://api.bldss.bl.uk`}
        />
        <Field
          component={TextField}
          id="ui-plugin-ill-connector-bldss-api-key"
          label={<FormattedMessage id="ui-plugin-ill-connector-bldss.settings.apiKey" />}
          name="apiKey"
          type="text"
          placeholder={`${intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.settings.eg' })} 67-1125`}
        />
        <Field
          component={TextField}
          id="ui-plugin-ill-connector-bldss-api-key-auth"
          label={<FormattedMessage id="ui-plugin-ill-connector-bldss.settings.apiKeyAuth" />}
          name="apiKeyAuth"
          type="text"
          placeholder={`${intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.settings.eg' })} API9784123`}
        />
        <Field
          component={TextField}
          id="ui-plugin-ill-connector-bldss-api-application"
          label={<FormattedMessage id="ui-plugin-ill-connector-bldss.settings.apiApplication" />}
          name="apiApplication"
          type="text"
          placeholder={`${intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.settings.eg' })} BLAPYxVLiP`}
        />
        <Field
          component={TextField}
          id="ui-plugin-ill-connector-bldss-api-application"
          label={<FormattedMessage id="ui-plugin-ill-connector-bldss.settings.apiApplicationAuth" />}
          name="apiApplicationAuth"
          type="text"
          placeholder={`${intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.settings.eg' })} LAORYCXPfe`}
        />
      </Pane>
    </form>
  );
};

ApiSettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  label: PropTypes.node,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  values: PropTypes.shape({
    apiUrl: PropTypes.string,
    apiApplication: PropTypes.string,
    apiApplicationAuth: PropTypes.string
  })
};

export default stripesFinalForm({
  navigationCheck: true,
  enableReinitialize: true,
  subscription: {
    values: true
  }
})(ApiSettingsForm);
