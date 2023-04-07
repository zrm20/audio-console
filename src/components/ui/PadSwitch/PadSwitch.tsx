import React from 'react';
import { Box } from '@mui/material';

import useStyles from './PadSwitch.styles';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { PRE_AMP_PAD_LEVEL } from '../../../constants/gainValues';

interface PadSwitchProps {
  value: boolean;
  onChange(evt: CheckboxChangeEvent): void;
};

export default function PadSwitch(props: PadSwitchProps): JSX.Element {
  const { value, onChange } = props;
  const styles = useStyles();

  return (
    <Box sx={styles.root}>
      <Checkbox checked={value} onChange={onChange} />
      <label>{PRE_AMP_PAD_LEVEL} Pad</label>
    </Box>
  );
};