/*
It seems that MetaWeather API is still
in the beta stage so CORS is blocked.
I ended up using a third-party CORS-proxy for the sake of convenience
*/


// Wrapper for place search
export const queryPlace = place => {
  const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${place}`;
  return fetch(url)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw new Error('Server Error');
          })
          .catch(e => {
            throw new Error('Network Connection Error');
          });
}


// Wrapper for weather query
export const queryWeather = woeid => {
  const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/api/location/${woeid}/`;
  return fetch(url)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw new Error('Server Error');
          })
          .catch(e => {
            throw new Error('Network Connection Error');
          });
}
