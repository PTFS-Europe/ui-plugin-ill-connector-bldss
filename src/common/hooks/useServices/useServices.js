import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useConnector } from '@ptfs-europe/ill-components';

const useServices = ({ connector }) => {

    const [prices, setPrices] = useState();
    const [services, setServices] = useState();
    const [formats, setFormats] = useState();
    const [speeds, setSpeeds] = useState();
    const [qualities, setQualities] = useState();
    const [isFetching, setIsFetching] = useState();

    const { isFetching: isPricesFetching, data: dataPrices } = useConnector({
        connector: connector.id,
        method: 'get',
        endpoint: 'prices'
    });

    const { isFetching: isServicesFetching, data: dataServices } = useConnector({
        connector: connector.id,
        method: 'get',
        endpoint: 'services'
    });

    const { isFetching: isFormatsFetching, data: dataFormats } = useConnector({
        connector: connector.id,
        method: 'get',
        endpoint: 'formats'
    });

    const { isFetching: isSpeedsFetching, data: dataSpeeds } = useConnector({
        connector: connector.id,
        method: 'get',
        endpoint: 'speeds'
    });

    const { isFetching: isQualitiesFetching, data: dataQualities } = useConnector({
        connector: connector.id,
        method: 'get',
        endpoint: 'quality'
    });

    // Watch for all required data having been received
    useEffect(() => {
        if (
            !isPricesFetching &&
            !isServicesFetching &&
            !isFormatsFetching &&
            !isSpeedsFetching &&
            !isQualitiesFetching
        ) {
            setIsFetching(false);
        }
    }, [
        isPricesFetching,
        isServicesFetching,
        isFormatsFetching,
        isSpeedsFetching,
        isQualitiesFetching
    ]);
    // Update our local state as we receive data
    useEffect(() => {
        if (dataPrices && !prices) {
            setPrices(dataPrices?.getterResult?.result);
        }
        if (dataServices && !services) {
            setServices(dataServices?.getterResult?.result?.scheme);
        }
        if (dataFormats && !formats) {
            setFormats(dataFormats?.getterResult?.result?.scheme);
        }
        if (dataSpeeds && !speeds) {
            setSpeeds(dataSpeeds?.getterResult?.result?.scheme);
        }
        if (dataQualities && !qualities) {
            setQualities(dataQualities?.getterResult?.result?.scheme);
        }
    }, [dataPrices, dataServices, dataFormats, dataSpeeds, dataQualities]);

    return {
        prices,
        services,
        formats,
        speeds,
        qualities,
        isFetching
    };
};

useServices.propTypes = {
  connector: PropTypes.string.isRequired
};

export default useServices;