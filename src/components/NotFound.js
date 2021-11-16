import Search from "./Search";
import NavList from "./NavList";
import React, { Component } from "react";
import axios from "axios";

class NotFound extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const query = e.target.querySelector("input").value;
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=80193e730b89b3d1e05dec4e1aa42d63&safe_search=1&tags=${query}&per_page=16&format=json&nojsoncallback=1`;
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
        <h3>No Results Found</h3>
        <p>You search did not return any results. Please try again.</p>
      </div>
    );
  }
}

export default NotFound;
