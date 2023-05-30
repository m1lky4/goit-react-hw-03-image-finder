import s from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ItemImageGallery/ImageGalleryItem';
import { css } from '@emotion/react';
import { DotLoader } from 'react-spinners';
const { Component } = require("react");


export class ImageGallery extends Component {
  render() {
    const { isSubmitted, response } = this.props;

    if (!isSubmitted) {
      return null;
    }
    if (!response.data) {
      return (
        <div className={s.Loader}>
    <DotLoader
          color="#36d7b7"
          size={100}
          loading={true}
/>
  </div>)
  ;
}

    if (response.data && response.data.hits && response.data.hits.length > 0) {
      return (
        <ul className={s.ImageGallery}>
          {response.data.hits.map((el) => (
            <ImageGalleryItem imgURL={el.webformatURL} key={el.id} />
          ))}
        </ul>
      );
    }
  }
}
