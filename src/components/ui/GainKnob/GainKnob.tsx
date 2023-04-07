import React from 'react';
import { Box, Typography } from '@mui/material';
import { Knob, KnobChangeEvent } from 'primereact/knob';

import useStyles from './GainKnob.styles';
import { PRE_AMP_MAX_GAIN, PRE_AMP_MIN_GAIN, PRE_AMP_STEPS } from '../../../constants/gainValues';

interface GainKnobProps {
  value: number;
  onChange(evt: KnobChangeEvent): void;
  size?: number
};

export default function GainKnob(props: GainKnobProps): JSX.Element {
  const { size = 50, value, onChange } = props;
  const styles = useStyles(size);

  function constrainValue(value: number): number {
    // limit the rendered value to the min and max constraints
    if(value < PRE_AMP_MIN_GAIN) {
      return PRE_AMP_MIN_GAIN
    } else if (value > PRE_AMP_MAX_GAIN) {
      return PRE_AMP_MAX_GAIN
    } else {
      return value
    }
  };

  return (
    <Box sx={styles.root}>
      <Knob
        value={constrainValue(value)}
        onChange={onChange}
        step={PRE_AMP_STEPS}
        min={PRE_AMP_MIN_GAIN}
        max={PRE_AMP_MAX_GAIN}
        valueTemplate={`+${value}dB`}
        size={size}
        role="slider"
      />
      <Typography variant='caption'>Gain</Typography>
    </Box>
  );
};
