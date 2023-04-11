interface ConsoleBus {
  id: string;
  name: string;
}

interface AuxSend extends ConsoleBus {
  isPreFader: boolean;
  isMuted: boolean;
  sendLevel: number;
}