import React from 'react';
import { Box } from '@mui/material';
import { Slider, SliderChangeEvent } from 'primereact/slider';

import useStyles from './Fader.styles';
import { BUS_MAX, BUS_MIN, FADER_STEPS, NOMINAL_LEVEL } from '../../../constants/gainValues';

interface FaderProps {
  value: number;
  onChange(evt: SliderChangeEvent): void;
};

export default function Fader(props: FaderProps): JSX.Element {
  const { value, onChange } = props;
  const styles = useStyles();

  function constrainValue(value: number): number {
    if(value < BUS_MIN) {
      return BUS_MIN
    } else if (value > BUS_MAX) {
      return BUS_MAX
    };

    return value;
  }

  return (
    <Box sx={styles.root}>
      <label htmlFor="fader">
        {value > NOMINAL_LEVEL && '+'}{value - NOMINAL_LEVEL}dB
      </label>
      <Slider 
        id="fader"
        value={constrainValue(value)}
        onChange={onChange}
        orientation="vertical"
        min={BUS_MIN}
        max={BUS_MAX}
        step={FADER_STEPS}
      />
    </Box>
  );
};