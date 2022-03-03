import React from 'react';

import Message from './Message';

const DisplayRequest = ({ data }) => {
  const messages = data?.messages?.results?.messages;
  return !messages ? null : messages.map(message => (
    <Message key={message.id} message={message} />
  ));
};

export default DisplayRequest;
