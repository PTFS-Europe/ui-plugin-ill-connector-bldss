import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Loading } from '@folio/stripes/components';

import { useServices } from '../../common/hooks/useServices';
import Format from './Format';

const Formats = ({
    connector,
    setCanSubmit
}) => {
    const {
        prices,
        formats,
        speeds,
        qualities,
        isFetching
    } = useServices({ connector });

    const [selectedFormat, setSelectedFormat] = useState(-1);

    // Update the state of the submittability based on whether
    // we have a selected format
    useEffect(() => setCanSubmit(selectedFormat > 0), [selectedFormat]);

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
                    setSelectedFormat={setSelectedFormat}
                    selectedFormat={selectedFormat}
                    miscInfo={miscInfo}
                />
            ))}
        </>);
};

Formats.propTypes = {
    connector: PropTypes.object.isRequired,
    setCanSubmit: PropTypes.func.isRequired
};

export default Formats;