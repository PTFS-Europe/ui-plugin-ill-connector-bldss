import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useIntl, FormattedMessage } from 'react-intl';

import {
    Button,
    Card,
    Col,
    Headline,
    Loading,
    RadioButton,
    RadioButtonGroup,
    Row
} from '@folio/stripes/components';

import css from './Format.css';

const Format = ({
    format,         // Details of the format, including it's available speeds and qualities
    formatLookup,   // An array of all format IDs and names
    qualityLookup,  // An array of all quality IDs and names
    speedLookup,    // An array of all speed IDs and names
    setSelectedService, // A setter for the selected options once a format is selected
    selectedService, // A object containing the selected format, speed and quality
    miscInfo        // Misc info pertaining to the service
}) => {
    if (!formatLookup || !qualityLookup || !speedLookup) return null;

    const intl = useIntl();

    const [preppedFormats, setPreppedFormats] = useState();
    const [preppedSpeeds, setPreppedSpeeds] = useState();
    const [preppedQualities, setPreppedQualities] = useState();
    const [formatsSpeeds, setFormatsSpeeds] = useState([]);
    const [formatsQualities, setFormatsQualities] = useState([]);

    const [selectedSpeed, setSelectedSpeed] = useState();
    const [selectedQuality, setSelectedQuality] = useState();
    const [selectedPrice, setSelectedPrice] = useState();

    // Prepare all the objects we're dealing with for easy use
    useEffect(() => {
        setPreppedFormats(arrayToObject(formatLookup));
        setPreppedSpeeds(arrayToObject(speedLookup));
        setPreppedQualities(arrayToObject(qualityLookup));
        setFormatsSpeeds(uniqueDeduped(format.price, 'speed'));
        setFormatsQualities(uniqueDeduped(format.price, 'quality'));
    }, []);

    // Watch changes to selected prices and qualities and update
    // the price accordingly
    useEffect(() => {
        if (
            (formatsSpeeds.length === 0 || selectedSpeed) &&
            (formatsQualities.length === 0 || selectedQuality)
        ) {
            const price = format.price.find(p => p.speed === selectedSpeed && p.quality === selectedQuality);
            setSelectedPrice(price?.content);
        }

    }, [selectedSpeed, selectedQuality]);

    // Take an array of { key: 'abc', content: 'xyz'} objects
    // and return a { abc: 'xyz' } object
    const arrayToObject = (arr) => {
        return !arr ? {} : arr.reduce((acc, curr) => {
            return { ...acc, [curr.key]: curr.content };
        }, {});
    };

    // Take an array and return that array deduped and
    // with any nulls removed
    const uniqueDeduped = (toProcess, property) => {
        return Array.from(
            new Set(toProcess.map(p => p[property]))
        ).filter(x => x); // Remove any null entries
    };

    // Pass details of the selected service back
    const selectService = () => {
        setSelectedService({
            format: format.id,
            speed: selectedSpeed,
            quality: selectedQuality
        });
    };

    // Return the correct message depending on whether this format
    // is selected or not
    const selectMessage = selectedService.format === format.id ?
        intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.formats.selectedFormat' }) :
        intl.formatMessage({ id: 'ui-plugin-ill-connector-bldss.formats.selectFormat' });

    // Return the "Choose this format" button
    const chooseFormat = (
        <Button
            buttonStyle={selectedService.format === format.id ? 'primary' : 'default'}
            onClick={selectService}
            buttonClass={css.button}
        >
            {selectMessage} - {intl.formatNumber(selectedPrice, { style: 'currency', currency: miscInfo.currency })}
        </Button>
    );

    // The content of our format card
    const FormatContent = ({
        headlineText,
        optionsList,
        selectedOption,
        setOptionFn,
        lookup
    }) => {
        return optionsList.length > 0 ? (
            <>
                <Headline faded margin="none">
                    {headlineText}
                </Headline>
                <RadioButtonGroup>
                    {optionsList.map(o => (
                        <RadioButton
                            checked={selectedOption === o}
                            onChange={() => setOptionFn(o)}
                            key={`_${o}`}
                            inline={true}
                            value={o.toString()}
                            label={lookup[o]}
                        />
                    ))}
                </RadioButtonGroup>
            </>
        ) : null;
    };

    return (
        <Card
            headerClass={css.cardHeader}
            headerStart={<span>{preppedFormats && preppedFormats[format.id]}</span>}
            headerEnd={selectedPrice && chooseFormat}
        >
            {(!preppedSpeeds || !preppedQualities) ? <Loading /> : (
                <Row>
                    <Col xs={9}>
                        <>
                            <FormatContent
                                headlineText={<FormattedMessage id="ui-plugin-ill-connector-bldss.formats.speeds" />}
                                optionsList={formatsSpeeds}
                                selectedOption={selectedSpeed}
                                setOptionFn={setSelectedSpeed}
                                lookup={preppedSpeeds}
                            />

                            <FormatContent
                                headlineText={<FormattedMessage id="ui-plugin-ill-connector-bldss.formats.qualities" />}
                                optionsList={formatsQualities}
                                selectedOption={selectedQuality}
                                setOptionFn={setSelectedQuality}
                                lookup={preppedQualities}
                            />
                        </>
                    </Col>
                    <Col xs={3}>
                        {selectedPrice && (
                            <div className={css.formatInfo}>
                                <div className={css.formatInfoItem}>
                                    <FormattedMessage id="ui-plugin-ill-connector-bldss.formats.copyrightFee" />: {intl.formatNumber(miscInfo.copyrightVat, { style: 'currency', currency: miscInfo.currency })}
                                </div>
                                <div className={css.formatInfoItem}>
                                    <FormattedMessage id="ui-plugin-ill-connector-bldss.formats.loanRenewalCost" />: {intl.formatNumber(miscInfo.loanRenewalCost, { style: 'currency', currency: miscInfo.currency })}
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            )}
        </Card>
    );
};

Format.propTypes = {
    format: PropTypes.object.isRequired,
    formatLookup: PropTypes.array,
    qualityLookup: PropTypes.array,
    speedLookup: PropTypes.array,
    setSelectedService: PropTypes.func.isRequired,
    selectedService: PropTypes.object.isRequired,
    miscInfo: PropTypes.object.isRequired
};

export default Format;