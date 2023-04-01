import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import _ from 'lodash'



function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {

    axios.get('https://api.coincap.io/v2/assets', {
      headers: {
        Authorization: 'Bearer b3c0dc2f-8162-46cc-96f2-9669b9141d18',
        'Accept-Encoding': 'gzip',
      },
    }).then(res => {
      const json = res.data
      const { data } = json
      /// take data array and for each object (crypto), convert price from a string to a number 
      // create a new array with the price as an integer/number
      // so that...it will now have each item with priceUsd: 600 instead of saying priceUsd: "600" so we can sort by price more easily
      const fixedData = data.map((obj, i) => ({ ...obj, priceUsd: Number(obj.priceUsd), changePercent24Hr: Number(obj.changePercent24Hr) }));
      // console.log("THIS IS THE FIXED DATA")
      console.log(fixedData)
      setCoins(fixedData)
      // console.log(data)
    }).catch(error => console.log(error))


  }, [])


  const handleChange = e => {
    setSearch(e.target.value)
  }
  const filteredCoins = coins.length && coins.filter(coin =>
    coin.id.toLowerCase().includes(search.toLowerCase())
  )

  const sortLowPrice = () => {
    const lowToHigh = _.orderBy(coins, ['priceUsd'], ['asc', 'desc'])
    setCoins(lowToHigh)
  }

  const sortHighPrice = () => {
    const highToLow = _.orderBy(coins, ['priceUsd'], ['desc', 'asc'])
    setCoins(highToLow)
  }

  const sortByPercentChangeLow = () => {
    const lowToHigh = _.orderBy(coins, ['changePercent24Hr'], ['asc', 'desc'])
    setCoins(lowToHigh)
  }

  const sortByPercentChangeHigh = () => {
    const lowToHigh = _.orderBy(coins, ['changePercent24Hr'], ['desc', 'asc'])
    setCoins(lowToHigh)
  }

  // Create our number formatter.
  const moneyFormat = (price) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  }).format(price)


  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search your desired coin</h1>
        <form action="">
          <input type="text" className="coin-input" placeholder="Provide the coin name" onChange={handleChange} />

        </form>

      </div>
      <div className='container'>
        <Table variant='dark' bordered hover responsive>
          <thead>
            <tr>
              <th className='table-img col-sm-1'></th>
              <th className='col-sm-2'>Ticker</th>
              <th className='col-sm-2'>Coin Name</th>
              <th className='col-sm-3'>Price <button style={{ marginLeft: '20px', padding: '5px' }} onClick={sortHighPrice}> ^ </button> <button style={{ marginLeft: '20px', padding: '5px' }} onClick={sortLowPrice}> v </button></th>
              <th className='col-sm-2'>Price Change  <button style={{ marginLeft: '20px', padding: '5px' }} onClick={sortByPercentChangeHigh}> ^ </button> <button style={{ marginLeft: '20px', padding: '5px' }} onClick={sortByPercentChangeLow}> v </button></th>
              <th className='col-sm-2'>Rank</th>
            </tr>
          </thead>
          <tbody>

            {filteredCoins && filteredCoins.map(coin => {
              return (
                <tr key={coin.id}>
                  <td className='table-img col-sm-1'>
                    <img alt="" src={'https://assets.coincap.io/assets/icons/' + coin.symbol.toLowerCase() + '@2x.png'} />
                  </td>
                  <td className='table-text'>{coin.symbol}</td>

                  <td className='table-text'>{coin.id}</td>
                  <td className='table-text'>{moneyFormat(coin.priceUsd)} </td>
                  <td className={`${Number(coin.changePercent24Hr) > 0 ? 'green-text' : 'red-text'}`}>{Number(coin.changePercent24Hr).toFixed(2)} %</td>
                  <td className='table-text'>{coin.rank}</td>
                </tr>

              )
            })}

          </tbody>
        </Table>
      </div>



    </div >
  )
}

export default App