import React from 'react';
import { Box } from '@mui/material';
import { ProgressBar } from "primereact/progressbar";

import useStyles from './Meter.styles';
import { convertDbToPercentage, constrainValue } from '../../../utils';
import { DBFS_NOMINAL } from '../../../constants/busLevels';
import { MIN_DBFS_VALUE } from '../../../constants/audioLevels';

interface MeterProps {
  signalLevel: number; // Signal Level in dBfs
  nominalLevel?: number; // dBfs level considered "nominal line level"
  size?: number; // relative size based on default of 100
  title?: string;
};

type MeterColor = "green" | "yellow" | "red"

function Meter(props: MeterProps): JSX.Element {
  const { signalLevel, nominalLevel = DBFS_NOMINAL, size = 100, title } = props;
  const styles = useStyles(size);

  const dbValueAsPercentage = convertDbToPercentage(signalLevel);

  function setColor(): MeterColor {
    if (signalLevel >= 0) {
      return "red";
    } else if (signalLevel > nominalLevel) {
      return "yellow";
    };
    return "green"
  };

  return (
    <Box sx={styles.root}>
      {
        Boolean(title) &&
        <label htmlFor="meter">{title?.slice(0, 10)}</label>
      }
      <Box sx={styles.meterContainer}>
        <ProgressBar
          value={dbValueAsPercentage}
          showValue={false}
          color={setColor()}
          id="meter"
        />
      </Box>
      <label>{constrainValue(signalLevel, MIN_DBFS_VALUE, 0)} dBfs</label>
    </Box>
  );
};

export default React.memo(Meter);