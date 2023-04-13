import React from 'react';
import { Box } from '@mui/material';
import { Slider, SliderChangeEvent } from 'primereact/slider';

import useStyles from './Fader.styles';
import { constrainValue } from '../../../utils';
import { BUS_MAX_GAIN, BUS_MIN_GAIN } from '../../../constants/busLevels';

interface FaderProps {
  value: number;
  onChange(evt: SliderChangeEvent): void;
  size?: number;
};

function Fader(props: FaderProps): JSX.Element {
  const { value, onChange, size=100 } = props;
  const styles = useStyles(size);

  return (
    <Box sx={styles.root}>
      <Slider 
        id="fader"
        value={constrainValue(value, BUS_MIN_GAIN, BUS_MAX_GAIN)}
        onChange={onChange}
        orientation="vertical"
        min={BUS_MIN_GAIN}
        max={BUS_MAX_GAIN}
        step={1}
      />
      <label htmlFor="fader">
        {value > 0 && '+'}{value > BUS_MIN_GAIN ? value : '-∞'}dB
      </label>
    </Box>
  );
};

export default React.memo(Fader);