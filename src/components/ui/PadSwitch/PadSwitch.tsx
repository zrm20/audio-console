import React from 'react';
import { Box } from '@mui/material';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

import useStyles from './PadSwitch.styles';
import { PRE_AMP_PAD_LEVEL } from '../../../constants/gainValues';

interface PadSwitchProps {
  value: boolean;
  onChange(evt: ToggleButtonChangeEvent): void;
};

export default function PadSwitch(props: PadSwitchProps): JSX.Element {
  const { value, onChange } = props;
  const styles = useStyles();

  return (
    <Box sx={styles.root}>
      <ToggleButton
        checked={value}
        onChange={onChange}
        onLabel={`${PRE_AMP_PAD_LEVEL}dB`}
        offLabel={`${PRE_AMP_PAD_LEVEL}dB`}
      />
    </Box>
  );
};