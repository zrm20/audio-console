// used to determine initial available buses
interface ConsoleBusInitializer {
  id: string;
  name: string;
}

// the value to be sent from a channel to a bus
interface ChannelBusOut {
  sourceId: string;
  destinationId: string;
  value: number
}

interface ConsoleBusSources {
  [sourceId: string]: number;
}

interface ConsoleBus {
  name: string;
  sources: ConsoleBusSources
}

interface ConsoleStateConfig {
  auxes: ConsoleBusInitializer[];
  groups: ConsoleBusInitializer[];
  channels: ConsoleBusInitializer[];
  sources?: ChannelBusOut[];
}

interface ConsoleState {
  busses: {
    [index: string]: {
      name: string;
      sources: {
        [index: string]: number;
      }
    }
  }
}

