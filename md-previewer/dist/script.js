const DEMO_DATA = `
# Markdown Previewer
## See what your Markdown looks like in realtime

---

## Features

* WYSIWYG
* Realtime render of markdown
* Full support of markdown features

including but not limited to:

\`Inline code\`

as well as:

\`\`\`
Block code
yeeeeep
this is multiline
\`\`\`

## Reviews

> "*It's amazing, trust me*" — Me

![Monkey](https://cdn.pixabay.com/photo/2018/03/14/05/42/monkey-3224416_960_720.png)

[Try it **today!**](https://codepen.io/Haggleforth/full/gOPWjjq)


`;
marked.setOptions({ breaks: true });


class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: this.props.inputText,
      outputText: marked(this.props.inputText) };

    this.updateText = this.updateText.bind(this);
  }
  updateText(event) {
    let text = event.target.value;
    this.setState({
      inputText: text,
      outputText: marked(text) });

  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "container" },
      React.createElement("textarea", {
        id: "editor", onChange: this.updateText },
      this.state.inputText),


      React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: this.state.outputText } }))));





  }}


ReactDOM.render(React.createElement(Previewer, { inputText: DEMO_DATA }), document.getElementById("previewer"));