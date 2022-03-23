import React from 'react';

import { FormattedMessage } from 'react-intl';

import Message from './Message';

const DisplayRequest = ({ data }) => {
  const messages = data?.messages?.results?.messages;
  return !messages ?
    null :
    (
      <>
        <FormattedMessage tagName="h3" id="ui-plugin-ill-connector-bldss.messages.supplierUpdates" />
        {messages.map(message => <Message key={message.id} message={message} />)}
      </>
    );
};

export default DisplayRequest;
