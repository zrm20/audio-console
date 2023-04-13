import { KnobChangeEvent } from "primereact/knob";
import { SliderChangeEvent } from "primereact/slider";
import { ToggleButtonChangeEvent } from "primereact/togglebutton";
import { useMemo, useReducer } from "react";
import { PRE_AMP_MIN_GAIN } from "../../constants/busLevels";
import channelReducer from "./channelReducer";
import { ChannelState } from "./channelReducer.types";

export const defaultState: ChannelState = {
  preAmpGain: PRE_AMP_MIN_GAIN,
  isPadded: false,
  isMuted: false,
  faderLevel: 0,
  groupOuts: []
}

export default function useChannelState(initialState: ChannelState = defaultState) {
  const [state, dispatch] = useReducer(channelReducer, initialState);

  const handleChange = useMemo(() => (
    {
      preAmpGain(evt: KnobChangeEvent) {
        dispatch({ type: 'SET_PRE_AMP_GAIN', payload: evt.value })
      },
      isPadded(evt: ToggleButtonChangeEvent) {
        dispatch({ type: 'SET_IS_PADDED', payload: evt.value })
      },
      isMuted(evt: ToggleButtonChangeEvent) {
        dispatch({ type: 'SET_IS_MUTED', payload: evt.value })
      },
      faderLevel(evt: SliderChangeEvent): void {
        let newValue: number;
        if (typeof evt.value === 'number') {
          newValue = evt.value
        } else {
          newValue = evt.value[0]
        }
        dispatch({ type: "SET_FADER", payload: newValue })
      },
      groupOuts(groupId: string): void {
        dispatch({ type: "TOGGLE_GROUP_ASSIGNMENT", payload: groupId })
      }
    }
  ), [dispatch]);

  return { state, handleChange };
};


