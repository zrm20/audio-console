import { useMemo, useReducer } from "react";
import consoleReducer from "./consoleReducer";

export type HandleSourcesChange = {
  channelBusOutput(channelBusOutput: ChannelBusOut): void;
};

export type ConsoleStateHook = [
  state: ConsoleState,
  handleChange: HandleSourcesChange
];

export interface HandleConsoleChange {
  channelBusOutput(channelBusOutput: ChannelBusOut): void;
}

export default function useConsoleState(config: ConsoleStateConfig): ConsoleStateHook {
  const initialState: ConsoleState = {
    busses: {
    }
  };
  config.auxes.forEach(aux => initialState.busses[aux.id] = { name: aux.name, sources: {} });
  config.groups.forEach(grp => initialState.busses[grp.id] = { name: grp.name, sources: {} });

  const [state, dispatch] = useReducer(consoleReducer, initialState);

  const handleChange: HandleConsoleChange = useMemo(() => (
    {
      channelBusOutput(channelBusOutput: ChannelBusOut) {
        dispatch({ type: "UPDATE_CHANNEL_BUS_OUT", payload: channelBusOutput })
      }
    }
  ), []);

  return [state, handleChange];
};

