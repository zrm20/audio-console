import React from 'react';
import { Box } from '@mui/material';
import { Knob, KnobChangeEvent } from 'primereact/knob';

import useStyles from './GainKnob.styles';
import { COMPONENT_SIZE } from '../../../constants/primeReactSizes';
import { constrainValue } from '../../../utils';
import { PRE_AMP_MAX_GAIN, PRE_AMP_MIN_GAIN } from '../../../constants/busLevels';

interface GainKnobProps {
  value: number;
  onChange(evt: KnobChangeEvent): void;
  size?: number;
};
function GainKnob(props: GainKnobProps): JSX.Element {
  const { value, onChange, size = 100 } = props;
  const styles = useStyles(size);
  const sizeMultiplier = size / 100;

  return (
    <Box sx={styles.root}>
      <Knob
        value={constrainValue(value, PRE_AMP_MIN_GAIN, PRE_AMP_MAX_GAIN)}
        onChange={onChange}
        step={1}
        min={PRE_AMP_MIN_GAIN}
        max={PRE_AMP_MAX_GAIN}
        valueTemplate={`+${value}dB`}
        size={COMPONENT_SIZE * sizeMultiplier}
        role="slider"
      />
      <label>Gain</label>
    </Box>
  );
};

export default React.memo(GainKnob);
