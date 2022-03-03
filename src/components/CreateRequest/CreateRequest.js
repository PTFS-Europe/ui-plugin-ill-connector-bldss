import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useIntl, FormattedMessage } from 'react-intl';

import {
  Button,
  Modal,
  ModalFooter,
  Loading
} from '@folio/stripes/components';

import {
  useShowCallout
} from '@folio/stripes-acq-components';

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

import { useIllRaMutation } from '../../common/hooks/useIllRaApi';
import { useConnectorMutation } from '../../common/hooks/useConnectorApi';

import { Formats } from '../Formats';

const CreateRequest = (props) => {
  const { submission, connector } = props.data;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
  const [requestMetadata, setRequestMetadata] = useState();
  const [mutating, setMutating] = useState(false);

  const showCallout = useShowCallout();

  const intl = useIntl();

  const { mutate: createLocalRequest } = useIllRaMutation({
    endpoint: 'requests'
  });

  const { mutate: createSupplierRequest } = useConnectorMutation({
    endpoint: 'action',
    method: 'post',
    connectorId: connector.id
  });

  // When a search result is selected, act accordingly
  const onResultClick = (event, selectedRow) => {
    setSelectedResult(selectedRow);
    setModalOpen(true);
  }

  // Update the arbitrary state object that can be contributed
  // to by child components
  const updateRequestMetadata = (prop, data) => {
    setRequestMetadata(
      prev => ({ ...prev, [prop]: { ...data } })
    );
  }

  // Create a local request, then create a supplier request
  const placeRequest = () => {
    setCanSubmit(false);
    setMutating(true);
    createLocalRequest({
      submissionId: submission.id,
      connectorId: connector.id,
      supplierUid: connector.uid
    }, {
      onSuccess: async (data) => {
        // We've created a local request
        const createdRequest = await data.json();
        // Now create a supplier request, we use our local
        // request ID to tie them together
        const localRequestId = createdRequest.id;
        const payload = {
          actionName: "submitRequest",
          actionMetadata: JSON.stringify({
            localRequestId,
            requestMetadata,
            selectedResult,
            submission
          })
        };
        createSupplierRequest(payload, {
          onSuccess: async (data) => {
            showCallout({
              messageId: 'ui-plugin-ill-connector-bldss.createRequest.sent',
              type: 'success'
            });
            setModalOpen(false);
          }
        })
      }
    });
  };

  const footer = (
    <ModalFooter>
      <Button
        buttonStyle="primary"
        disabled={!canSubmit}
        marginBottom0
        onClick={placeRequest}
      > {mutating && <Loading />}
        {!mutating && <FormattedMessage id="ui-ill-components.button.placeRequest" />}
      </Button>
      <Button onClick={() => setModalOpen(false)} marginBottom0>
        <FormattedMessage id="ui-ill-components.button.cancel" />
      </Button>
    </ModalFooter>
  );

  return (
    <>
      {selectedResult && modalOpen && (
        <Modal
          aria-label={intl.formatMessage({ id: "ui-ill-components.button.placeRequest" })}
          open={modalOpen}
          label={intl.formatMessage({ id: "ui-ill-components.button.placeRequest" })}
          footer={footer}
          size="large"
        >
          <Tabs>
            <TabList ariaLabel={intl.formatMessage({ id: "ui-ill-components.button.placeRequest" })}>
              <Tab>
                <FormattedMessage id="ui-plugin-ill-connector-bldss.createRequest.itemDetails" />
              </Tab>
              <Tab>
                <FormattedMessage id="ui-plugin-ill-connector-bldss.createRequest.serviceDetails" />
              </Tab>
            </TabList>
            <TabPanel>
              <DisplayResult result={selectedResult} />
            </TabPanel>
            <TabPanel>
              <Formats
                connector={connector}
                setCanSubmit={setCanSubmit}
                updateRequestMetadata={updateRequestMetadata}
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
