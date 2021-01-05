import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getBearerToken, getAllCategories,
        getPokemonCategoryId, getPokemonProducts,
        getAllProductsById, } from "../../tcgplayer.js";

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
    };
  }

  async componentDidMount(){
    await getBearerToken();
    const categories = await getAllCategories();
    let pokemonCategoryId = await getPokemonCategoryId(categories);
    let all_pokemon_products = await getPokemonProducts(pokemonCategoryId);
    let all_product_details = await getAllProductsById(all_pokemon_products);

    this.setState({'products': all_product_details});
  }

  render() {
    return (
      <div className='SearchLayout'>
        <Grid container spacing={3} className="layout-container">
          <Grid container xs={3} className="filter-column">Column</Grid>
          <Grid container spacing={3} xs={9} className="layout-container">
            {!this.state.products || this.state.products.length <= 0 ? (
            <tr>
              <td>No Products</td>
            </tr>
            ):(
              this.state.products.map(product => (
                <Grid item xs={3} key={product.productId}>
                  <Paper variant="outlined" elevation={3}>
                    <div className="test-height">
                      <img className="search-img" src={product[0].imageUrl} alt="img" />
                      <div>{product[0].name}</div>
                    </div>
                  </Paper>
                </Grid>
              ))
            )}

          </Grid>
        </Grid>
      </div>
    );
  }

}

export default SearchLayout;
