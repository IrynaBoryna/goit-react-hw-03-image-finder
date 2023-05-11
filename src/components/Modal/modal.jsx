import React, { Component } from 'react';
import css from './modal.module.css';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
 

  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDoun);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDoun);
  }

  hendleKeyDoun = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.hendleBackdropClick}>
        <div className={css.Modal} onClick={this.hendleKeyDoun}>
          <img  src={largeImageURL} alt={tags} className={css.Img} />
        </div>
      </div>,
      modalRoot
    );
  }
}
