import css from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  webformatURL,
   tags,
   onClick,
}) => {
  return (
    <li className={css.galleryItem}>
      <img
        id={id}
        src={webformatURL}
        alt={tags}
        onClick={onClick}
        className={css.imageGalleryItemImage}
      />
      </li>
  );
};

ImageGalleryItem.prototype = {
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.number,
  onClick: PropTypes.func,
};
