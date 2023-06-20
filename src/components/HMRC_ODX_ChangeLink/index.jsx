import PropTypes from 'prop-types';
import { Input, Label, Link, Flex } from '@pega/cosmos-react-core';

import StyledHmrcOdxChangeLinkWrapper from './styles';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const HmrcOdxChangeLink = props => {
  const {
    getPConnect,
    value,
    placeholder,
    disabled,
    readOnly,
    required,
    label,
    testId,
    stepId,
    sectionHeader
  } = props;

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn?.getStateProps()?.value;

  const target = pConn.getTarget();
  const key = pConn.getCaseInfo().getKey();

  const containerItemID = PCore.getContainerUtils().getContainerItemName(target, key);

  const handleOnChange = event => {
    const { value: updatedValue } = event.target;
    actions.updateFieldValue(propName, updatedValue);
  };

  const handleOnClick = () => {
    const navigateToStepPromise = actions.navigateToStep(stepId, containerItemID);

    navigateToStepPromise
      .then(() => {
        // navigate to step success handling
        // console.log('navigation successful');
      })
      .catch(error => {
        // navigate to step failure handling
        // console.log('navigation failed', error);
      });
  };

  return (
    <StyledHmrcOdxChangeLinkWrapper>
      <Flex container={{ pad: 1, gap: 6 }}>
        <Flex item={{ grow: 1 }}>
          <h2>{sectionHeader}</h2>
        </Flex>
        <Flex item={{ grow: 0 }}>
          <Link href='#' onClick={handleOnClick}>
            Change
          </Link>
        </Flex>
      </Flex>
    </StyledHmrcOdxChangeLinkWrapper>
  );
};

HmrcOdxChangeLink.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

HmrcOdxChangeLink.propTypes = {
  label: PropTypes.string,
  sectionHeader: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default HmrcOdxChangeLink;
