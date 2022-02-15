import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Loading } from '@folio/stripes/components';

import { useServices } from '../../common/hooks/useServices';
import Format from './Format';

const Formats = ({
    connector,
    setCanSubmit,
    updateRequest
}) => {
    const {
        prices,
        formats,
        speeds,
        qualities,
        isFetching
    } = useServices({ connector });

    const [selectedService, setSelectedService] = useState({});

    // Update the state of the submittability and what the selected
    // service is based on whether we have a selected service
    useEffect(
        () => {
            const canSubmit = Object.keys(selectedService).length > 0;
            setCanSubmit(canSubmit);
            if (canSubmit) {
                updateRequest('services', selectedService);
            }
        },
        [selectedService]
    );

    // We are only interested in service "1"
    const preparePrices = useMemo(() => {
        if (prices) {
            return prices?.services?.service?.find(el => el.id === 1);
        } else {
            return {};
        }
    }, [prices]);

    // We need to pass along miscellaneous service info
    // from the API response
    const miscInfo = useMemo(() => {
        if (prices) {
            const {
                copyrightVat,
                currency,
                loanRenewalCost,
                region
            } = prices;
            return {
                copyrightVat,
                currency,
                loanRenewalCost,
                region
            };
        }
    }, [prices]);

    return isFetching ?
        <Loading /> :
        (<>
            {preparePrices?.format?.map(format => (
                <Format
                    key={format.id}
                    format={format}
                    formatLookup={formats}
                    qualityLookup={qualities}
                    speedLookup={speeds}
                    setSelectedService={setSelectedService}
                    selectedService={selectedService}
                    miscInfo={miscInfo}
                />
            ))}
        </>);
};

Formats.propTypes = {
    connector: PropTypes.object.isRequired,
    setCanSubmit: PropTypes.func.isRequired,
    updateRequest: PropTypes.func.isRequired
};

export default Formats;