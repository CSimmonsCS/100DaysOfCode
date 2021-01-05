const axios = require('axios');

const PUBLIC_KEY = 'e461db10-9b1d-48f4-b689-e6bd4e1be9dd';
const PRIVATE_KEY = 'edfa43ea-dff7-4788-8a2b-285afa3e172f';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

let headers = {
  // 'User-Agent': 'CardValue',
  'Content-Type': 'application/x-www-form-urlencoded',
  // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000/',
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

export let getPokemonProducts = async (pokemonId) => {
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
    data: "{\"filters\":[{\"values\":[\"Charizard\"],\"name\":\"ProductName\"}],\"limit\":24,\"includeAggregates\":true,\"offset\":0,\"sort\":\"MinPrice DESC\"}",
  }).catch((error) => {
    console.log(error.response);
  });
  console.log(response);
  const all_pokemon_products = response.data;

  console.log(all_pokemon_products);
  console.log('all pokemon products success');

  return all_pokemon_products.results;
}

export let getAllProductsById = async (arrayOfProductIds) => {
  let all_product_details = [];

  console.log('calling to api to get Product Details (24)');
  for(var i = 0; i < arrayOfProductIds.length; i++){
    all_product_details.push(await getOneProductById(arrayOfProductIds[i]));
  }
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

  const product_details = response.data.results;
  // console.log(response.data.results);
  console.log(productId + ' success');

  return product_details;

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
