export interface ChannelState {
  isPadded: boolean;
  preAmpGain: number;
  auxSends: AuxSend[];
  faderLevel: number;
  isMuted: boolean;
}

export type ChannelAction = 
| { type: 'SET_PRE_AMP_GAIN', payload: number }
| { type: 'SET_IS_PADDED', payload: boolean }
| { type: 'SET_IS_MUTED', payload: boolean }
| { type: 'SET_FADER', payload: number }
| { type: 'SET_AUX_SENDS', payload: AuxSend[] }
| { type: 'SET_AUX', payload: AuxSend }