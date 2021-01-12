import React from 'react';
import ReactDOM from 'react-dom';
import { getPokemonProducts } from "../../tcgplayer.js";
import SearchChecklist from '../SearchChecklist';

import TextField from '@material-ui/core/TextField';

var Search = (props) => {
  return (
    <div className="Search">
      <TextField className="search-text-field" name="search_term" id="search" value={props.searchTerm} onChange={props.onChange} label="Search" />
      <button className="search-submit-button" type="submit" onClick={props.handleSearch} >Search</button>

      <SearchChecklist />
    </div>
  )
}

export default Search;
