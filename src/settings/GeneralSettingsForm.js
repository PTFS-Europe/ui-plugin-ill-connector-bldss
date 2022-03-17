import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Pane,
  Checkbox
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

const GeneralSettingsForm = ({
  handleSubmit,
  label,
  pristine,
  submitting
}) => {
  return (
    <form id="ui-plugin-ill-connector-bldss-general-settings-form" onSubmit={handleSubmit}>
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        id="pane-ui-plugin-ill-connector-bldss-general-settings-display"
        lastMenu={(
          <Button
            buttonStyle="primary"
            disabled={pristine || submitting}
            id="clickable-save-ill-connector-bldss-general-settings"
            marginBottom0
            type="submit"
          >
            <FormattedMessage id="ui-ill-ra.button.save" />
          </Button>
        )}
        paneTitle={label}
      >
        <Field
          name="libraryPrivilege"
          type="checkbox"
          id="ui-plugin-ill-connector-bldss-library-privilege"
          render={fieldProps => {
            return (
              <Checkbox
                {...fieldProps.input}
                label={<FormattedMessage id="ui-plugin-ill-connector-bldss.settings.libraryPrivilege" />}
                checked={fieldProps.input.checked}
                onChange={event => fieldProps.input.onChange(event)}
              />
            );
          }}
        />
        <Field
          name="outsideUk"
          type="checkbox"
          id="ui-plugin-ill-connector-bldss-outsideUk"
          render={fieldProps => {
            return (
              <Checkbox
                {...fieldProps.input}
                label={<FormattedMessage id="ui-plugin-ill-connector-bldss.settings.outsideUk" />}
                checked={fieldProps.input.checked}
                onChange={event => fieldProps.input.onChange(event)}
              />
            );
          }}
        />
      </Pane>
    </form>
  );
};

GeneralSettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  label: PropTypes.node,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  values: PropTypes.shape({
    libraryPrivilege: PropTypes.bool,
    outsideUk: PropTypes.bool
  })
};

export default stripesFinalForm({
  navigationCheck: true,
  enableReinitialize: true,
  subscription: {
    values: true
  }
})(GeneralSettingsForm);
