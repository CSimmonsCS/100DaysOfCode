import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getBearerToken, getAllCategories,
        getPokemonCategoryId, getPokemonProducts,
        getAllProductsById, } from "../../tcgplayer.js";

import Search from '../Search';
import Products from '../Products';



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



class SearchLayout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numProductsToShow: 12,
      search_term: '',
      checkedBoxes: [],
    };
  }

  async componentDidMount(){
    await getBearerToken();
    const categories = await getAllCategories();
    let pokemonCategoryId = await getPokemonCategoryId(categories);
    let all_pokemon_products = await getPokemonProducts(pokemonCategoryId, this.state.search_term);
    let all_product_details = await getAllProductsById(all_pokemon_products);

    this.setState({
      'products': all_product_details,
      'const_products': all_product_details
     });
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

    this.setState({'products': null });

    await getBearerToken();
    const categories = await getAllCategories();
    let pokemonCategoryId = await getPokemonCategoryId(categories);
    let all_pokemon_products = await getPokemonProducts(pokemonCategoryId, this.state.search_term);
    let all_product_details = await getAllProductsById(all_pokemon_products);

    this.setState({
      'products': all_product_details,
      'const_products': all_product_details});
  }

  handleCheckboxPrinting = (e, printing) => {

    const checkedBoxes = [...this.state.checkedBoxes];

    const products = this.state.const_products;

    if(e.target.checked){
      checkedBoxes.push(printing);
    } else {
      const index = checkedBoxes.findIndex( (checked) => checked === printing);
      checkedBoxes.splice(index, 1);
    }

    // check if a product contains a filter that is checked (checkedBoxes array)
    // for printing types (holofoil, reverse holofoil, etc), check the subTypeName in relevant_product_market_prices object in a product object
    let filtered_products = products;

    if(checkedBoxes.length > 0){
      filtered_products = products.filter(product =>
                                  checkedBoxes.find((ch) =>
                                    product['relevant_product_market_prices'] ?
                                    product['relevant_product_market_prices'].subTypeName === ch :
                                    false
                                  )
                                );
    }


    this.setState({checkedBoxes: checkedBoxes, products: filtered_products});
  }

  render() {
    return (
      <div className='SearchLayout'>
        <Grid container spacing={3} className="layout-container">
          <Grid container xs={3} className="filter-column">
            <Search
              searchTerm={this.state.search_term}
              onChange={this.onChange}
              handleSearch={this.handleSearch}
              handleCheckboxPrinting={this.handleCheckboxPrinting}
              checkedBoxes={this.state.checkedBoxes}
            />
          </Grid>
          <Grid container spacing={3} xs={9} className="layout-container">
            <Products products={this.state.products} numProductsToShow={this.state.numProductsToShow}/>

            {this.state.products ?
              <div className="show-more-button-container" onClick={this.showMoreProducts} >
                <div className="show-more-button">
                  Show More
                </div>
              </div>
              :
              ''
            }

          </Grid>
        </Grid>
      </div>
    );
  }

}

export default SearchLayout;
