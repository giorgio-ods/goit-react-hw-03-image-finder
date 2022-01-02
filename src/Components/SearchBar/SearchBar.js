import { Component } from "react/cjs/react.production.min";
import s from "../../App.module.css";

export default class SearchBar extends Component {
  state = {
    searchQuery: "",
  };

  handleNameChange = (e) => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === "") {
      alert("Incorrect Search");
      return;
    }
    this.props.onSubmit(this.state.searchQuery.trim());
    this.setState({ searchQuery: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
