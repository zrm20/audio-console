import React from 'react';
import { render } from '@testing-library/react';

import GroupOutAssignment from './GroupOutAssignment';
import { ToggleButton } from 'primereact/togglebutton';

jest.mock('primereact/togglebutton', () => ({
  ToggleButton: jest.fn()
}));

describe('<GroupOutAssignment />', () => {
  let mockToggleButton = ToggleButton as jest.Mock;
  beforeEach(() => {
    mockToggleButton.mockReset();
  });

  it("should render a ToggleButton for every group in array", () => {
    // Arrange
    const groups = [
      { id: 't1', name: "Test 1" },
      { id: 't2', name: "Test 2" },
    ];
    const value: string[] = [];
    const onChange = jest.fn();

    // Act
    render(<GroupOutAssignment groups={groups} value={value} onChange={onChange} />);

    // Assert
    groups.forEach(grp => {
      const expectedProps = expect.objectContaining({ onLabel: grp.name, offLabel: grp.name });
      expect(mockToggleButton).toHaveBeenCalledWith(expectedProps, {})
    });
  });

  it("should have checked values of true for each ToggleButton who's id is included in value array", () => {
    // Arrange
    const groups = [
      { id: 't1', name: "Test 1" },
      { id: 't2', name: "Test 2" },
    ];
    const value: string[] = ['t1'];
    const onChange = jest.fn();

    // Act
    render(<GroupOutAssignment groups={groups} value={value} onChange={onChange} />);

    // Assert
    groups.forEach(grp => {
      const expectedProps = expect.objectContaining({ checked: value.includes(grp.id) });
      expect(mockToggleButton).toHaveBeenCalledWith(expectedProps, {})
    });
  });

});