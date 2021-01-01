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

axios(
  {
    url: 'https://api.tcgplayer.com/token',
    method: 'POST',
    headers: headers,
    data: dataString,
  })
.then((res) => {
  console.log(res.data);
  console.log('success');
})

.catch(function (error){
  console.log(error.response);
  console.log('error');
});
