const axios = require('axios');

const PUBLIC_KEY = 'e461db10-9b1d-48f4-b689-e6bd4e1be9dd';
const PRIVATE_KEY = 'edfa43ea-dff7-4788-8a2b-285afa3e172f';

const headers = {
  'User-Agent': 'CardValue',

};

const dataString =
  'grant_type=client_credentials' +
  '&client_id=' + PUBLIC_KEY +
  '&client_secret=' + PRIVATE_KEY;

var getBearerToken = async () => {
  console.log('calling to api');
  const response = await axios(
    {
      url: 'https://api.tcgplayer.com/token',
      method: 'POST',
      headers: headers,
      data: dataString,
    })
  .catch(function (error){
    console.log(error.response);
    console.log('error');
  });

  console.log('bearer token success');
  const bearer = response.data.access_token;
  headers['Authorization'] = 'bearer ' + bearer;
  // console.log(headers);
  // console.log(bearer);

  // return bearer;
}



var getAllCategories = async () => {
  console.log('calling to api');
  const response = await axios({
    url: 'https://api.tcgplayer.com/catalog/categories' + '?limit=16' + '&sortOrder=name',
    method: 'GET',
    headers: headers,
  })
  .catch((error) => {
    console.log(error.response);
  });


  console.log('all categories call success');
  //all categories
  const all_categories = response.data;

  return all_categories;

}


const bothCalls = async () => {
  console.log('calling both functions');
  await getBearerToken();
  const categories = await getAllCategories();

  return categories;
}

bothCalls().then( (res) =>
  {
    console.log(res);
  }
)
// console.log(headers['bearer']);
