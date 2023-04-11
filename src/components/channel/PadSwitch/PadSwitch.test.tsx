import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton';

import PadSwitch from './PadSwitch';
import { DEFAULT_PAD_LEVEL } from '../../../constants/busLevels';

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

  it("should render a ToggleButton correct props, default level of -20", () => {
    // Arrange
    const value = true;
    const changeFn = jest.fn();
    const expectedProps: ToggleButtonProps = {
      checked: value,
      onChange: changeFn,
      onLabel: `${DEFAULT_PAD_LEVEL}dB`,
      offLabel: `${DEFAULT_PAD_LEVEL}dB`
    };

    // Act
    render(<PadSwitch value={value} onChange={changeFn} />);

    // Assert
    expect(ToggleButton).toHaveBeenCalledWith(expectedProps, {});
  });
  
  it("should pass a padLevel prop", () => {
    // Arrange
    const padLevel = -10;
    const value = true;
    const changeFn = jest.fn();
    const props: ToggleButtonProps = {
      onLabel: `${padLevel}dB`,
      offLabel: `${padLevel}dB`
    };
    const expectedProps = expect.objectContaining(props);

    // Act
    render(<PadSwitch value={value} onChange={changeFn} padLevel={padLevel} />);

    // Assert
    expect(ToggleButton).toHaveBeenCalledWith(expectedProps, {});
  });
});