const axios = require('axios');

const PUBLIC_KEY = 'e461db10-9b1d-48f4-b689-e6bd4e1be9dd';
const PRIVATE_KEY = 'edfa43ea-dff7-4788-8a2b-285afa3e172f';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

let headers = {
  // 'User-Agent': 'CardValue',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST'
  // 'Content-Type': 'application/json',
  // 'Content-Type': 'multipart/form-data',
};

let dataString =
  'grant_type=client_credentials' +
  '&client_id=' + PUBLIC_KEY +
  '&client_secret=' + PRIVATE_KEY;

export let getBearerToken = async () => {
  console.log('calling to api');
  const response = await axios(
    {
      url: PROXY_URL + 'https://api.tcgplayer.com/token',
      method: 'POST',
      headers: headers,
      data: dataString,
    })
  .catch(function (error){
    console.log(error.response);
    console.log('error');
  });

  const bearer = response.data.access_token;
  headers['Authorization'] = 'bearer ' + bearer;
  console.log('bearer token success');
  // console.log(headers);
  // console.log(bearer);

  return bearer;
}



export let getAllCategories = async () => {
  console.log('calling to api to get all categories');
  const response = await axios({
    url: 'https://api.tcgplayer.com/catalog/categories' + '?limit=16' + '&sortOrder=name',
    method: 'GET',
    headers: headers,
  })
  .catch((error) => {
    console.log(error.response);
  });

  // console.log(response.data);
  console.log('all categories call success');
  //all categories
  const all_categories = response.data;

  return all_categories;

}

export let getPokemonCategoryId = (all_categories) => {
  console.log('getting pokemon categoryId');
  let pokemon_category_object = all_categories.results.find( x => x.name === 'Pokemon');
  console.log(pokemon_category_object);
  let pokemonCategoryId = pokemon_category_object['categoryId'];
  console.log(pokemonCategoryId);
  console.log('pokemon categoryId success');

  return pokemonCategoryId;
}

//unused, function gets media files like jpeg, etc
//unwanted for scope of project
export let getPokemonMedia = async (pokemonId) => {
  console.log('calling to api to get all pokemon category media')
  const response = await axios({
    url: 'https://api.tcgplayer.com/catalog/categories/' + pokemonId + '/media',
    method: 'GET',
    headers: headers,
  }).catch((error) => {
    console.log(error.response);
  });

  const all_pokemon_media = response.data;

  console.log(all_pokemon_media);
  console.log('all pokemon category media success');

  return all_pokemon_media;
}

export let getPokemonProducts = async (pokemonId, search_term) => {
  console.log('calling to api to get pokemon products');
  const response = await axios({
    url: 'https://api.tcgplayer.com/catalog/categories/' + pokemonId + '/search',
    method: 'POST',
    headers:
    {
      "Authorization": headers['Authorization'],
      "Accept": "application/json",
      "Content-Type": "text/json"
    },
    // body: {
    //   sort: "",
    //   limit: 0,
    //   offset: 0,
    //   filters: [{name: 'ProductName', values: ['Pokemon',]}],
    // },
    data: "{\"filters\":[{\"values\":[\"" + search_term + "\"],\"name\":\"ProductName\"}],\"limit\":144,\"includeAggregates\":true,\"offset\":0,\"sort\":\"MinPrice DESC\"}",
  }).catch((error) => {
    console.log(error.response);
  });
  console.log(response);
  const all_pokemon_products = response.data;

  console.log(all_pokemon_products);
  console.log('all pokemon products success');

  return all_pokemon_products.results;
}


export let getTwelveMoreProductsById = async (arrayOfProductIds, offset) => {
  let twelve_more_product_details = [];

  console.log('calling to api to get Product Details (12)');
  for(var i = offset; i < offset + 12; i++){
    twelve_more_product_details.push(await getOneProductById(arrayOfProductIds[i]));
  }
  // arrayOfProductIds.forEach( x => all_product_details.push(getOneProductById(x)));
  console.log(twelve_more_product_details);

  return twelve_more_product_details;

}


export let getAllProductsById = async (arrayOfProductIds) => {
  let all_product_details = [];

  console.log('calling to api to get Product Details (144)');
  // for(var i = 0; i < arrayOfProductIds.length; i++){
  //   all_product_details.push(await getOneProductById(arrayOfProductIds[i]));
  // }

  await Promise.all(
    arrayOfProductIds.map(async (id) => {
      all_product_details.push(await getOneProductById(id));
    })
  )

  //factor out later
  //we check if there is a relevant_product_market_prices object
  // if so, is there marketPrice property
  // if not, is there a midPrice property
  all_product_details.sort((a,b) => {
    return b['relevant_product_market_prices'] && a['relevant_product_market_prices'] ?
       b['relevant_product_market_prices'].marketPrice && a['relevant_product_market_prices'].marketPrice ?
         b['relevant_product_market_prices'].marketPrice - a['relevant_product_market_prices'].marketPrice
         :
         b['relevant_product_market_prices'].midPrice && a['relevant_product_market_prices'].midPrice ?
          b['relevant_product_market_prices'].midPrice - a['relevant_product_market_prices'].midPrice
          :
          0
    :
    0
  });

  // arrayOfProductIds.forEach( x => all_product_details.push(getOneProductById(x)));
  console.log(all_product_details);

  return all_product_details;

}

export let getOneProductById = async (productId) => {
  console.log('calling to api to get ' + productId + ' details');
  const response = await axios({
    url: 'https://api.tcgplayer.com/catalog/products/' + productId,
    method: 'GET',
    headers: headers,
  }).catch((error) => {
    console.log(error.response);
  });

  const relevant_product_market_prices = await getProductMarketPrices(productId);

  let product_details = response.data.results;
  product_details['relevant_product_market_prices'] = relevant_product_market_prices;
  // console.log(response.data.results);
  console.log(productId + ' success');
  console.log(product_details);

  return product_details;

}

let getProductMarketPrices = async (productId) => {
  console.log('calling to api to get ' + productId + ' market price');

  const response = await axios({
    url: 'https://api.tcgplayer.com/pricing/product/' + productId,
    method: 'GET',
    headers: headers,
  }).catch((error) => {
    console.log(error.response);
  });

  let all_prints_market_prices = response.data.results;

  // console.log(all_prints_market_prices);

  let filtered_market_prices = all_prints_market_prices.find( printing => printing.marketPrice);

  //if we cannot find marketPrice property, check for midPrice
  //if there is no midPrice property, return {}
  if(!filtered_market_prices){
    filtered_market_prices = all_prints_market_prices.find( printing => printing.midPrice);
  }

  // console.log(filtered_market_prices);

  return filtered_market_prices;
}


let printThis = async (print) => {
  console.log(print);
}

const AllCalls = async () => {
  console.log('calling both functions');
  await getBearerToken();
  const categories = await getAllCategories();
  let pokemonCategoryId = await getPokemonCategoryId(categories);
  let all_pokemon_products = await getPokemonProducts(pokemonCategoryId);
  let all_product_details = await getAllProductsById(all_pokemon_products);

  return all_product_details;
}

// AllCalls().then( (res) =>
  // {
    // console.log(res);
  // }
// )
// console.log(headers['bearer']);

// export default { headers, dataString, PUBLIC_KEY, PRIVATE_KEY};
