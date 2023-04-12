import React, { useReducer } from 'react';
import { Card, Typography } from '@mui/material';
import { Divider } from 'primereact/divider';

import GainKnob from '../GainKnob/GainKnob';
import useStyles from './ChannelStrip.styles';
import PadSwitch from '../PadSwitch/PadSwitch';
import BusSend from '../BusSend/BusSend';
import Fader from '../Fader/Fader';
import Meter from '../Meter/Meter';
import MuteButton from '../MuteButton/MuteButton';
import { ChannelState } from './channelReducer.types';
import { BUS_MIN_GAIN, DEFAULT_PAD_LEVEL, PRE_AMP_MIN_GAIN } from '../../../constants/busLevels';
import channelReducer from './channelReducer';
import { KnobChangeEvent } from 'primereact/knob';
import { ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { SliderChangeEvent } from 'primereact/slider';
import { MIN_DBFS_VALUE } from '../../../constants/audioLevels';
import { constrainValue } from '../../../utils';
import GroupOutAssignment from '../GroupOutAssignment/GroupOutAssignment';
// import { getBusOutput } from '../../../utils';

interface ChannelStripProps {
  name: string;
  inputValue: number;
  auxes: ConsoleBus[];
  groups: ConsoleBus[];
  size?: number;
};

function createDefaultAux(auxBus: ConsoleBus): AuxSend {
  return {
    ...auxBus,
    isMuted: false,
    isPreFader: true,
    sendLevel: BUS_MIN_GAIN
  }
};

export default function ChannelStrip(props: ChannelStripProps): JSX.Element {
  const { name, inputValue, size = 75, auxes, groups } = props;
  const styles = useStyles(size);
  const initialState: ChannelState = {
    isPadded: false,
    preAmpGain: PRE_AMP_MIN_GAIN,
    isMuted: false,
    faderLevel: 0,
    auxSends: auxes.map(auxBus => createDefaultAux(auxBus)),
    groupOuts: []
  };
  const [state, dispatch] = useReducer(channelReducer, initialState);

  // Level pick points
  const padOutput = inputValue + (state.isPadded ? DEFAULT_PAD_LEVEL : 0);
  const preAmpOutput = padOutput + state.preAmpGain;
  const faderOutput = state.isMuted ? MIN_DBFS_VALUE : preAmpOutput + state.faderLevel;
  // const busOutputs: ChannelGroupOutput;

  const auxOutputs: ChannelAuxOutput[] = state.auxSends.map(aux => {
    const auxOut: ChannelAuxOutput = { id: aux.id, value: MIN_DBFS_VALUE };

    if(state.isMuted || aux.isMuted || aux.sendLevel === MIN_DBFS_VALUE) {
      return auxOut;
    }

    if(aux.isPreFader) {
      auxOut.value = preAmpOutput + aux.sendLevel;
    } else {
      auxOut.value = faderOutput + aux.sendLevel;
    };

    auxOut.value = constrainValue(auxOut.value, MIN_DBFS_VALUE, 0);

    return auxOut;
  });


  // onChange functions
  function handleGainKnobChange(evt: KnobChangeEvent): void {
    dispatch({ type: "SET_PRE_AMP_GAIN", payload: evt.value })
  };

  function handlePadChange(evt: ToggleButtonChangeEvent): void {
    dispatch({ type: "SET_IS_PADDED", payload: evt.value })
  };

  function handleChangeMute(evt: ToggleButtonChangeEvent): void {
    dispatch({ type: "SET_IS_MUTED", payload: evt.value })
  };

  function handleChangeFader(evt: SliderChangeEvent): void {
    dispatch({ type: "SET_FADER", payload: evt.value as number })
  };

  function handleAuxChange(newAuxValues: AuxSend): void {
    dispatch({ type: "SET_AUX", payload: newAuxValues })
  };

  function handleBusAssignChange(groupId: string): void {
    dispatch({ type: "TOGGLE_GROUP_ASSIGNMENT", payload: groupId })
  };
 
  return (
    <Card variant='outlined' sx={styles.root}>
      <Meter signalLevel={preAmpOutput} size={size}/>

      <Divider />

      <GainKnob value={state.preAmpGain} onChange={handleGainKnobChange} size={size}/>
      <PadSwitch value={state.isPadded} onChange={handlePadChange} size={size} />

      <Divider />
      {
        state.auxSends.map(aux => (
          <BusSend
            key={aux.id}
            id={aux.id}
            name={aux.name}
            value={aux.sendLevel}
            onChange={handleAuxChange}
            isPreFader={aux.isPreFader}
            size={size}
          />
        ))
      }
      <Divider />

      <MuteButton value={state.isMuted} onChange={handleChangeMute} size={size} />

      <Fader value={state.faderLevel} onChange={handleChangeFader} size={size} />

      <Divider />

      <GroupOutAssignment
        groups={groups}
        value={state.groupOuts}
        onChange={handleBusAssignChange}
        size={size}
      />

      <Divider />

      <Typography sx={styles.name}>{name}</Typography>
    </Card>
  );
};