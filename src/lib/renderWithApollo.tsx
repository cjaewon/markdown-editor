import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';

export default function renderWithApollo(
  ui: React.ReactElement<any, any>,
  mocks: MockedResponse[]
) {
  const utils = render(<MockedProvider mocks={mocks}>{ui}</MockedProvider>);
  return {
    ...utils
  };
}
