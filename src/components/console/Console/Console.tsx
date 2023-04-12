import React from 'react';
import { Card, Box } from '@mui/material';

import useStyles from './Console.styles';
import ChannelStrip from '../../channel/ChannelStrip/ChannelStrip';
import { MIN_DBFS_VALUE } from '../../../constants/audioLevels';
import logo from '../../../assets/signalflo_logo.png';

interface ConsoleProps {
  channels: string[],
  auxes: ConsoleBus[],
  groups: ConsoleBus[],
  size?: number
};

export default function Console(props: ConsoleProps): JSX.Element {
  const { channels, auxes, groups, size = 50 } = props;
  const styles = useStyles();

  return (
    <Card sx={styles.root} elevation={5}>
      <Box sx={styles.channelContainer}>
        {
          channels.map(ch => (
            <ChannelStrip
              key={ch}
              name={ch}
              inputValue={Math.floor(Math.random() * (MIN_DBFS_VALUE + 10))}
              auxes={auxes}
              groups={groups}
              size={size}
            />
          ))
        }
      </Box>
      <Box sx={styles.masterSection}>
        <img src={logo} />
        <Box sx={styles.masterChannels}>
          <Box sx={styles.auxMasterContainer}>
            Aux Outputs
          </Box>
          <Box sx={styles.groupMasterContainer}>
            Group Outputs
          </Box>
        </Box>
      </Box>
    </Card>
  );
};