const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];



class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "---",
      volume: 70,
      bank: bankOne };

    this.handleDrumPad = this.handleDrumPad.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }
  componentDidMount() {
    let keys = "QWEASDZXC";
    document.body.addEventListener("keydown", function (ev) {
      console.log(ev);
      let id = ev.key.toUpperCase();
      if (keys.includes(id)) {
        this.playSample(id);
      } else
      if (id == "ArrowLeft") {
        this.setState({
          volume: this.state.volume - 5 });

      } else
      if (id == "ArrowRight") {
        this.setState({
          volume: this.state.volume + 5 });

      }
    }.bind(this));
  }
  componentDidUnmount() {
    document.removeEventListener("keydown", this.handleDrumPad);
  }
  render() {
    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", { id: "drumpads" },

      this.state.bank.map((voice) =>
      React.createElement(DrumPad, {
        clip: voice.url,
        keyTrigger: voice.keyTrigger,
        id: voice.id,
        handleClick: this.handleDrumPad }))),




      React.createElement("h1", { id: "display" }, this.state.displayText),
      React.createElement("div", { id: "volume" },
      React.createElement("input", {
        type: "range",
        min: "0",
        max: "100",
        id: "volume-bar",
        value: this.state.volume,
        onChange: this.handleVolume }),

      React.createElement("h1", { id: "volume-display" }, "Volume: ", this.state.volume, " ", "%"))));



  }

  handleDrumPad(event) {
    let sampleKey = event.target.textContent;
    this.playSample(sampleKey);
  }
  handleVolume(event) {
    this.setState({
      volume: event.target.value });

  }

  playSample(sampleKey) {
    sampleKey = sampleKey.toUpperCase();

    let sampleID = null;
    for (let sampleJSON of this.state.bank) {
      if (sampleJSON.keyTrigger == sampleKey) {
        sampleID = document.getElementById(sampleJSON.id).id;
      }
    }

    let sample = document.getElementById(sampleKey);

    sample.volume = this.state.volume / 100;
    sample.currentTime = 0;
    sample.play();

    this.setState({
      displayText: sampleID });

  }
  switchBank() {
    this.setState({
      bank: this.state.bank == bankOne ? bankTwo : bankOne });

  }}


function DrumPad(props) {
  return (
    React.createElement("div", { className: "drum-pad", id: props.id, onClick: props.handleClick },
    React.createElement("audio", {
      src: props.clip,
      id: props.keyTrigger,
      className: "clip" }),

    props.keyTrigger));


}

ReactDOM.render(React.createElement(DrumMachine, null), document.getElementById("drum-machine-parent"));