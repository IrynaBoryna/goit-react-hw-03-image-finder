import React, { Component } from 'react';
import { fetchImagesWithQuery } from 'servises';
import { Loader } from '../Loader/loader';
import { Modal } from '../Modal/modal';
import { ImageGalleryItem } from '../ImageGalleryItem/imageGalleryItem';
import css from '../ImageGallery/imageGallery.module.css';
import { Button } from '../Button/button';
// import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    images: [],
    queryValue: '',
    showModal: false,
    isLoading: false,
    error: null,
    pageNumber: 1,
    activeInd: 0,
   };

  async componentDidUpdate(prevProps, prevState) {
    if ( prevProps.queryValue !== this.props.queryValue  ) {
      this.resetForm()
      }
    if ( prevProps.queryValue !== this.props.queryValue ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      this.setState({ isLoading: true });
      try {
          const response = await fetchImagesWithQuery(
          this.props.queryValue,
          this.state.pageNumber
        );
        this.setState(state => ({ images: [...state.images, ...response] }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  setActiveInd(index) {
    this.setState({ activeInd: index });
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onLoadMore = () => {
    this.setState({ pageNumber: this.state.pageNumber +1})
   };

  resetForm() {
    this.setState({ pageNumber: 1 })
    this.setState({ images: '' }) 
  };
  
  render() {
    const { images, isLoading, error, showModal } = this.state;
    const imageModal = this.state.images[this.state.activeInd];
    return (
      <>
        {error && <p>щось пішло не так...</p>}
        {isLoading ? (
          <Loader />
        ) : (
          <ul className={css.imageGallery}>
            {images.map(({ id, webformatURL, tags }, index) => (
              <ImageGalleryItem
                id={id}
                webformatURL={webformatURL}
                tags={tags}
                onClick={() => this.setActiveInd(index)}
              />
            ))}
          </ul>
        )}
        {showModal && (
          <Modal
            largeImageURL={imageModal.largeImageURL}
            tags={imageModal.tags}
            onClose={this.toggleModal}
          />
        )}
        {images.length > 0 && <Button onClick={this.onLoadMore} />}
      </>
    );
  }
}

// ImageGallery.prototype = {
//   tags: PropTypes.string,
//   webformatURL: PropTypes.string,
//   id: PropTypes.number,
//   mages: PropTypes.array,
//   queryValue: PropTypes.string,
//   showModal: PropTypes.bool,
//   isLoading: PropTypes.bool,
//   error: PropTypes.string,
//   pageNumber: PropTypes.number,
//   activeInd: PropTypes.number,
// };
