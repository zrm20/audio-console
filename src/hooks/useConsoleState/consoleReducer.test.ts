import { MIN_DBFS_VALUE } from "../../constants/audioLevels";
import consoleReducer, { ConsoleStateAction } from "./consoleReducer";

describe("consoleReducer()", () => {
  let initialState: ConsoleState = {
    busses:  {
      aux1: {
        name: "Aux 1",
        sources: { }
      },
      aux2: {
        name: "Aux 2",
        sources: { }
      },
      main: {
        name: "Main",
        sources: {}
      },
      mono: {
        name: "Mono",
        sources: {}
      }
    },
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
      expect(
        result
          .busses[newBusOutValue.destinationId]
          .sources[newBusOutValue.sourceId]
      ).toBe(newBusOutValue.value);
    });
  
    it("should update a sources value if sourceId and destinationId already exist", () => {
      // Arrange
      const newValue: ChannelBusOut = { sourceId: 'ch1', destinationId: 'aux1', value: -12 }

      // set state to a value different from the new value
      state.busses[newValue.destinationId].sources[newValue.sourceId] = newValue.value - 1;
     
      const action: ConsoleStateAction = { type: "UPDATE_CHANNEL_BUS_OUT", payload: newValue };
  
      // Act
      const result = consoleReducer(state, action);
  
      // Assert
      expect(
        result.busses[newValue.destinationId]
          .sources[newValue.sourceId]
      ).toBe(newValue.value);
    });
  
    it("should remove a source if new value is DBFS_MIN or less", () => {
      // Arrange
      const sourceId = "chan1";
      const destinationId = "aux1"; 
      state.busses[destinationId].sources[sourceId] = 0;

      const newSource = { sourceId, destinationId, value: MIN_DBFS_VALUE }
      const action: ConsoleStateAction = { type: "UPDATE_CHANNEL_BUS_OUT", payload: newSource };
  
      // Act
      const result = consoleReducer(state, action);
  
      // Assert
      expect(result.busses[destinationId].sources).not.toHaveProperty(sourceId);
    });
  });
});