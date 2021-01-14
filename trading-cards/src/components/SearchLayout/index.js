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
    const non_int_filters = checkedBoxes.filter(e => !Number.isInteger(e));
    //holofoil, reverse holofoil, etc
    const int_filters = checkedBoxes.filter(e => Number.isInteger(e));
    //prices

    console.log(non_int_filters);
    console.log(int_filters);

    if(checkedBoxes.length > 0){
      // we check if either type of filters are checked,
      // then check if either type of filter is checked while the other is not,
      // if nothing checked, move on
      if(non_int_filters.length > 0 && int_filters.length > 0){
        //this line will return any product that contains matching filter (i.e. if holofoil is checked, return all holofoils)
        filtered_products = products.filter(product =>
                                    non_int_filters.find((ch) =>
                                    //if 'relevant_product_market_prices' object is present,
                                    // we see if matching printing filter is present
                                      product['relevant_product_market_prices'] ?
                                      product['relevant_product_market_prices'].subTypeName === ch :
                                      false
                                    ));

        filtered_products = filtered_products.filter(product =>
                                  int_filters.find((ch) =>
                                   //check if checkedBox is a number
                                  product['relevant_product_market_prices'] ?
                                   //if yes, check if marketPrice is present
                                  product['relevant_product_market_prices'].marketPrice !== null ?
                                     // if marketPrice is present, finally check is marketPrice is less than checkedBox
                                     product['relevant_product_market_prices'].marketPrice < ch :
                                     // if no marketPrice, check if midPrice
                                     product['relevant_product_market_prices'].midPrice !== null ?
                                       // if midPrice is present, finally check if midprice is less than checkedBox
                                       product['relevant_product_market_prices'].midPrice < ch :
                                       false
                                   :
                                   false
                                  ));
      } else if (non_int_filters.length > 0 && int_filters.length === 0){
        //this line will return any product that contains matching filter (i.e. if holofoil is checked, return all holofoils)
        filtered_products = products.filter(product =>
                                    non_int_filters.find((ch) =>
                                    //if 'relevant_product_market_prices' object is present,
                                    // we see if matching printing filter is present
                                      product['relevant_product_market_prices'] ?
                                      product['relevant_product_market_prices'].subTypeName === ch :
                                      false
                                    ));

      } else if (non_int_filters.length === 0 && int_filters.length > 0){
        // this line will return any product that is less than a price checked
        filtered_products = filtered_products.filter(product =>
                                  int_filters.find((ch) =>
                                   //check if checkedBox is a number
                                  product['relevant_product_market_prices'] ?
                                   //if yes, check if marketPrice is present
                                  product['relevant_product_market_prices'].marketPrice !== null ?
                                     // if marketPrice is present, finally check is marketPrice is less than checkedBox
                                     product['relevant_product_market_prices'].marketPrice < ch :
                                     // if no marketPrice, check if midPrice
                                     product['relevant_product_market_prices'].midPrice !== null ?
                                       // if midPrice is present, finally check if midprice is less than checkedBox
                                       product['relevant_product_market_prices'].midPrice < ch :
                                       false
                                   :
                                   false
                                  ));
      }
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
