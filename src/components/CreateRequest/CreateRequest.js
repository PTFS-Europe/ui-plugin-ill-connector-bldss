import React from 'react';
import PropTypes from 'prop-types';

import { SearchConnectorContainer } from '@ptfs-europe/ill-components';

const CreateRequest = (props) => {
  const { submission, connector } = props.data;
  return <SearchConnectorContainer submission={submission} connector={connector} />;
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
