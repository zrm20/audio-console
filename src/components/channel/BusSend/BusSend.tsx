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
  value: number;
  onChange(evt: KnobChangeEvent): void;
  name: string;
  isPreFader: boolean;
  onIsPreFaderChange(evt: ToggleButtonChangeEvent): void;
  size?: number;
};

export default function BusSend(props: BusSendProps): JSX.Element {
  const { value, onChange, name, isPreFader, onIsPreFaderChange, size = 100 } = props;
  const styles = useStyles();
  const id = `bus-${name}`;
  const sizeMultiplier = size / 100;

  // for correct display, all slider values should be positive
  // min should be 0
  // max should be 0 + delta(MAX - MIN)
  // example: -96 to +12 should shift to 0 to 108
  const valueShift = 0 - BUS_MIN_GAIN;

  function handleChange(evt: KnobChangeEvent): void {
    // value received from evt will be shifted based on valueShift
    // ex: a gain of +12 might be stored on evt as +108 if valueShift is +96
    // needs to shift back to receive the actual gain change;
    const actualGainChange = evt.value - valueShift;

    // create a new evt representing the knob change event to call with props.onChange
    const newEvt: KnobChangeEvent = { ...evt, value: actualGainChange };
    onChange(newEvt);
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
    <Box sx={styles.root} data-testid="contain">
      <Knob
        value={constrainedValue}
        onChange={handleChange}
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
        onChange={onIsPreFaderChange}
        onLabel="Pre"
        offLabel="Pre"
      />
    </Box>
  );
};