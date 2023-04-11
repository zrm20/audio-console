import React from 'react';
import { Box } from '@mui/material';
import { Knob, KnobChangeEvent } from 'primereact/knob';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

import { COMPONENT_SIZE } from '../../../constants/primeReactSizes';
import { constrainValue } from '../../../utils';
import useStyles from './BusSend.styles';
import { BUS_MAX_GAIN, BUS_MIN_GAIN } from '../../../constants/busLevels';
import { MIN_DBFS_VALUE } from '../../../constants/audioLevels';

interface BusSendProps {
  id: string;
  value: number;
  onChange(newAuxValues: AuxSend): void;
  name: string;
  isPreFader: boolean;
  size?: number;
  isMuted?: boolean;
};

export default function BusSend(props: BusSendProps): JSX.Element {
  const { value, onChange, name, isPreFader, size = 100, id, isMuted = false } = props;
  const styles = useStyles(size);
  const sizeMultiplier = size / 100;

  // for correct display, all slider values should be positive
  // min should be 0
  // max should be 0 + delta(MAX - MIN)
  // example: -96 to +12 should shift to 0 to 108
  const valueShift = 0 - BUS_MIN_GAIN;

  function handleSendLevelChange(evt: KnobChangeEvent): void {
    // value received from evt will be shifted based on valueShift
    // ex: a gain of +12 might be stored on evt as +108 if valueShift is +96
    // needs to shift back to receive the actual gain change;
    const adjustedLevel = evt.value - valueShift;

    const newAuxValues: AuxSend = {
      id,
      name,
      sendLevel: adjustedLevel,
      isPreFader,
      isMuted
    };

    onChange(newAuxValues);
  };

  function handlePreFaderChange(evt: ToggleButtonChangeEvent): void {
    const newAuxValues: AuxSend = {
      id,
      name,
      sendLevel: value,
      isPreFader: evt.value,
      isMuted
    };

    onChange(newAuxValues);
  };

  const constrainedValue = constrainValue(value + valueShift, 0, BUS_MAX_GAIN + valueShift);

  function getLabel(): string {
    if(value > 0) {
      return `+${value}dB`;
    } else if(value <= MIN_DBFS_VALUE) {
      return '-∞'
    } else {
      return `${value}dB`
    };
  };

  return (
    <Box sx={styles.root}>
      <Knob
        value={constrainedValue}
        onChange={handleSendLevelChange}
        role="slider"
        min={0}
        max={BUS_MAX_GAIN + valueShift}
        step={1}
        size={COMPONENT_SIZE * sizeMultiplier}
        id={id}
        valueTemplate={getLabel()}
      />
      <label htmlFor={id}>{name}</label>

      <ToggleButton
        checked={isPreFader}
        onChange={handlePreFaderChange}
        onLabel="Pre"
        offLabel="Pre"
      />
    </Box>
  );
};