import { PRE_AMP_MIN_GAIN } from "../../../constants/busLevels";
import channelReducer from "./channelReducer";
import { ChannelAction, ChannelState } from "./channelReducer.types";

describe('channelReducer(state, action)', () => {
  const initialState: ChannelState = {
    isMuted: false,
    isPadded: false,
    preAmpGain: PRE_AMP_MIN_GAIN,
    auxSends: [],
    faderLevel: 0,
  };

  let state: ChannelState | undefined;

  beforeEach(() => {
    state = initialState;
  });

  it('should return new muted value for action: SET_IS_MUTED', () => {
    // Arrange
    const newMutedValue = !initialState.isMuted
    const action: ChannelAction = {
      type: "SET_IS_MUTED",
      payload: newMutedValue
    };

    // Act
    const result = channelReducer(state!, action);

    // Assert
    expect(result).toEqual({ ...state, isMuted: newMutedValue })
  });

  it('should return new padded value for action: SET_IS_PADDED', () => {
    // Arrange
    const newPaddedValue = !initialState.isPadded
    const action: ChannelAction = {
      type: "SET_IS_PADDED",
      payload: newPaddedValue
    };

    // Act
    const result = channelReducer(state!, action);

    // Assert
    expect(result).toEqual({ ...state, isPadded: newPaddedValue })
  });

  it('should return new preAmpGain value for action: SET_PRE_AMP_GAIN', () => {
    // Arrange
    const newGainValue = initialState.preAmpGain + 1
    const action: ChannelAction = {
      type: "SET_PRE_AMP_GAIN",
      payload: newGainValue
    };

    // Act
    const result = channelReducer(state!, action);

    // Assert
    expect(result).toEqual({ ...state, preAmpGain: newGainValue })
  });

  it('should return new faderLevel value for action: SET_FADER', () => {
    // Arrange
    const newFaderLevel = initialState.faderLevel + 1;
    const action: ChannelAction = {
      type: "SET_FADER",
      payload: newFaderLevel
    };

    // Act
    const result = channelReducer(state!, action);

    // Assert
    expect(result).toEqual({ ...state, faderLevel: newFaderLevel });
  });

  it('should return new auxSends value for action: SET_AUX_SENDS', () => {
    // Arrange
    const newAuxLevels: AuxSend[] = [
      { id: '1', name: "Aux 1", isPreFader: true, sendLevel: -10, isMuted: false }
    ];
    const action: ChannelAction = {
      type: "SET_AUX_SENDS",
      payload: newAuxLevels
    };

    // Act
    const result = channelReducer(state!, action);

    // Assert
    expect(result).toEqual({ ...state, auxSends: newAuxLevels });
  });
  
  it('should return replaced individual aux send for action SET_AUX_SEND', () => {
    // Arrange
    const aux1: AuxSend = { 
      id: 'aux1', 
      name: "Aux 1", 
      isPreFader: true, 
      sendLevel: -10, 
      isMuted: false 
    };

    state!.auxSends = [aux1];

    const newAux1: AuxSend = {
      ...aux1,
      isPreFader: !aux1.isPreFader,
      isMuted: !aux1.isMuted,
      sendLevel: aux1.sendLevel + 1
    };

    const action: ChannelAction = {
      type: "SET_AUX",
      payload: newAux1
    };

    // Act
    const result = channelReducer(state!, action);

    // Assert
    expect(result.auxSends).toEqual([newAux1]);
  });
  
  it('should return prevState if Aux id is not found for action SET_AUX_SEND', () => {
    // Arrange
    const aux1: AuxSend = { 
      id: 'aux1', 
      name: "Aux 1", 
      isPreFader: true, 
      sendLevel: -10, 
      isMuted: false 
    };

    state!.auxSends = [aux1];

    const newAux1: AuxSend = {
      ...aux1,
      id: 'wrong_id',
      isPreFader: !aux1.isPreFader,
      isMuted: !aux1.isMuted,
      sendLevel: aux1.sendLevel + 1
    };

    const action: ChannelAction = {
      type: "SET_AUX",
      payload: newAux1
    };

    // Act
    const result = channelReducer(state!, action);

    // Assert
    expect(result).toEqual(state);
  });

  it('should throw error if unhandled action type is passed', () => {
    // Arrange
    const action = { type: 'unknown' };

    // Act
    const resultFn = () => channelReducer(state!, action as ChannelAction);

    // Assert
    expect(resultFn).toThrow();
  });
});