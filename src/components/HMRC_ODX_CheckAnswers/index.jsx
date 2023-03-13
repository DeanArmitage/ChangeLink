import { useEffect, useState, Fragment } from 'react';
import { Grid, Flex } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';

import StyledHmrcOdxCheckAnswersWrapper from './styles';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function HmrcOdxCheckAnswers(props) {
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
    <StyledHmrcOdxCheckAnswersWrapper>
      <Grid
        container={{
          cols: `repeat(${nCols}, minmax(0, 1fr))`,
          gap: 2,
          wrap: `wrap`
        }}
      >
        {formElms.map((field, index) => (
          <Fragment key={index}>{field}</Fragment>
        ))}
      </Grid>
    </StyledHmrcOdxCheckAnswersWrapper>
  );
}

HmrcOdxCheckAnswers.defaultProps = {
  NumCols: 1,
  templateOverrideMode: 'USE_TEMPLATE',
  children: []
};

HmrcOdxCheckAnswers.propTypes = {
  label: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  template: PropTypes.string.isRequired
};
