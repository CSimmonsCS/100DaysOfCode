import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getBearerToken, getAllCategories,
        getPokemonCategoryId, getPokemonProducts,
        getAllProductsById, } from "../../tcgplayer.js";

import Search from '../Search';

// const PUBLIC_KEY = 'e461db10-9b1d-48f4-b689-e6bd4e1be9dd';
// const PRIVATE_KEY = 'edfa43ea-dff7-4788-8a2b-285afa3e172f';
//
// const headers = {
//   'User-Agent': 'CardValue',
//
// };
//
// const dataString =
//   'grant_type=client_credentials' +
//   '&client_id=' + PUBLIC_KEY +
//   '&client_secret=' + PRIVATE_KEY;

const Products = props => {
  if(!props.products || props.products.length === 0){
    return 'Loading...'
  }
  return props.products
    .slice(0, props.numProductsToShow)
    .map(product => (
      <Grid item xs={3} key={product[0].productId}>
        <Paper variant="outlined" elevation={3}>
          <div className="test-height">
            <a href={product[0].url} target="_blank" rel="noreferrer">
              <img className="search-img" src={product[0].imageUrl} alt="img" />
            </a>
          <div>{product[0].name}</div>
          </div>
          <div>
            {product.relevant_product_market_prices.marketPrice ? 'Market Price: ' + product.relevant_product_market_prices.marketPrice :
              (product.relevant_product_market_prices.midPrice ? 'Median Price: ' + product.relevant_product_market_prices.midPrice : 'None')}
          </div>
          <div>
            Foil Type: {product.relevant_product_market_prices.subTypeName}
          </div>
        </Paper>
      </Grid>
    ))
}

class SearchLayout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numProductsToShow: 12,
      search_term: '',
    };
  }

  async componentDidMount(){
    await getBearerToken();
    const categories = await getAllCategories();
    let pokemonCategoryId = await getPokemonCategoryId(categories);
    let all_pokemon_products = await getPokemonProducts(pokemonCategoryId, this.state.search_term);
    let all_product_details = await getAllProductsById(all_pokemon_products);

    this.setState({'products': all_product_details});
  }

  showMoreProducts = () => {
    let new_total_products_shown = this.state.numProductsToShow+12;
    this.setState({'numProductsToShow': new_total_products_shown});
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  }

  handleSearch = async e => {
    e.preventDefault();

    await getBearerToken();
    const categories = await getAllCategories();
    let pokemonCategoryId = await getPokemonCategoryId(categories);
    let all_pokemon_products = await getPokemonProducts(pokemonCategoryId, this.state.search_term);
    let all_product_details = await getAllProductsById(all_pokemon_products);

    this.setState({'products': all_product_details});
  }

  render() {
    return (
      <div className='SearchLayout'>
        <Grid container spacing={3} className="layout-container">
          <Grid container xs={3} className="filter-column">
            <Search searchTerm={this.state.search_term} onChange={this.onChange} handleSearch={this.handleSearch} />
          </Grid>
          <Grid container spacing={3} xs={9} className="layout-container">
            <Products products={this.state.products} numProductsToShow={this.state.numProductsToShow}/>

            <div onClick={this.showMoreProducts} >Show More</div>
          </Grid>
        </Grid>
      </div>
    );
  }

}

export default SearchLayout;
