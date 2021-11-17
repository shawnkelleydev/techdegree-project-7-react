import Photo from "./Photo";
import React, { Component } from "react";
import Search from "./Search";
import NavList from "./NavList";
import axios from "axios";
import apiKey from "../config.json";
// import { Redirect } from "react-router-dom";

class Results extends Component {
  handleSubmit(e) {
    e.preventDefault();
    let apikey = apiKey.apiKey;
    const query = e.target.querySelector("input").value;
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&safe_search=1&tags=${query}&per_page=16&format=json&nojsoncallback=1`;
    axios.get(url).then((res) => {
      let photoData = res.data.photos.photo;
      this.props.handle(query, photoData);
      const path = "/" + query;
      if (photoData.length > 0) {
        this.props.history.push(path);
      } else {
        this.props.history.push("/notfound");
      }
    });
  }

  render() {
    const query = this.props.match.url.split("/")[1];
    return (
      <div>
        <Search submit={(e) => this.handleSubmit(e)} />
        <NavList presets={this.props.presets} />
        <div className="photo-container">
          <h1>Results for "{query}"</h1>
          <ul>
            {this.props.photos.map((photo) => (
              <Photo photo={photo} key={(Math.random() * 1000000).toFixed(0)} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Results;
