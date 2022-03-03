import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { CONNECTOR_API } from '../../constants';

const useConnectorMutation = ({ endpoint, method, connectorId, ...rest }) => {
  const ky = useOkapiKy();
  return useMutation(
    json => ky
      .extend({
        headers: {
          'X-Okapi-Module-Id': connectorId,
          'Content-type': 'application/json'
        },
      })
    [method](`${CONNECTOR_API}/${endpoint}`, { json }),
    { ...rest }
  );

};

export default useConnectorMutation;

