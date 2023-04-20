import React, { useState } from 'react';
import { Card, Box } from '@mui/material';

import useStyles from './Console.styles';
import ChannelStrip from '../../channel/ChannelStrip/ChannelStrip';
import { MIN_DBFS_VALUE } from '../../../constants/audioLevels';
import logo from '../../../assets/signalflo_logo.png';
import BusMaster from '../../channel/BusMaster/BusMaster';
import { useConsoleDispatch} from '../../../hooks/useConsoleContext/useConsoleContext';

interface ConsoleProps {
  size?: number
  auxes: ConsoleBusInitializer[],
  groups: ConsoleBusInitializer[],
  channels: ConsoleBusInitializer[],
};

export default function Console(props: ConsoleProps): JSX.Element {
  const { size = 50 } = props;
  const styles = useStyles();
  const handleChange = useConsoleDispatch();

  return (
    <Card sx={styles.root} elevation={5}>
      <Box sx={styles.channelContainer}>
        {
          props.channels.map(ch => (
            <ChannelStrip
              id={ch.id}
              key={ch.id}
              name={ch.name}
              inputValue={Math.floor(Math.random() * (MIN_DBFS_VALUE + 10))}
              size={size}
              groups={props.groups}
              auxes={props.auxes}
            />
          ))
        }
      </Box>
      <Box sx={styles.masterSection}>
        <img src={logo} alt="SignalFlo Console" />

        <Box sx={styles.globalSection}>
          Global Section
        </Box>

        <Box sx={styles.masterChannels}>
          <Box sx={styles.auxMasterContainer}>
            {
              props.auxes.map(aux => (
                <BusMaster
                  size={size}
                  key={aux.id}
                  sources={
                    [
           
                    ]
                  }
                  name={aux.name}
                />
              ))
            }
          </Box>
          <Box sx={styles.groupMasterContainer}>
            {
              props.groups.map(grp => (
                <BusMaster
                  size={size}
                  key={grp.id}
                  sources={
                    [
      
                    ]
                  }
                  name={grp.name}
                />
              ))
            }
          </Box>
        </Box>
      </Box>
    </Card>
  );
};