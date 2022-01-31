import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useIntl, FormattedMessage } from 'react-intl';

import {
  Button,
  Modal,
  ModalFooter
} from '@folio/stripes/components';

import {
  Tabs,
  TabList,
  Tab,
  TabPanel
} from '@folio/stripes-components';

import {
  SearchConnectorContainer,
  DisplayResult
} from '@ptfs-europe/ill-components';

const CreateRequest = (props) => {
  const { submission, connector } = props.data;
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [canSubmit, setCanSubmit] = useState(false);

  const intl = useIntl();

  const onResultClick = (event, selectedRow) => {
    setSelected(selectedRow);
    setModalOpen(true);
  }

  const footer = (
    <ModalFooter>
      <Button
        buttonStyle="primary"
        disabled={!canSubmit}
        marginBottom0
      >
        <FormattedMessage id="ui-ill-components.button.placeRequest" />
      </Button>
      <Button onClick={() => setModalOpen(false)} marginBottom0>
        <FormattedMessage id="ui-ill-components.button.cancel" />
      </Button>
    </ModalFooter>
  );

  return (
    <>
      {selected && modalOpen && (
        <Modal
          aria-label={intl.formatMessage({ id: "ui-ill-components.button.placeRequest" })}
          open={modalOpen}
          label={intl.formatMessage({ id: "ui-ill-components.button.placeRequest" })}
          footer={footer}
          size="large"
        >
          <Tabs>
            <TabList label="Create request">
              <Tab>Item details</Tab>
              <Tab>Service details</Tab>
              <Tab>Format details</Tab>
            </TabList>
            <TabPanel>
              <DisplayResult result={selected} />
            </TabPanel>
            <TabPanel><>Panel 1</></TabPanel>
            <TabPanel><>Panel 2</></TabPanel>
          </Tabs>
        </Modal>
      )}
      <SearchConnectorContainer
        submission={submission}
        connector={connector}
        onResultClick={onResultClick}
      />
    </>
  );
};

CreateRequest.propTypes = {
  submission: PropTypes.object.isRequired,
  connector: PropTypes.object.isRequired
};

CreateRequest.defaultProps = {
  submission: {},
  connector: {}
};

export default CreateRequest;
