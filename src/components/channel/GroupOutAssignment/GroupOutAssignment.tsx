import React from 'react';
import { Box } from '@mui/material';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

import useStyles from './GroupOutAssignment.styles';

interface GroupOutAssignmentProps {
  groups: ConsoleBus[];
  value: string[];
  onChange(groupId: string): void,
  size?: number;
};

export default function GroupOutAssignment(props: GroupOutAssignmentProps): JSX.Element {
  const { groups, value, onChange, size = 100 } = props;
  const styles = useStyles(size);

  return (
    <Box sx={styles.root}>
      <p>Bus Outs</p>
      <Box sx={styles.container}>
        {
          groups.map(grp => (
            <ToggleButton
              key={grp.id}
              checked={value.includes(grp.id)}
              onLabel={grp.name}
              offLabel={grp.name}
              onChange={(evt: ToggleButtonChangeEvent) => onChange(grp.id)}
            />
          ))
        }
      </Box>
    </Box>
  );
};