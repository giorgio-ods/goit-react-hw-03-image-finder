import { Component } from "react";
// import PropTypes from 'prop-types';
import pixApi from "../FetchPix/FetchPix";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import LoaderComp from "../Loader/Loader";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import s from "../../App.module.css";

export default class ImageGallery extends Component {
  state = {
    status: "idle",
    pics: [],
    error: null,
    showModal: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const newQuery = this.props.searchQuery;
    const nextPage = this.state.page;

    if (prevQuery !== newQuery) {
      this.setState({ status: "pending" });
      this.updateState();
      this.getPics(newQuery, nextPage);
    }

    if (prevState.page !== nextPage) {
      this.getPics(newQuery, nextPage);
    }
  }

  getPics = (newQuery, page) => {
    pixApi
      .fetchPix(newQuery, page)
      .then((images) => {
        if (images.total === 0) {
          this.setState({ status: "rejected", error: "no pics" });
        } else {
          this.setState({ pics: [...images.hits], status: "resolved" });
        }
      })
      .catch((error) => this.setState({ error, status: "rejected" }));
  };

  // getPics = (newQuery, page) => {
  //     pixApi.fetchPix(newQuery, page).then(images => {
  //         if (images.total === 0) {
  //         this.setState({status: "rejected", error: "no pics"})
  //         }
  //         this.setState(prevState => ({ pics: [...prevState.pics, ...images.hits], status: "resolved" }))
  //     }).catch(error => this.setState({error, status: "rejected"}))
  // }

  updateState = () => {
    this.setState({ pics: null, page: 1 });
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  openModal = (url, alt) => {
    this.setState({
      largeImageURL: url,
      alt: alt,
    });
    this.toggleModal();
  };

  closeModal = () => {
    this.setState({ largeImageURL: "", alt: "" });
    this.toggleModal();
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      // pics: [...prevState.pics, ...this.state.pics]
    }));
  };

  render() {
    const { pics, status } = this.state;

    if (status === "idle") {
      return <div></div>;
    }

    if (status === "resolved") {
      return (
        <ul className={s.ImageGallery}>
          {pics.map((pic) => {
            return (
              <ImageGalleryItem
                key={pic.id}
                tags={pic.tags}
                webformatURL={pic.webformatURL}
                largeImageURL={pic.largeImageURL}
                openModal={this.openModal}
              />
            );
          })}
          <Button onClick={this.loadMore} />
          {this.state.largeImageURL && (
            <Modal
              largeImageURL={this.state.largeImageURL}
              alt={this.state.alt}
              onClick={this.closeModal}
            />
          )}{" "}
        </ul>
      );
    }
    if (status === "rejected") {
      return <h4>"{this.props.searchQuery}" not found</h4>;
    }

    if (status === "pending") {
      return <LoaderComp />;
    }
    return <div></div>;
  }
}
