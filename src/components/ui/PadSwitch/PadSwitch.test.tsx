import React from 'react';
import { render, screen } from '@testing-library/react';
import { Checkbox } from 'primereact/checkbox';

import PadSwitch from './PadSwitch';
import { PRE_AMP_PAD_LEVEL } from '../../../constants/gainValues';

jest.mock("primereact/checkbox", () => (
  {
    Checkbox: jest.fn()
  }
))

describe('<PadSwitch />', () => {
  it("should render a checkbox with value, onChange and defaults", () => {
    const value = true;
    const changeFn = jest.fn();

    render(<PadSwitch value={value} onChange={changeFn} />);

    expect(Checkbox).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          checked: value,
          onChange: changeFn
        }
      ),
      {}
    );
  });

  it("should render a label that says 'Pad'", () => {
    const value = true;
    const changeFn = jest.fn();

    render(<PadSwitch value={value} onChange={changeFn} />);

    expect(screen.queryByText(`${PRE_AMP_PAD_LEVEL} Pad`)).not.toBeNull();
  })

});