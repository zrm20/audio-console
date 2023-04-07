import React from 'react';
import { render, screen } from '@testing-library/react';
import { Checkbox, CheckboxProps } from 'primereact/checkbox';

import PadSwitch from './PadSwitch';
import { PRE_AMP_PAD_LEVEL } from '../../../constants/gainValues';

jest.mock("primereact/checkbox", () => (
  {
    Checkbox: jest.fn()
  }
))

describe('<PadSwitch />', () => {
  let mockCheckbox = Checkbox as jest.Mock;
  beforeEach(() => {
    mockCheckbox.mockReset();
  });

  it("should render a checkbox correct props", () => {
    // Arrange
    const value = true;
    const changeFn = jest.fn();
    const expectedProps: CheckboxProps = {
      checked: value,
      onChange: changeFn
    };

    // Act
    render(<PadSwitch value={value} onChange={changeFn} />);

    // Assert
    expect(Checkbox).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a label that says 'Pad'", () => {
    // Arrange
    const value = true;
    const changeFn = jest.fn();

    // Act
    render(<PadSwitch value={value} onChange={changeFn} />);

    // Assert
    expect(screen.queryByText(`${PRE_AMP_PAD_LEVEL} Pad`)).not.toBeNull();
  })

});