import { Reducer } from "react";
import { MIN_DBFS_VALUE } from "../../constants/audioLevels";

export type ConsoleStateAction =
  | { type: "UPDATE_CHANNEL_BUS_OUT", payload: ChannelBusOut }

const consoleReducer: Reducer<ConsoleState, ConsoleStateAction> = (state, action) => {
  switch (action.type) {
    case "UPDATE_CHANNEL_BUS_OUT": {
      // make a copy of state to mutate
      const newState = { ...state };

      // construct new ChannelBusOutput
      const busOutput = action.payload;

      // check if new value is above minimum
      if(busOutput.value <= MIN_DBFS_VALUE) {
        // if value is below min, delete it from state
        delete newState
          .busses[busOutput.destinationId]
          .sources[busOutput.sourceId];
      } else {
        // set new value
        newState
          .busses[busOutput.destinationId]
          .sources[busOutput.sourceId] =  busOutput.value;
      }
      // return new state
      return newState;
    }
    default: return state
  };
};


export default consoleReducer;