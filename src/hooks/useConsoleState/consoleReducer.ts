import { Reducer } from "react";
import { MIN_DBFS_VALUE } from "../../constants/audioLevels";

export type ConsoleStateAction =
  | { type: "UPDATE_CHANNEL_BUS_OUT", payload: ChannelBusOut }

const consoleReducer: Reducer<ConsoleState, ConsoleStateAction> = (state, action) => {
  switch (action.type) {
    case "UPDATE_CHANNEL_BUS_OUT": {
      // create a new bus out object
      const newBusOutput: ChannelBusOut = action.payload;

      // create a copy of sources array
      const newSources: ChannelBusOut[] = [...state.sources];

      const indexToUpdate = newSources.findIndex(src => src.sourceId === newBusOutput.sourceId && src.destinationId === newBusOutput.destinationId);

      // if there is no matching bus output already, add it to the array and return
      if (indexToUpdate === -1) {
        newSources.push(newBusOutput);
        return { ...state, sources: newSources };
      }

      // if the new value is under DBFS_MIN remove it
      if(newBusOutput.value <= MIN_DBFS_VALUE) {
        const filteredSources = newSources.filter((src, i) => i !== indexToUpdate);
        return { ...state, sources: filteredSources }
      };

      // if there is existing bus output, update it
      newSources[indexToUpdate] = newBusOutput;

      return { ...state, sources: newSources };
    }
    default: return state
  };
};


export default consoleReducer;