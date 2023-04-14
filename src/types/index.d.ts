// used to determine initial available buses
interface ConsoleBusInitializer {
  id: string;
  name: string;
}

// the actual bus data with sources added
interface ConsoleBus extends ConsoleBusInitializer {
  sources: ChannelBusOut[];
}

// the value to be sent from a channel to a bus
interface ChannelBusOut {
  sourceId: string;
  destinationId: string;
  value: number
}

interface ConsoleStateConfig {
  auxes: ConsoleBusInitializer[];
  groups: ConsoleBusInitializer[];
}

interface ConsoleState {
  auxes: ConsoleBus[],
  groups: ConsoleBus[],
  soloBus: ConsoleBus
}