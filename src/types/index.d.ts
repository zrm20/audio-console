interface ConsoleBusInitializer {
  id: string;
  name: string;
}

interface ConsoleBus extends ConsoleBusInitializer {
  sources: number[];
}

interface AuxSend extends ConsoleBusInitializer {
  isPreFader: boolean;
  isMuted: boolean;
  sendLevel: number;
}

interface ChannelAuxOutput { // TODO Delete this
  id: string
  value: number
}

interface ChannelGroupOutput { // TODO Delete this
  id: string,
  value: number
}

interface ChannelBusOut {
  sourceId: string;
  destinationId: string;
  value: number
}