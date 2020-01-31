import React from "react";
import "./App.css";
export class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImages: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImages: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleClick(event) {
    event.preventDefault();
    const randindex = Math.floor(
      Math.random() * 100
    );
    const RandomImageUrl = this.state.allMemeImages[randindex].url;
    this.setState({
      randomImage: RandomImageUrl
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
      </div>
    );
  }
}
