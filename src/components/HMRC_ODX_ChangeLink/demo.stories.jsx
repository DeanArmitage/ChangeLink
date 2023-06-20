import { useState } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import HmrcOdxChangeLink from './index.jsx';

export default {
  title: 'HmrcOdxChangeLink',
  decorators: [withKnobs],
  component: HmrcOdxChangeLink
};

export const baseHmrcOdxChangeLink = () => {
  const [value, setValue] = useState('test value');

  const props = {
    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: (propName, value) => {
              setValue(value);
            }
          };
        },
        getStateProps: () => {
          return { value: '.name' };
        },
        getTarget: () => {
          return { target: 'targetContainer' };
        },
        getCaseInfo: () => {
          return {
            getKey: () => {
              return { key: 12345 };
            }
          };
        }
      };
    },
    PCore: {
      getContainerUtils: () => {
        return {
          getContainerItemName: () => {
            return { containerItemName: 'containerItemName' };
          }
        };
      }
    },
    value,
    placeholder: text('Placeholder', 'Test placeholder'),
    disabled: boolean('Disabled', false),
    readOnly: boolean('Disabled', false),
    required: boolean('Disabled', false),
    label: text('Label', 'Sample Label'),
    sectionHeader: text('Section header', 'Section header'),
    testId: text('Test id', 'text-12344566')
  };

  return (
    <>
      <HmrcOdxChangeLink {...props} />
    </>
  );
};
