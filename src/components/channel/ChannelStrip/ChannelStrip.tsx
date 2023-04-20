import React from 'react';
import { Card, Typography } from '@mui/material';
import { Divider } from 'primereact/divider';

import GainKnob from '../GainKnob/GainKnob';
import useStyles from './ChannelStrip.styles';
import PadSwitch from '../PadSwitch/PadSwitch';
import BusSend from '../BusSend/BusSend';
import Fader from '../Fader/Fader';
import Meter from '../Meter/Meter';
import MuteButton from '../MuteButton/MuteButton';
import { BUS_MIN_GAIN, DEFAULT_PAD_LEVEL } from '../../../constants/busLevels';
import { MIN_DBFS_VALUE } from '../../../constants/audioLevels';
import GroupOutAssignment from '../GroupOutAssignment/GroupOutAssignment';
import { useChannelState } from '../../../hooks';

interface ChannelStripProps {
  name: string;
  inputValue: number;
  auxes: ConsoleBusInitializer[];
  groups: ConsoleBusInitializer[];
  id: string;
  size?: number;
};

function ChannelStrip(props: ChannelStripProps): JSX.Element {
  const { name, inputValue, size = 75, auxes, groups } = props;
  const styles = useStyles(size);
  const { state, handleChange }  = useChannelState();

  // Level pick points
  const padOutput = inputValue + (state.isPadded ? DEFAULT_PAD_LEVEL : 0);
  const preAmpOutput = padOutput + state.preAmpGain;
  const faderOutput = state.isMuted ? MIN_DBFS_VALUE : preAmpOutput + state.faderLevel;

  return (
    <Card variant='outlined' sx={styles.root}>
      <Meter signalLevel={preAmpOutput} size={size}/>

      <Divider />

      <GainKnob value={state.preAmpGain} onChange={handleChange.preAmpGain} size={size}/>
      <PadSwitch value={state.isPadded} onChange={handleChange.isPadded} size={size} />

      <Divider />
      {
        auxes.map(aux => (
          <BusSend
            key={aux.id}
            id={aux.id}
            name={aux.name}
            size={size}
            preFaderInput={preAmpOutput}
            postFaderInput={faderOutput}
          />
        ))
      }
      <Divider />

      <MuteButton value={state.isMuted} onChange={handleChange.isMuted} size={size} />

      <Fader value={state.faderLevel} onChange={handleChange.faderLevel} size={size} />

      <Divider />

      <GroupOutAssignment
        groups={groups}
        value={state.groupOuts}
        onChange={handleChange.groupOuts}
        size={size}
      />

      <Divider />

      <Typography sx={styles.name}>{name}</Typography>
    </Card>
  );
};

export default React.memo(ChannelStrip);