import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton';

import PadSwitch from './PadSwitch';
import { PRE_AMP_PAD_LEVEL } from '../../../constants/gainValues';

jest.mock("primereact/togglebutton", () => (
  {
    ToggleButton: jest.fn()
  }
))

describe('<PadSwitch />', () => {
  let mockToggleButton = ToggleButton as jest.Mock;
  beforeEach(() => {
    mockToggleButton.mockReset();
  });

  it("should render a ToggleButton correct props", () => {
    // Arrange
    const value = true;
    const changeFn = jest.fn();
    const expectedProps: ToggleButtonProps = {
      checked: value,
      onChange: changeFn,
      onLabel: `${PRE_AMP_PAD_LEVEL}dB`,
      offLabel: `${PRE_AMP_PAD_LEVEL}dB`
    };

    // Act
    render(<PadSwitch value={value} onChange={changeFn} />);

    // Assert
    expect(ToggleButton).toHaveBeenCalledWith(expectedProps, {});
  });
});