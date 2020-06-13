import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PublishURLSetting, {
  PublishURLSettingProps,
} from '../PublishURLSetting';

describe('PublishURLSetting', () => {
  const setup = (props: Partial<PublishURLSettingProps> = {}) => {
    const initialProps: PublishURLSettingProps = {
      username: 'velog',
      urlSlug: 'url-slug',
      onChangeUrlSlug: () => {},
    };
    const utils = render(<PublishURLSetting {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('shows username props', () => {
    const utils = setup();
    utils.getByText('/@velog/');
  });
  it('urlSlug is working properly', () => {
    const onChangeUrlSlug = jest.fn();
    const utils = setup({
      onChangeUrlSlug,
    });
    const input = utils.getByDisplayValue('url-slug');
    fireEvent.change(input, { target: { value: 'hello-world' } });
    expect(onChangeUrlSlug).toBeCalledWith('hello-world');
  });
});
