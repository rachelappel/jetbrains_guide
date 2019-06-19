import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import {ResourceCardThumbnail, ResourceCardThumbnailProps } from './ResourceCardThumbnail';

export const DUMMY_RCTH: ResourceCardThumbnailProps = {
  childImageSharp: {
    fluid: { aspectRatio: 9, src: 'src', srcSet: 'src', sizes: '987' }
  }
};

test('ResourceCardThumbnail', () => {
  const { getByAltText } = render(<ResourceCardThumbnail {...DUMMY_RCTH}/>);
  expect(getByAltText('rcg-thumbnail')).toHaveAttribute('sizes', '987');
});
