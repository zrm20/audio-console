interface ConsoleBus {
  id: string;
  name: string;
}

interface AuxSend extends ConsoleBus {
  isPreFader: boolean;
  isMuted: boolean;
  sendLevel: number;
}

interface ChannelAuxOutput {
  id: string
  value: number
}

interface ChannelGroupOutput {
  id: string,
  value: number
}