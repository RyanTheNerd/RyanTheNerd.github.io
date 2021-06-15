const baseURL = "https://haggleforth.com";

const projects = {
  personal: [
  {
    URL: "/soccerio/dist/",
    imgURL: "/img/soccerio.png",
    title: "Soccerio",
    text: "A soccer-esque game with the asthetics of Agario" },

  {
    URL: "/ice-skating-guy-in-hat",
    imgURL: "/img/ice-skating-guy-in-hat.png",
    title: "Ice Skating Guy in Hat",
    text: "Ever wanted to control hundreds of stickfigure ice skaters wearing hats? No? Well now you can!" },

  {
    URL: "/pixel-art-generator/dist",
    imgURL: "/img/pixel-art-generator.png",
    title: "Pixel art generator",
    text: "Take any regular image and turn it into pixel art with this neat tool." },


  {
    URL: "/pile-of-roses/dist",
    imgURL: "/img/pile-of-roses.png",
    title: "Pile of Roses",
    text: "A pile of randomly generated Maurer Roses: Click and drag to move them around!" },

  {
    URL: "/asthetics/dist",
    imgURL: "/img/asthetics.png",
    title: "Asthetics",
    text: "I think this looks cool" },

  {
    URL: "/this-kinda-makes-me-feel-sick/dist",
    imgURL: "/img/cubes.png",
    title: "Cubes",
    text: "Trippy looking anaglyph of moving cubes" }],


  fcc: [
  {
    URL: "/drum-machine/dist",
    imgURL: "/img/drum-machine.png",
    title: "Drum Machine",
    text: "Play some drums usng either the keyboard or the on screen display!" },

  {
    URL: "/md-previewer/dist",
    imgURL: "/img/md-previewer.png",
    title: "Markdown Previewer",
    text: "Edit markdown in realtime with this markdown previewer!" },

  {
    URL: "/canvas-tutorial/dist",
    imgURL: "/img/canvas-tutorial.png",
    title: "Canvas Tutorial",
    text: "Learn how to draw sierpinski's triangle in canvas by following this tutorial!" }] };




function ProjectCard(props) {
  return (
    React.createElement("div", { className: "col-md-4 project-card my-2" },
    React.createElement("div", { className: "card" },
    React.createElement("a", { href: props.URL, target: "_blank" },
    React.createElement("img", {
      src: props.imgURL,
      style: { backgroundColor: "black" },
      className: "card-img-top" })),


    React.createElement("div", { className: "card-body" },
    React.createElement("h4", { className: "card-title" }, props.title),
    React.createElement("div", { className: "card-text" }, props.text)))));




}

function Contact(props) {
  return (
    React.createElement("div", { className: "col-sm-4 contact" },
    React.createElement("a", { href: props.href, target: "_blank" },
    React.createElement("img", { className: "img-fluid", src: props.src }))));



}

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let fccProjects = this.props.fcc.map(
    p => {return React.createElement(ProjectCard, {
        URL: baseURL + p.URL,
        imgURL: baseURL + p.imgURL,
        title: p.title, text: p.text });
    });

    let personalProjects = this.props.personal.map(
    p => {return React.createElement(ProjectCard, {
        URL: baseURL + p.URL,
        imgURL: baseURL + p.imgURL,
        title: p.title, text: p.text });
    });

    return (
      React.createElement("div", null,


      React.createElement("div", { className: "jumbotron" },
      React.createElement("h1", { className: "display-3" }, "Ryan Mattox"),
      React.createElement("p", { className: "lead ml-3" }, "Front End Web Developer")),


      React.createElement("div", { id: "projects", className: "container" },
      React.createElement("h1", { className: "text-center mb-4 mt-5" }, "Personal Projects"),
      React.createElement("div", { className: "well row mb-4" },
      personalProjects),


      React.createElement("h1", { className: "text-center mb-4 mt-5" }, "Free Code Camp Projects"),
      React.createElement("div", { className: "well row mb-4" },
      fccProjects),


      React.createElement("footer", { className: "page-footer py-5" },
      React.createElement("h1", { className: "text-center mb-4 mt-5" }, "Check me out on these platforms:"),
      React.createElement("div", { className: "container-fluid" },
      React.createElement("div", { className: "row", id: "contacts" },
      React.createElement(Contact, { href: "https://github.com/RyanTheNerd",
        src: baseURL + "/img/github.png" }),

      React.createElement(Contact, { href: "https://codepen.io/Haggleforth",
        src: baseURL + "/img/codepen.png" }),

      React.createElement(Contact, { href: "https://www.freecodecamp.org/ryanthenerd",
        src: baseURL + "/img/fcc.png" })))))));








  }}



ReactDOM.render(React.createElement(Portfolio, { personal: projects.personal, fcc: projects.fcc }), document.querySelector('#target'));
