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

import { Formats } from '../Formats';

const CreateRequest = (props) => {
  const { submission, connector } = props.data;
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
  const [request, setRequest] = useState({ submission });

  const intl = useIntl();

  // When a search result is selected, act accordingly
  const onResultClick = (event, selectedRow) => {
    setSelected(selectedRow);
    setModalOpen(true);
  }

  // Update the arbitrary state object that can be contributed
  // to by child components
  const updateRequest = (prop, data) => {
    setRequest(
      prev => ({ ...prev, [prop]: { ...data } })
    );
  }

  const placeRequest = () => {
    console.log('Placing request');
    console.log(request);
  };

  const footer = (
    <ModalFooter>
      <Button
        buttonStyle="primary"
        disabled={!canSubmit}
        marginBottom0
        onClick={placeRequest}
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
            <TabList ariaLabel="Create request">
              <Tab>
                <FormattedMessage id="ui-plugin-ill-connector-bldss.createRequest.itemDetails" />
              </Tab>
              <Tab>
                <FormattedMessage id="ui-plugin-ill-connector-bldss.createRequest.serviceDetails" />
              </Tab>
            </TabList>
            <TabPanel>
              <DisplayResult result={selected} />
            </TabPanel>
            <TabPanel>
              <Formats
                connector={connector}
                setCanSubmit={setCanSubmit}
                updateRequest={updateRequest}
              />
            </TabPanel>
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
