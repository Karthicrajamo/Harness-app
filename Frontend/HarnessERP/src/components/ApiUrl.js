import SteinStore from 'stein-js-client';

let API_URL = '';

export const fetchApiUrl = async () => {
  const store = new SteinStore(
    'https://api.steinhq.com/v1/storages/66c32caf4d11fd04f01f65ed'
  );
  try {
    const response = await store.read('endpoint');
    if (response.length > 0 && response[0].Url) {
      API_URL = response[0].Url;
      console.log("api_url endpoint:"+API_URL)
    }
  } catch (error) {
    console.error('Error fetching API URL:', error);
  }
  return API_URL;
};

// Export the variable (initially empty)
export { API_URL };

// HARISH
// const API_URL = 'http://192.168.0.169:8087';
// const API_URL = 'http://192.168.0.169:8084';


// KARTHIC
// const API_URL= "http://192.168.0.207:8084";

//Surya
// const API_URL = 'http://192.168.0.107:8084';

