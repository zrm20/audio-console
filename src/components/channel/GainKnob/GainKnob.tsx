import React from 'react';
import { Box } from '@mui/material';
import { Knob, KnobChangeEvent } from 'primereact/knob';

import useStyles from './GainKnob.styles';
import { PRE_AMP_MAX_GAIN, PRE_AMP_MIN_GAIN, PRE_AMP_STEPS } from '../../../constants/gainValues';
import { COMPONENT_SIZE } from '../../../constants/primeReactSizes';
import { constrainValue } from '../../../utils';

interface GainKnobProps {
  value: number;
  onChange(evt: KnobChangeEvent): void;
};

export default function GainKnob(props: GainKnobProps): JSX.Element {
  const { value, onChange } = props;
  const styles = useStyles();

  return (
    <Box sx={styles.root}>
      <Knob
        value={constrainValue(value, PRE_AMP_MIN_GAIN, PRE_AMP_MAX_GAIN)}
        onChange={onChange}
        step={PRE_AMP_STEPS}
        min={PRE_AMP_MIN_GAIN}
        max={PRE_AMP_MAX_GAIN}
        valueTemplate={`+${value}dB`}
        size={COMPONENT_SIZE}
        role="slider"
      />
      <label>Gain</label>
    </Box>
  );
};
