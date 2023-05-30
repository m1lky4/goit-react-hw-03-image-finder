import { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImages } from 'components/ImagesAPI/imagesApi';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';

export class App extends Component {
  state = {
    isSubmitted: false,
    inputValue: '',
    response: { data: { hits: [] } },
    error: null,
    page: 1
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true, error: null, response: { data: { hits: [] } }, page: 1 }, () => {
    this.fetchImages();
    });
  };

  loadMore = async () => {
    this.setState((prev) => ({ page: prev.page + 1 }), () => {
      this.fetchImages();
    });
  };

  fetchImages = async () => {
    try {
      const response = await getImages(this.state.inputValue, this.state.page);
      this.setState((prev) => ({
        response: {
          data: {
            hits: [...prev.response.data.hits, ...response.data.hits],
          },
        },
      }));
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { isSubmitted, response, error } = this.state;

    return (
      <>
        <SearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        {isSubmitted && !error && (
          <>
            <ImageGallery isSubmitted={isSubmitted} response={response} />
            <ButtonLoadMore loadMore={this.loadMore} />
          </>
        )}
      </>
    );
  }
}
