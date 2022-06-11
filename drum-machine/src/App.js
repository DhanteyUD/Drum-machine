import React from 'react';
import bankOne from './drumMachineDB/bankOne';
import bankTwo from './drumMachineDB/bankTwo';
import PadBank from './components/padBank';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: 'Heater Kit',
      sliderVal: 0.3,
    };
    this.powerControl = this.powerControl.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.displayClipName = this.displayClipName.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160),
    });
  }

  selectBank() {
    if (this.state.power) {
      if (this.state.currentPadBankId === 'Heater Kit') {
        this.setState({
          currentPadBank: bankTwo,
          display: 'Smooth Piano Kit',
          currentPadBankId: 'Smooth Piano Kit',
        });
      } else {
        this.setState({
          currentPadBank: bankOne,
          display: 'Heater Kit',
          currentPadBankId: 'Heater Kit',
        });
      }
    }
  }

  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name,
      });
    }
  }

  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: 'Volume: ' + Math.round(e.target.value * 100),
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160),
    });
  }

  render() {
    const powerSlider = this.state.power
      ? {
          float: 'right',
          backgroundColor: 'green',
        }
      : {
          float: 'left',
          backgroundColor: 'red',
        };

    const bankSlider =
      this.state.currentPadBank === bankOne
        ? {
            float: 'left',
            backgroundColor: 'yellow',
          }
        : {
            float: 'right',
            backgroundColor: 'orange',
          };

    {
      const clips = [].slice.call(document.getElementsByClassName('clip'));
      clips.forEach((sound) => {
        sound.volume = this.state.sliderVal;
      });
    }

    return (
      <div className="inner-container" id="drum-machine">
        <PadBank
          clipVolume={this.state.sliderVal}
          currentPadBank={this.state.currentPadBank}
          power={this.state.power}
          updateDisplay={this.displayClipName}
        />

        <div className="logo">
          <div className="inner-logo ">
            {'Drum Machine' + String.fromCharCode(160)}
          </div>
          <i className="inner-logo fa fa-free-code-camp" />
        </div>

        <div className="controls-container">
          {!this.state.power ? (
            <p id="display-off">{this.state.display}</p>
          ) : (
            <p id="display">{this.state.display}</p>
          )}
          <div className="volume-slider">
            <input
              max="1"
              min="0"
              onChange={this.adjustVolume}
              step="0.01"
              type="range"
              value={this.state.sliderVal}
            />
            <p>
              <span className="left">-</span> Vol.{' '}
              <span className="right">+</span>
            </p>
          </div>
          <div className="control">
            <p>Power</p>
            <div className="select" onClick={this.powerControl}>
              <div className="inner" style={powerSlider} />
            </div>
          </div>
          <div className="control">
            <p>Kit</p>
            <div className="select" onClick={this.selectBank}>
              <div className="inner" style={bankSlider} />
            </div>
          </div>
          <div className="footer">
            &copy; Clinton Otse{' '}
            <a
              href="https://codepen.io/Clinton_Otse/"
              target="_blank"
              rel="noreferrer"
            >
              codepen<i class="fab fa-free-code-camp"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
