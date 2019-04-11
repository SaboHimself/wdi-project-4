import React from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'
import moment from 'moment'

class TestGraph extends React.Component {
  constructor() {
    super()

    this.state = {
      x: [],
      close: [],
      decreasing: {line: {color: 'red'}},
      increasing: {line: {color: 'green'}},
      high: [],
      low: [],
      open: [],
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
    }

    this.layout = {
      font: {
        family: 'Courier New, monospace',
        size: 10,
        color: 'white'
      },
      paper_bgcolor: 'black',
      plot_bgcolor: 'black',
      dragmode: 'zoom',
      margin: {
        r: 10,
        t: 15,
        b: 10,
        l: 35
      },
      showlegend: false,
      xaxis: {
        showgrid: false,
        autorange: true,
        domain: [0, 1],
        range: ['2017-01-03 12:00', '2017-02-15 12:00'],
        type: 'date'
      },
      yaxis: {
        showlegend: false,
        showgrid: false,
        autorange: true,
        domain: [0, 1],
        range: [114.609999778, 137.410004222],
        type: 'linear'
      }
    }
  }

  componentDidMount() {
    axios
      .get('/api/transactions')
      .then(res => {
        return res.data.filter(transaction => {
          return transaction.coin.currency === 'BTC'
        })
      })
      .then(filteredByCoin => {
        console.log(filteredByCoin,'filtered')
        return filteredByCoin.reduce((acc, transaction) => {
          console.log('acc', transaction.sell_quantity)
          acc += (transaction.buy_quantity || 0) + (transaction.sell_quantity || 0)
        }, 0)
      })
      .then(totalQuantity => {
        console.log(totalQuantity, 'total')
        return

      })

      .then(() =>{
        axios
          .get('/api/nomics/candles', {
            params: {
              currency: 'BTC',
              start: moment().subtract(1000, 'days').format(),
              end: moment().format()
            }
          })
          .then(res => res.data.map(day => {
            this.setState({
              x: [...this.state.x, day.timestamp.slice(0, 10)],
              close: [...this.state.close, parseFloat(day.close)],
              high: [...this.state.high, parseFloat(day.high)],
              low: [...this.state.low, parseFloat(day.low)],
              open: [...this.state.open, parseFloat(day.open)]
            })
          }))
          .catch(err => console.log(err))
      })

  }

  render() {
    return (
      <div>
        {this.state.x &&
        <Plot
          data={[this.state]}
          layout={this.layout}
        />
        }
      </div>
    )
  }
}

export default TestGraph