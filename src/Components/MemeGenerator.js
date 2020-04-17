import React from "react";
import "./App.css";
export class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImages: [],
      image: "http://i.imgflip.com/1bij.jpg",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImages: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const randindex = Math.floor(Math.random() * 100);
    const RandomImageUrl = this.state.allMemeImages[randindex].url;
    this.setState({
      randomImage: RandomImageUrl,
      image: this.state.randomImage,
    });
    console.log("Random immage", this.state.randomImage);
    console.log("My download image url", this.state.image);
  }

  handleDownload(event) {
    event.preventDefault();
    console.log("HREF", event.target.href);
    console.log("My random image url", this.state.randomImage);
    this.setState({
      image: this.state.randomImage,
    });
    console.log("My download image url", this.state.image);
    ///////////////////////////////////////////////////////
    //
    fetch(event.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <form className="meme-form">
          <input
            type="text"
            placeholder="Top Text"
            name="topText"
            onChange={this.handleChange}
            value={this.state.topText}
          />

          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            onChange={this.handleChange}
            value={this.state.bottomText}
          />

          <button onClick={this.handleClick}>Gen</button>

          <div className="meme">
            <img src={this.state.randomImage} alt="" />
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>
          </div>
        </form>
        <a href={this.state.randomImage} download onClick={this.handleDownload}>
          <i className="fa fa-download" />
          Download the MEME
        </a>
      </div>
    );
  }
}
