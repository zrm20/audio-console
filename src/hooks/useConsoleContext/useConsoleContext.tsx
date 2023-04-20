import { createContext, Dispatch, useContext } from "react";
import { ChannelAction } from "../useChannelState/channelReducer.types";
import useConsoleState, { ConsoleStateHook, HandleConsoleChange } from "../useConsoleState/useConsoleState";

const StateContext = createContext<ConsoleState | null>(null);
const DispatchContext = createContext<HandleConsoleChange | null>(null);

interface Props {
  children: JSX.Element | JSX.Element[];
  config: ConsoleStateConfig;
}

export function ConsoleProvider(props: Props) {
  const [state, handleChange] = useConsoleState(props.config);

  return (
    <DispatchContext.Provider value={handleChange}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
};

export function useConsoleDispatch() {
  const dispatch = useContext(DispatchContext);

  return dispatch;
};

export function useConsoleContext() {
  const state = useContext(StateContext);

  return state;
};