import { useContext, useEffect, useState, Fragment } from 'react';
import { Grid, Flex } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';

import StyledHmrcOdxMimicASentenceWrapper from './styles';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function HmrcOdxMimicASentence(props) {
  const { getPConnect, children, template, label, NumCols } = props;

  let nCols = parseInt(NumCols);
  const [formElms, setFormElms] = useState([]);

  //console.log(`Rendering ${getPConnect()?.getComponentName()} with ${template} with ${children?.length} Region(s)`);

  useEffect(() => {
    const elms = [];
    const region = children[0] ? children[0].props.getPConnect() : null;
    if (region?.getChildren()) {
      region.getChildren().map(child => {
        child.getPConnect().setInheritedProp('readOnly', true);
        elms.push(child.getPConnect().getComponent());
      });
      setFormElms(elms);
    }
  }, [children[0]]);

  return (
    <StyledHmrcOdxMimicASentenceWrapper>
      <Flex>
        {formElms.map((field, index) => {
          const formattedValue = field.props.DateTimeFormat
            ? new Date(field.props.value).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })
            : field.props.value;
          return <Fragment key={index}>{formattedValue}&nbsp;</Fragment>;
        })}
      </Flex>
    </StyledHmrcOdxMimicASentenceWrapper>
  );
}

HmrcOdxMimicASentence.defaultProps = {
  NumCols: 1,
  templateOverrideMode: 'USE_TEMPLATE',
  children: []
};

HmrcOdxMimicASentence.propTypes = {
  label: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  template: PropTypes.string.isRequired
};
