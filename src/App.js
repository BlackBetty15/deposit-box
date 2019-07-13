import React, {Component} from 'react';
import Keyboard from './components/Keyboard';
import Display from './components/Display';

class App extends Component {
  state = {
    serial: '4815162342'
  };
  render() {
    return (
      <div className="content">
            <Display/>
        <div className="keyboard">
            <Keyboard />
        </div>
        <p className="align--right text--small">S/N:{this.state.serial}</p>
      </div>
    );
  }
}

export default App;
