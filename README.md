# Crypto Tracker React App

This is a Crypto Price Tracking app I created to practice my React.js, REST Api, and Data Visualization skills. Also table skills -- becuase everyone loves tables, right?! `¯\_(ツ)_/¯`

## Technologies Used
- React [create-react-app](https://create-react-app.dev/)
- Bootstrap (to utilize Bootstrap Icons)
- [Axios](https://axios-http.com/) for API calls
- Third-party API for Crypto Market Data: [CoinCap API](https://docs.coincap.io/)
  - [Example API response](https://docs.coincap.io/#89deffa0-ab03-4e0a-8d92-637a857d2c91)
  - String => Number / Currency functions (all API responses were string values, but I wanted to work with Numbers)
  - Also... some "hackery" to get all of the Coin logo images to display in the table (because their API didn't have the coin image URLs in the response... but figured out a way to display them anyhow! 

```
                      <img
                        alt=""
                        src={
                          "https://assets.coincap.io/assets/icons/" +
                          coin.symbol.toLowerCase() +
                          "@2x.png"
                        }
                      />
```

### Other Technologies used:
- [lodash](https://lodash.com/) - sorting algorithms 
- React Bootstrap for their [Table Component](https://react-bootstrap.github.io/components/table/)
- Money formatting [JavaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

## Learnings
- CoinCap's API wasn't as extensive and detailed as I wanted (but hey, it's free!)... So I had to do some "magic" to get the Coin logo images to render and convert API responses from strings to numbers so I could utilize sorting methods.  

View it live here: https://wjfletch26.github.io/crypto-tracker/
