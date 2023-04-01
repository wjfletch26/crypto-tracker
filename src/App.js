import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
// import Coin from './Coin'
import Table from 'react-bootstrap/Table'
import _, { get } from 'lodash'
// import { getCryptoMarketData } from './utils'
// import { getCryptoMarketData } from './utils'



function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')


  // useEffect(() => {
  //   let marketData = getCryptoMarketData()

  //   setCoins(marketData)
  //   console.log(marketData)
  //   console.log(coins)

  // }, [coins])

  // api.coincap.io/v2/markets
  // b3c0dc2f-8162-46cc-96f2-9669b9141d18

  // const getTheData = async () => {
  //   const res = axios.get('https://api.coincap.io/v2/markets', {
  //     headers: {
  //       Authorization: 'Bearer b3c0dc2f-8162-46cc-96f2-9669b9141d18',
  //       'Accept-Encoding': 'gzip',
  //     },
  //   });
  //   const { data } = await res;
  //   setCoins(data)
  //   console.log(data)
  //   return data
  //   // setCoins(data)
  //   // console.log(data)
  // }


  useEffect(() => {
    // getTheData()

    axios.get('https://api.coincap.io/v2/assets', {
      headers: {
        Authorization: 'Bearer b3c0dc2f-8162-46cc-96f2-9669b9141d18',
        'Accept-Encoding': 'gzip',
      },
    }).then(res => {
      const json = res.data
      const { data } = json
      setCoins(data)
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
              <th className='col-sm-2'>Price Change</th>
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
                  <td className='table-text'>{moneyFormat(Number(coin.priceUsd))} </td>
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