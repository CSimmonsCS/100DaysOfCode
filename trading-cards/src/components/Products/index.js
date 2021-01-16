import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//loading graphic
import { BlockReserveLoading } from 'react-loadingg';

const Products = props => {
  if(props.products === 'loading'){
    //loading graphic in 'CardValue' purple
    return (
      <div className="loading-graphic">
        <BlockReserveLoading color={'#332940'} />
      </div>
    )
  }
  if(!props.products || props.products.length === 0){
    return (
      <div className="loading-graphic">
        No Products
      </div>
    )
  }
  return props.products
    .slice(0, props.numProductsToShow)
    .map(product => (
      <Grid item xs={3} key={product[0].productId}>
        <Paper variant="outlined" elevation={3} className="product-paper">
          <div className="test-height">
            <a href={product[0].url} target="_blank" rel="noreferrer">
              <img alt={product[0].name} className="search-img" src={product[0].imageUrl} />
            </a>
          <div className="product-name">{product[0].name}</div>
          </div>

          {product.relevant_product_market_prices ?
            <div>
              <div className="product-price">
                {product.relevant_product_market_prices.marketPrice!==null ? 'Market Price: $' + product.relevant_product_market_prices.marketPrice.toFixed(2) :
                  (product.relevant_product_market_prices.midPrice!==null ? 'Median Price: $' + product.relevant_product_market_prices.midPrice.toFixed(2) : 'None')}
              </div>
              <div className="product-foil-type">
                Foil Type: {product.relevant_product_market_prices.subTypeName}
              </div>
            </div>
            :
            ''
          }
        </Paper>
      </Grid>
    ))
}

export default Products;
