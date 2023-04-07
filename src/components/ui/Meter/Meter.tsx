import React from 'react';
import { Box } from '@mui/material';
import { ProgressBar } from "primereact/progressbar";

import useStyles from './Meter.styles';
import { constrainValue } from '../../../utils';
import { METER_MAX, METER_MIN, NOMINAL_LEVEL } from '../../../constants/gainValues';

interface MeterProps {
  value: number;
};

type MeterColor = "green" | "yellow" | "red"

export default function Meter(props: MeterProps): JSX.Element {
  const styles = useStyles();
  const value = constrainValue(props.value, METER_MIN, METER_MAX);

  function setColor(): MeterColor {
    if(value === METER_MAX) {
      return "red";
    } else if (value > NOMINAL_LEVEL) {
      return "yellow";
    };
    return "green"
  };

  return (
   <Box sx={styles.root}>
    <ProgressBar value={value} showValue={false} color={setColor()}/>
   </Box>
  );
};