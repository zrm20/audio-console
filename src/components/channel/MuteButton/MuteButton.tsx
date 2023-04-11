import { Box } from '@mui/material';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import React from 'react';

import useStyles from './MuteButton.styles';

interface MuteButtonProps {
  size?: number;
  value: boolean;
  onChange(evt: ToggleButtonChangeEvent): void;
};

export default function MuteButton(props: MuteButtonProps): JSX.Element {
  const { size = 100, value, onChange } = props;
  const styles = useStyles(size);

  return (
    <Box sx={styles.root}>
      <ToggleButton
        checked={value}
        onChange={onChange}
        onLabel="Mute"
        offLabel="Mute"
        style={
          { 
            background: value ? "red" : undefined,
            borderColor: value ? "red" : undefined
          }
        }
      />
    </Box>
  );
};