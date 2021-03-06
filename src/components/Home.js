// import Search from "./Search";
import NavList from "./NavList";
import React, { Component } from "react";
import axios from "axios";
import Search from "./Search";
import apiKey from "./config.js";

class Home extends Component {
  handleSubmit(e) {
    e.preventDefault();
    let apikey = apiKey;
    const query = e.target.querySelector("input").value;
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&safe_search=1&tags=${query}&per_page=10&format=json&nojsoncallback=1`;
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
    return (
      <div>
        <Search submit={(e) => this.handleSubmit(e)} />
        <NavList presets={this.props.presets} />
        <h1>Welcome to the Flickr Party!</h1>
        <div className="photo-container">
          <ul>
            <li>
              <img
                src="https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://farm5.staticflickr.com/4342/36338751244_316b6ee54b.jpg"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://farm5.staticflickr.com/4343/37175099045_0d3a249629.jpg"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://farm5.staticflickr.com/4425/36337012384_ba3365621e.jpg"
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
