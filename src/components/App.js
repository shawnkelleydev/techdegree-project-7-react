import "../App.css";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

//components
import NotFound from "./NotFound";
import Home from "./Home";
import Results from "./Results";

//class component declaration
class App extends React.Component {
  //the glorious state!
  state = {
    presets: ["pianos", "mountains", "tubas"],
    query: "",
    pianosPhotos: [],
    mtnPhotos: [],
    tubaPhotos: [],
    photos: [],
  };

  //initial loads
  componentDidMount() {
    let pianosURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=80193e730b89b3d1e05dec4e1aa42d63&safe_search=1&tags=pianos&per_page=16&format=json&nojsoncallback=1`;
    let mtnURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=80193e730b89b3d1e05dec4e1aa42d63&safe_search=1&tags=mtns&per_page=16&format=json&nojsoncallback=1`;
    let tubaURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=80193e730b89b3d1e05dec4e1aa42d63&safe_search=1&tags=tuba&per_page=16&format=json&nojsoncallback=1`;

    axios.get(pianosURL).then((res) => {
      let photoData = res.data.photos.photo;
      this.setState({ pianosPhotos: this.getPhotoURLs(photoData) });
    });
    axios.get(mtnURL).then((res) => {
      let photoData = res.data.photos.photo;
      this.setState({ mtnPhotos: this.getPhotoURLs(photoData) });
    });
    axios.get(tubaURL).then((res) => {
      let photoData = res.data.photos.photo;
      this.setState({ tubaPhotos: this.getPhotoURLs(photoData) });
    });
  }

  //https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

  //turns data from flickr into urls
  getPhotoURLs(data) {
    const photos = [];
    data.forEach((pic) => {
      photos.push(
        `https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`
      );
    });
    return photos;
  }

  //only works as arrow function?
  //brings data back from search and sets state here
  handleSearchData = (query, data) => {
    this.setState({
      query,
      photos: this.getPhotoURLs(data),
    });
  };

  //page rendering
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                title={"Home"}
                presets={this.state.presets}
                handle={this.handleSearchData}
              />
            )}
          />
          <Route
            exact
            path="/notfound"
            render={(props) => (
              <NotFound
                {...props}
                presets={this.state.presets}
                handle={this.handleSearchData}
              />
            )}
          />
          <Route
            exact
            path="/pianos"
            render={(props) => (
              <Results
                {...props}
                photos={this.state.pianosPhotos}
                presets={this.state.presets}
                handle={this.handleSearchData}
              />
            )}
          />
          <Route
            exact
            path="/mountains"
            render={(props) => (
              <Results
                {...props}
                photos={this.state.mtnPhotos}
                presets={this.state.presets}
                handle={this.handleSearchData}
              />
            )}
          />
          <Route
            exact
            path="/tubas"
            render={(props) => (
              <Results
                {...props}
                photos={this.state.tubaPhotos}
                presets={this.state.presets}
                handle={this.handleSearchData}
              />
            )}
          />
          <Route
            exact
            path="/:query"
            render={(props) => (
              <Results
                {...props}
                title={this.state.query}
                photos={this.state.photos}
                presets={this.state.presets}
                handle={this.handleSearchData}
              />
            )}
          />
          <Redirect to="/notfound" />
        </Switch>
      </div>
    );
  }
}

export default App;
