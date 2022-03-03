import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { ILL_RA_API } from '../../constants';

const useIllRaMutation = ({ endpoint, ...rest }) => {
  const ky = useOkapiKy();

  return useMutation(
    json => ky.post(`${ILL_RA_API}/${endpoint}`, { json }),
    { ...rest }
  );

};

export default useIllRaMutation;
