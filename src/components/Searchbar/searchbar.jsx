import { Component } from 'react';
import { toast } from 'react-toastify';

import css from './searchbar.module.css';

export class Searchbar extends Component {
  state = {
    queryValue: '',
  };

  handleInputChange = evt => {
    this.setState({ queryValue: evt.currentTarget.value.toLowerCase() });
  };

  handleInputSubmit = evt => {
    evt.preventDefault();
    if (this.state.queryValue.trim() === '') {
      return toast('Введіть запит');
    }
    this.props.onSubmit(this.state.queryValue);
    
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleInputSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            name="queryValue"
            value={this.state.queryValue}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
