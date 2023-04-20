import React, { useState } from 'react';
import { Card, Typography } from '@mui/material';

import useStyles from './BusMaster.styles';
import Meter from '../Meter/Meter';
import Fader from '../Fader/Fader';
import { Divider } from 'primereact/divider';
import MuteButton from '../MuteButton/MuteButton';
import { MIN_DBFS_VALUE } from '../../../constants/audioLevels';
import { constrainValue, sumSignals } from '../../../utils';
import { useConsoleContext } from '../../../hooks/useConsoleContext/useConsoleContext';

interface BusMasterProps {
  size?: number;
  id: string;
};

export default function BusMaster(props: BusMasterProps): JSX.Element {
  const { size = 100, id } = props;
  const styles = useStyles(size);
  const [fader, setValue] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const consoleState = useConsoleContext();

  const bus = consoleState!.busses[id];
  const level = sumSignals(Object.values(bus.sources));

  function getBusOutput(): number {
    if(isMuted) {
      return MIN_DBFS_VALUE
    };

    return constrainValue(level + fader, MIN_DBFS_VALUE, 0);
  };

  const busOutput = getBusOutput();


  return (
    <Card variant='outlined' sx={styles.root}>
      <Meter signalLevel={busOutput} size={size} />

      <Divider />

      <MuteButton value={isMuted} onChange={evt => setIsMuted(evt.value)} size={size} />
      <Fader value={fader} onChange={evt => setValue(evt.value as number)} size={size} />

      <Divider />
      <Typography sx={styles.name}>{bus.name}</Typography>
    </Card>
  );
};