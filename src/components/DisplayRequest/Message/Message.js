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
  return tag.getAttribute(attributeName);
}

const Message = ({ message: receivedMessage }) => {
  const intl = useIntl();
  const { Header, MessageInfo, StatusInfo } = JSON.parse(receivedMessage.message);
  const note = JSON.parse(MessageInfo?.Note);
  const doc = getDocFromXml(note?.responseString);

  const getCost = (doc) => {
    const cost = getTagValueFromDoc(doc, 'totalCost');
    const currency = getAttributeValueFromDoc(doc, 'totalCost', 'currency');
    if (!cost || !currency) return null;
    return intl.formatNumber(cost, { style: 'currency', currency });
  };

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
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.updateMessage" />}>
              {note.blMessage}
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.updateNote" />}>
              {note?.blNote.length > 0 ? note.blNote : null}
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
                  {getCost(doc)}
                </KeyValue>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.copyrightState" />}>
                  {intl.formatMessage({ id: `ui-plugin-ill-connector-bldss.messages.copyrightState.${getTagValueFromDoc(doc, 'copyrightState')}` })}
                </KeyValue>
              </Col>
              <Col xs={6}>
                <KeyValue label={<FormattedMessage id="ui-plugin-ill-connector-bldss.messages.estimatedDespatchDate" />}>
                  <FormattedDate value={getDate(getTagValueFromDoc(doc, 'estimatedDespatchDate'))} />
                </KeyValue>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
