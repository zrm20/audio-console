import { PRE_AMP_MIN_GAIN } from "../../constants/busLevels";
import channelReducer from "./channelReducer";
import { ChannelAction, ChannelState } from "./channelReducer.types";

describe('channelReducer(state, action)', () => {
  const initialState: ChannelState = {
    isMuted: false,
    isPadded: false,
    preAmpGain: PRE_AMP_MIN_GAIN,
    faderLevel: 0,
    groupOuts: []
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

  it('should add a groupId when action TOGGLE_GROUP_ASSIGNMENT is called and value is not in array', () => {
    // Arrange
    const groupToAdd = 'test';
    const action: ChannelAction = { type: 'TOGGLE_GROUP_ASSIGNMENT', payload: groupToAdd };

    // Act
    const result = channelReducer(state!, action);

    // Assert
    expect(result.groupOuts).toContain(groupToAdd);
  });

  it('should remove a groupId when action TOGGLE_GROUP_ASSIGNMENT is called and value is in array', () => {
    // Arrange
    const groupToRemove = 'test';
    const shouldNotRemove = 'dontremove';
    state!.groupOuts = [groupToRemove, shouldNotRemove];
    const action: ChannelAction = { type: 'TOGGLE_GROUP_ASSIGNMENT', payload: groupToRemove };

    // Act
    const result = channelReducer(state!, action);

    // Assert
    expect(result.groupOuts).not.toContain(groupToRemove);
    expect(result.groupOuts).toContain(shouldNotRemove);
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