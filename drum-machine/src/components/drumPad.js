import React from 'react';
import activeStyle from '../drumMachineDB/active';
import inactiveStyle from '../drumMachineDB/inactive';

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle,
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render() {
    return (
      <div
        className="drum-pad"
        id={this.props.clipId}
        onClick={this.playSound}
        style={this.state.padStyle}
      >
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.clip}
        />
        {this.props.keyTrigger}
      </div>
    );
  }

  activatePad() {
    if (this.props.power) {
      if (this.state.padStyle.backgroundColor === 'green') {
        this.setState({
          padStyle: inactiveStyle,
        });
      } else {
        this.setState({
          padStyle: activeStyle,
        });
      }
    } else if (this.state.padStyle.marginTop === 13) {
      this.setState({
        padStyle: inactiveStyle,
      });
    } else {
      this.setState({
        padStyle: {
          height: 77,
          marginTop: 13,
          backgroundColor: 'grey',
          boxShadow: '0 3px grey',
        },
      });
    }
  }
}

export default DrumPad;
