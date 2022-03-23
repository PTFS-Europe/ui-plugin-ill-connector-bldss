import React from 'react';
import PropTypes from 'prop-types';

import {
  FormattedMessage,
  useIntl
} from 'react-intl';

import {
  Row,
  Col,
  KeyValue,
  Card
} from '@folio/stripes/components';

const getDocFromXml = xml => {
  if (!xml) return null;
  const parser = new DOMParser();
  return parser.parseFromString(xml, 'application/xml');
};

const getTagFromDoc = (doc, tagName) => {
  if (!doc || !tagName) return null;
  const elements = doc.getElementsByTagName(tagName);
  return elements.length != 1 ? null : elements.item(0);
};

const getTagValueFromDoc = (doc, tagName) => {
  const tag = getTagFromDoc(doc, tagName);
  return tag ? tag.textContent : null;
};

const getAttributeValueFromDoc = (doc, tagName, attributeName) => {
  const tag = getTagFromDoc(doc, tagName);
  return tag?.getAttribute(attributeName);
}

const Message = ({ message: receivedMessage }) => {
  const intl = useIntl();
  const { Header, MessageInfo, StatusInfo } = JSON.parse(receivedMessage.message);
  const note = JSON.parse(MessageInfo?.Note);
  const doc = getDocFromXml(note?.responseString);

  const parseToDate = dateIn => {
    // We get three distinct date formats that we might be dealing with
    // 2022-03-22T09:11:20+0000
    // 2022-03-22 09:11:20.588 GMT
    // 22/03/2022
    // Until we have a consensus on an alternative to Moment,
    // we'll just use Date.parse here, which will fail on the last format
    if (!dateIn) return null;
    return Date.parse(dateIn);
  };

  const getDate = dateIn => {
    const epoch = parseToDate(dateIn);
    return (!epoch || isNaN(epoch)) ?
      null :
      intl.formatDate(epoch);
  };

  const getTime = dateIn => {
    const epoch = parseToDate(dateIn);
    return (!epoch || isNaN(epoch)) ?
      null :
      intl.formatTime(epoch);
  };

  const getCost = () => {
    const cost = getTagValueFromDoc(doc, 'totalCost');
    const currency = getAttributeValueFromDoc(doc, 'totalCost', 'currency');
    if (!cost || !currency) return null;
    return intl.formatNumber(cost, { style: 'currency', currency });
  };

  const getCopyrightState = () => {
    const copy = getTagValueFromDoc(doc, 'copyrightState');
    return copy ?
      intl.formatMessage({ id: `ui-plugin-ill-connector-bldss.messages.copyrightState.${copy}` }) :
      null;
  }

  return (
    <Card
      headerStart={
        <>
          {getDate(Header.Timestamp)} {getTime(Header.Timestamp)}
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
            {getDate(StatusInfo.LastChange)}
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
            {getDate(StatusInfo.ExpectedDeliveryDate)}
          </KeyValue>
        </Col>
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.updateMessage" />}>
            {note.blMessage}
          </KeyValue>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.updateNote" />}>
            {note?.blNote?.length > 0 ? note.blNote : null}
          </KeyValue>
        </Col>
      </Row>
      {doc && (
        <>
          <Row>
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.requestedFormat" />}>
                {getTagValueFromDoc(doc, 'format')}
              </KeyValue>
            </Col>
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.requestedSpeed" />}>
                {getTagValueFromDoc(doc, 'speed')}
              </KeyValue>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.requestedQuality" />}>
                {getTagValueFromDoc(doc, 'quality')}
              </KeyValue>
            </Col>
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.totalCost" />}>
                {getCost()}
              </KeyValue>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.copyrightState" />}>
                {getCopyrightState()}
              </KeyValue>
            </Col>
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.estimatedDespatchDate" />}>
                {getDate(getTagValueFromDoc(doc, 'estimatedDespatchDate'))}
              </KeyValue>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
