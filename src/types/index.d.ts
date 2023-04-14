// used to determine initial available buses
interface ConsoleBusInitializer {
  id: string;
  name: string;
}

// the actual bus data with sources added
interface ConsoleBus extends ConsoleBusInitializer {}

// the value to be sent from a channel to a bus
interface ChannelBusOut {
  sourceId: string;
  destinationId: string;
  value: number
}

interface ConsoleStateConfig {
  auxes: ConsoleBusInitializer[];
  groups: ConsoleBusInitializer[];
  sources?: ChannelBusOut[];
}

interface ConsoleState {
  auxes: ConsoleBus[],
  groups: ConsoleBus[],
  sources: ChannelBusOut[];
}