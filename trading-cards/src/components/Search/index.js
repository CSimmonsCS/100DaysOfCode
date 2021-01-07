import React from 'react';
import ReactDOM from 'react-dom';
import { getPokemonProducts } from "../../tcgplayer.js";
import TextField from '@material-ui/core/TextField';

var Search = (props) => {
  return (
    <div className="Search">
      <TextField name="search_term" id="search" value={props.searchTerm} onChange={props.onChange} label="Search" />
      <button type="submit" onClick={props.handleSearch} >Search</button>
    </div>
  )
}

export default Search;
