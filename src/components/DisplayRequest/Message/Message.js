import React from 'react';
import PropTypes from 'prop-types';

import {
  FormattedMessage,
  FormattedDate,
  FormattedTime,
  useIntl
} from 'react-intl';

import {
  Row,
  Col,
  KeyValue,
  Card
} from '@folio/stripes/components';

const getDate = iso => {
  const epoch = Date.parse(iso);
  return new Date(epoch);
};

const Message = ({ message: receivedMessage }) => {
  const intl = useIntl();
  const { Header, MessageInfo, StatusInfo } = JSON.parse(receivedMessage.message);
  return (
    <>
      <FormattedMessage tagName="h3" id="ui-plugin-ill-connector-bldss.messages.supplierUpdates" />
      <Card
        headerStart={
          <>
            <FormattedDate value={getDate(Header.Timestamp)} /> <FormattedTime value={getDate(Header.Timestamp)} />
          </>
        }
      >
        <Row>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.supplierRequestId" />}>
              {Header.SupplyingAgencyRequestId}
            </KeyValue>
          </Col>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.reasonForMessage" />}>
              {intl.formatMessage({ id: `ui-plugin-ill-connector-bldss.messages.reasonForMessage.${MessageInfo.ReasonForMessage}` })}
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.lastChange" />}>
              <FormattedDate value={getDate(StatusInfo.LastChange)} />
            </KeyValue>
          </Col>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.status" />}>
              {intl.formatMessage({ id: `ui-plugin-ill-connector-bldss.messages.status.${StatusInfo.Status}` })}
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.expectedDeliveryDate" />}>
              <FormattedDate value={getDate(StatusInfo.ExpectedDeliveryDate)} />
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {MessageInfo.Note}
          </Col>
        </Row>
      </Card>
    </>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
