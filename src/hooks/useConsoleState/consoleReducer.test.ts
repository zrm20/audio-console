import { MIN_DBFS_VALUE } from "../../constants/audioLevels";
import consoleReducer, { ConsoleStateAction } from "./consoleReducer";

describe("consoleReducer()", () => {
  let initialState: ConsoleState = {
    auxes: [
      { id: 'aux1', name: 'Aux 1' },
      { id: 'aux2', name: 'Aux 2' },
    ],
    groups: [
      { id: 'group1', name: 'Group 1' },
      { id: 'group2', name: 'Group 2' },
    ],
    channels: [
      { id: 'chan1', name: 'Chan 1'},
      { id: 'chan2', name: 'Chan 2'},
    ],
    sources: [],
  };
  let state: ConsoleState;
  
  describe("UPDATE_CHANNEL_BUS_OUT", () => {
    beforeEach(() => {
      state = initialState;
    });
    
    it("should add to sources array if channel bus output doesn't exist", () => {
      // Arrange
      const newBusOutValue: ChannelBusOut = {
        sourceId: 'chan1',
        destinationId: 'aux1',
        value: -12
      };
  
      const action: ConsoleStateAction = {
        type: 'UPDATE_CHANNEL_BUS_OUT',
        payload: newBusOutValue
      };
  
      // Act
      const result = consoleReducer(state, action);
  
      // Assert
      expect(result.sources).toHaveLength(1);
      expect(result.sources).toContain(newBusOutValue);
    });
  
    it("should update a sources value if sourceId and destinationId already exist", () => {
      // Arrange
      const originalSource: ChannelBusOut = { sourceId: "chan1", destinationId: "aux1", value: -24 };
      const newSource: ChannelBusOut = { ...originalSource, value: originalSource.value + 1 };
      state.sources = [originalSource];
  
      const action: ConsoleStateAction = { type: "UPDATE_CHANNEL_BUS_OUT", payload: newSource };
  
      // Act
      const result = consoleReducer(state, action);
  
      // Assert
      expect(result.sources).not.toContain(originalSource);
      expect(result.sources).toContain(newSource);
    });
  
    it("should remove a source if new value is DBFS_MIN or less", () => {
      // Arrange
      const sourceId = "chan1";
      const destinationId = "aux1"; 
      state.sources = [{ sourceId, destinationId, value: 0 }];
      const newSource = { sourceId, destinationId, value: MIN_DBFS_VALUE }
      const action: ConsoleStateAction = { type: "UPDATE_CHANNEL_BUS_OUT", payload: newSource };
  
      // Act
      const result = consoleReducer(state, action);
      const foundSource = result.sources.find(src => src.sourceId === sourceId && src.destinationId === destinationId)
  
      // Assert
      expect(foundSource).toBeUndefined();
    });
  });
});