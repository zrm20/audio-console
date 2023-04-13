import React from 'react';
import { Box } from '@mui/material';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

import useStyles from './PadSwitch.styles';
import { DEFAULT_PAD_LEVEL } from '../../../constants/busLevels';

interface PadSwitchProps {
  value: boolean;
  onChange(evt: ToggleButtonChangeEvent): void;
  padLevel?: number;
  size?: number;
};

function PadSwitch(props: PadSwitchProps): JSX.Element {
  const { value, onChange, padLevel = DEFAULT_PAD_LEVEL, size = 100 } = props;
  const styles = useStyles(size);

  return (
    <Box sx={styles.root}>
      <ToggleButton
        checked={value}
        onChange={onChange}
        onLabel={`${padLevel}dB`}
        offLabel={`${padLevel}dB`}
      />
    </Box>
  );
};

export default React.memo(PadSwitch);