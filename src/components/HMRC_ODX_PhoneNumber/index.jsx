import { useEffect, useState, useRef } from 'react';
import { Input, FieldValueList, Text, useTheme, Configuration } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';

// include in bundle
import handleEvent from './event-utils';
import StatusWorkRenderer from './StatusWork';
import { formatExists, textFormatter } from './text-input';
import { suggestionsHandler } from './suggestions-handler';

import StyledHmrcOdxPhoneNumberWrapper from './styles';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const HmrcOdxPhoneNumber = props => {
  const {
    getPConnect,
    placeholder,
    validatemessage,
    label,
    hideLabel,
    helperText,
    testId,
    fieldMetadata,
    additionalProps,
    displayMode,
    displayAsStatus,
    variant,
    hasSuggestions,
    isTableFormatter
  } = props;
  const { formatter } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn.getStateProps().value;
  const maxLength = fieldMetadata?.maxLength;
  const hasValueChange = useRef(false);

  let { value, readOnly, required, disabled } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    prop => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const [inputValue, setInputValue] = useState(value);
  const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);
  useEffect(() => setInputValue(value), [value]);

  const theme = PCore?.getEnvironmentInfo().getTheme();

  useEffect(() => {
    if (validatemessage !== '') {
      setStatus('error');
    }
    if (hasSuggestions) {
      setStatus('pending');
    } else if (!hasSuggestions && status !== 'success') {
      setStatus(validatemessage !== '' ? 'error' : undefined);
    }
  }, [validatemessage, hasSuggestions]);

  const onResolveSuggestionHandler = accepted => {
    suggestionsHandler(accepted, pConn, setStatus);
  };
  // Override the value to render as status work when prop passed to display as status
  if (displayAsStatus) {
    value = StatusWorkRenderer({ value });

    // Fall into this scenario for case summary, default to stacked status
    if (!displayMode) {
      return (
        <Configuration theme={theme}>
          <FieldValueList
            variant='stacked'
            data-testid={testId}
            fields={[{ id: 'status', name: label, value }]}
          />
        </Configuration>
      );
    }
  }

  if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
    let displayComp = value || <span aria-hidden='true'>&ndash;&ndash;</span>;
    if (isTableFormatter && formatExists(formatter)) {
      displayComp = textFormatter(formatter, value);
    }
    return displayMode === 'DISPLAY_ONLY' ? (
      <Configuration theme={theme}>
        <StyledHmrcOdxPhoneNumberWrapper> displayComp </StyledHmrcOdxPhoneNumberWrapper>
      </Configuration>
    ) : (
      <Configuration theme={theme}>
        <StyledHmrcOdxPhoneNumberWrapper>
          <FieldValueList
            variant={hideLabel ? 'stacked' : variant}
            data-testid={testId}
            fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
          />
        </StyledHmrcOdxPhoneNumberWrapper>
      </Configuration>
    );
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    const isValDefined = typeof value !== 'undefined' && value !== '';
    const val = isValDefined ? (
      <Text variant='h1' as='span'>
        {value}
      </Text>
    ) : (
      ''
    );
    return (
      <Configuration theme={theme}>
        <StyledHmrcOdxPhoneNumberWrapper>
          <FieldValueList
            variant='stacked'
            data-testid={testId}
            fields={[{ id: '2', name: hideLabel ? '' : label, value: val }]}
          />
        </StyledHmrcOdxPhoneNumberWrapper>
      </Configuration>
    );
  }

  return (
    <Configuration theme={theme}>
      <StyledHmrcOdxPhoneNumberWrapper>
        <Input
          {...additionalProps}
          type='tel'
          label={label}
          labelHidden={hideLabel}
          info={validatemessage || helperText}
          data-testid={testId}
          value={inputValue}
          status={status}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          onChange={event => {
            if (hasSuggestions) {
              setStatus(undefined);
            }
            setInputValue(event.target.value);
            if (value !== event.target.value) {
              handleEvent(actions, 'change', propName, event.target.value);
              hasValueChange.current = true;
            }
          }}
          onBlur={event => {
            if ((!value || hasValueChange.current) && !readOnly) {
              handleEvent(actions, 'blur', propName, event.target.value);
              if (hasSuggestions) {
                pConn.ignoreSuggestion();
              }
              hasValueChange.current = false;
            }
          }}
          onResolveSuggestion={onResolveSuggestionHandler}
        />
      </StyledHmrcOdxPhoneNumberWrapper>
    </Configuration>
  );
};

HmrcOdxPhoneNumber.defaultProps = {
  value: '',
  placeholder: '',
  validatemessage: '',
  helperText: '',
  displayAsStatus: false,
  hideLabel: false,
  disabled: false,
  readOnly: false,
  required: false,
  testId: null,
  fieldMetadata: {},
  additionalProps: {},
  displayMode: null,
  variant: 'inline',
  formatter: '',
  isTableFormatter: false,
  hasSuggestions: false
};

HmrcOdxPhoneNumber.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  displayMode: PropTypes.string,
  displayAsStatus: PropTypes.bool,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string,
  fieldMetadata: PropTypes.objectOf(PropTypes.any),
  additionalProps: PropTypes.objectOf(PropTypes.any),
  variant: PropTypes.string,
  formatter: PropTypes.string,
  isTableFormatter: PropTypes.bool,
  hasSuggestions: PropTypes.bool
};

export default HmrcOdxPhoneNumber;
