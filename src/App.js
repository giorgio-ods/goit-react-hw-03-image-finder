import { Component } from "react";
import s from "./App.module.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import ImageGallery from ".//Components/ImageGallery/ImageGallery";

export default class App extends Component {
  state = {
    searchQuery: null,
  };

  handleFormSubmit = (pix) => {
    if (pix) {
      this.setState({ searchQuery: pix });
    }
  };

  render() {
    return (
      <div className={s.App}>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}
