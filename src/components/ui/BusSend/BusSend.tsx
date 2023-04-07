import React from 'react';
import { Box } from '@mui/material';
import { Knob, KnobChangeEvent } from 'primereact/knob';

import { BUS_MAX, BUS_MIN, BUS_STEPS, NOMINAL_LEVEL } from '../../../constants/gainValues';
import { COMPONENT_SIZE } from '../../../constants/primeReactSizes';
import { constrainValue } from '../../../utils';

import useStyles from './BusSend.styles';

interface BusSendProps {
  value: number;
  onChange(evt: KnobChangeEvent): void;
  name: string;
};

export default function BusSend(props: BusSendProps): JSX.Element {
  const { value, onChange, name } = props;
  const styles = useStyles();
  const id = `bus-${name}`

  return (
    <Box sx={styles.root}>
      <Knob
        value={constrainValue(value, BUS_MIN, BUS_MAX)}
        onChange={onChange}
        role="slider"
        min={BUS_MIN}
        max={BUS_MAX}
        step={BUS_STEPS}
        size={COMPONENT_SIZE}
        id={id}
        valueTemplate={`${(value > NOMINAL_LEVEL) ? '+' : ''}${value - NOMINAL_LEVEL}dB`}
      />
      <label htmlFor={id}>{name}</label>
    </Box>
  );
};