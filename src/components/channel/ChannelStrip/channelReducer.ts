import { Reducer } from "react"
import { ChannelAction, ChannelState } from "./channelReducer.types"

const channelReducer: Reducer<ChannelState, ChannelAction> = (state, action) => {
  switch(action.type) {
    case 'SET_IS_MUTED': {
      return { ...state, isMuted: action.payload }
    }
    case 'SET_IS_PADDED': {
      return { ...state, isPadded: action.payload }
    }
    case 'SET_PRE_AMP_GAIN': {
      return { ...state, preAmpGain: action.payload }
    }
    case 'SET_FADER': {
      return { ...state, faderLevel: action.payload }
    }
    case 'SET_AUX_SENDS': {
      return { ...state, auxSends: action.payload }
    }
    case 'SET_AUX': {
      // find element in array to update
      const indexToUpdate = state.auxSends.findIndex(el => el.id === action.payload.id);

      // if no element found with matching id, return old state
      if(indexToUpdate === -1) {
        return state;
      };

      // make a copy of Aux array
      const auxesCopy: AuxSend[] = [...state.auxSends];
      // update the individual aux with matching id
      auxesCopy[indexToUpdate] = action.payload;

      // return new state with updated array
      return { ...state, auxSends: auxesCopy };
    }
    case 'TOGGLE_GROUP_ASSIGNMENT': {
      const groupId = action.payload;

      if(state.groupOuts.includes(groupId)) {
        // remove from array
        const filteredArray = state.groupOuts.filter(el => el !== groupId);
        return { ...state, groupOuts: filteredArray };
      };

      // add to array
      const newArray = [...state.groupOuts, groupId];
      return { ...state, groupOuts: newArray };
    };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  };
};

export default channelReducer;