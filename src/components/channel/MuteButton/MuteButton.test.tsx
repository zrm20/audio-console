import React from 'react';
import { render, screen } from '@testing-library/react';

import MuteButton from './MuteButton';
import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton';

jest.mock('primereact/togglebutton', () => ({
  ToggleButton: jest.fn()
}))

describe('<MuteButton />', () => {
  let mockToggleButton = ToggleButton as jest.Mock;
  beforeEach(() => {
    mockToggleButton.mockReset();
  });

  it("should render a ToggleButton with correct props", () => {
    // Arrange
    const value = true;
    const onChange = jest.fn();

    const props: ToggleButtonProps = {
      checked: value,
      onChange,
      onLabel: "Mute",
      offLabel: "Mute",
    };
    const expectedProps = expect.objectContaining(props);

    // Act
    render(<MuteButton value={value} onChange={onChange} />);

    // Assert
    expect(mockToggleButton).toHaveBeenCalledWith(expectedProps, {});
  });
  
  it("should have a background and border of red when muted", () => {
    // Arrange
    const value = true;
    const onChange = jest.fn();

    const props: ToggleButtonProps = {
      style: { background: "red", borderColor: "red"}
    };
    const expectedProps = expect.objectContaining(props);

    // Act
    render(<MuteButton value={value} onChange={onChange} />);

    // Assert
    expect(mockToggleButton).toHaveBeenCalledWith(expectedProps, {});
  });
  
  it("should have a background and border of undefined when not muted", () => {
    // Arrange
    const value = false;
    const onChange = jest.fn();

    const props: ToggleButtonProps = {
      style: { background: undefined, borderColor: undefined }
    };
    const expectedProps = expect.objectContaining(props);

    // Act
    render(<MuteButton value={value} onChange={onChange} />);

    // Assert
    expect(mockToggleButton).toHaveBeenCalledWith(expectedProps, {});
  });

});