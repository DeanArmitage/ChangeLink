import { useEffect, useState, Fragment } from 'react';
import { Grid, Link, Flex } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';

import StyledHmrcOdxCheckAnswerWithChangeLinkWrapper from './styles';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function HmrcOdxCheckAnswerWithChangeLink(props) {
  const {
    actions,
    getPConnect,
    children,
    template,
    label,
    NumCols,
    sectionHeader,
    stepId,
    containerItemID
  } = props;

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
    <StyledHmrcOdxCheckAnswerWithChangeLinkWrapper>
      <h2>{sectionHeader}</h2>
      <Grid
        container={{
          cols: `repeat(${nCols}, minmax(0, 1fr))`,
          gap: 2,
          wrap: `wrap`
        }}
      >
        <dl className='govuk-summary-list'>
          {formElms.map((field, index) => {
            const formattedValue = field.props.DateTimeFormat
              ? new Date(field.props.value).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })
              : field.props.value;

            return (
              <Fragment key={index}>
                <div className='govuk-summary-list__row'>
                  <dt className='govuk-summary-list__key'>{field.props.label}</dt>
                  <dd className='govuk-summary-list__value'>{formattedValue}</dd>
                  <dd className='govuk-summary-list__actions'>
                    <Link className='govuk-link' href='#' onClick={handleOnClick}>
                      Change<span className='govuk-visually-hidden'> {field.props.label}</span>
                    </Link>
                  </dd>
                </div>
              </Fragment>
            );
          })}
        </dl>
      </Grid>
    </StyledHmrcOdxCheckAnswerWithChangeLinkWrapper>
  );
}

HmrcOdxCheckAnswerWithChangeLink.defaultProps = {
  NumCols: 1,
  templateOverrideMode: 'USE_TEMPLATE',
  children: []
};

HmrcOdxCheckAnswerWithChangeLink.propTypes = {
  label: PropTypes.string,
  sectionHeader: PropTypes.string,
  stepId: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  template: PropTypes.string.isRequired
};
