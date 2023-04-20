import React from 'react';
import './App.css';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import Console from './components/console/Console/Console';
import ChannelStrip from './components/channel/ChannelStrip/ChannelStrip';
import { ConsoleProvider } from './hooks/useConsoleContext/useConsoleContext';

const SIZE = 50;

function App() {
  const consoleConfig: ConsoleStateConfig = {
    auxes: [
      { id: 'aux1', name: 'Aux 1' },
      { id: 'aux2', name: 'Aux 2' },
    ],
    groups: [
      { id: 'main', name: "Main" },
      { id: 'mono', name: "Mono" },
    ],
    channels: [
      { id: 'ch1', name: "Chan 1" },
      { id: 'ch2', name: "Chan 2" },
      { id: 'ch3', name: "Chan 3" },
      { id: 'ch4', name: "Chan 4" },
    ]
  };

  return (
    <div className="App" style={{ display: 'flex' }}>
      <ConsoleProvider config={consoleConfig} >
        <Console 
          channels={consoleConfig.channels}
          auxes={consoleConfig.auxes}
          groups={consoleConfig.groups}
          size={SIZE}
        />
      </ConsoleProvider>
    </div>
  );
}

export default App;
