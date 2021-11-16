import Photo from "./Photo";
import React, { Component } from "react";
import Search from "./Search";
import NavList from "./NavList";
import axios from "axios";
// import { Redirect } from "react-router-dom";

class Results extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const query = e.target.querySelector("input").value;
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=80193e730b89b3d1e05dec4e1aa42d63&safe_search=1&tags=${query}&per_page=10&format=json&nojsoncallback=1`;
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
        <h1>Results for "{query}"</h1>
        <ul>
          {this.props.photos.map((photo) => (
            <Photo photo={photo} key={(Math.random() * 1000000).toFixed(0)} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Results;
