import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { Knob, KnobChangeEvent } from 'primereact/knob';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

import { COMPONENT_SIZE } from '../../../constants/primeReactSizes';
import useStyles from './BusSend.styles';
import { BUS_MAX_GAIN, BUS_MIN_GAIN } from '../../../constants/busLevels';
import { useConsoleDispatch} from '../../../hooks/useConsoleContext/useConsoleContext';

interface BusSendProps {
  id: string;
  name: string;
  preFaderInput: number; // in dBfs
  postFaderInput: number; // in dBfs
  size?: number;
  initialSendLevel?: number; // in dBfs
  initialPreFader?: boolean;
};

function BusSend(props: BusSendProps): JSX.Element {
  const { name, size = 100, id, preFaderInput, postFaderInput } = props;
  const styles = useStyles(size);
  const sizeMultiplier = size / 100;

  // shift the bus gain values into positive range
  const valueOffset = 0 - BUS_MIN_GAIN;

  // state
  const initialSendLevel = props.initialSendLevel ? props.initialSendLevel + valueOffset : 0;
  const [sendLevel, setSendLevel] = useState<number>(0); // will be 0 - MAX
  const [isPreFader, setIsPreFader] = useState<boolean>(props.initialPreFader || false);
  const handleChange = useConsoleDispatch();


  // get actual gain value from shifting back down to negative range
  const gainValue = sendLevel - valueOffset;
  const output: ChannelBusOut = useMemo(() => {
    const outputLevel = isPreFader ? preFaderInput + gainValue : postFaderInput + gainValue;
    return { 
      sourceId: "ch",
      destinationId: id,
      value: outputLevel
    }
  }, [sendLevel, isPreFader]);

  // change functions
  const handleChangePre = useCallback((evt: ToggleButtonChangeEvent) => {
    setIsPreFader(evt.value)
  }, []);
  const handleChangeSend = useCallback((evt: KnobChangeEvent) => {
    setSendLevel(evt.value);
  }, []);

  useEffect(() => {
    handleChange?.channelBusOutput(output);
  }, [sendLevel]);

  return (
    <Box sx={styles.root}>
      <Knob
        value={sendLevel}
        onChange={handleChangeSend}
        role="slider"
        min={0}
        max={BUS_MAX_GAIN + valueOffset}
        step={1}
        size={COMPONENT_SIZE * sizeMultiplier}
        id={id}
        valueTemplate={`${gainValue > 0 ? "+" : ""}${gainValue}dB`}
      />
      <label htmlFor={id}>{name}</label>

      <ToggleButton
        checked={isPreFader}
        onChange={handleChangePre}
        onLabel="Pre"
        offLabel="Pre"
      />
    </Box>
  );
};

export default React.memo(BusSend);