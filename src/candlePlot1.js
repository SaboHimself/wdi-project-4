import React from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'
import moment from 'moment'

class CandlePlot1 extends React.Component {
  constructor() {
    super()

    this.state = {
      x: [],
      close: [],
      decreasing: {line: {color: 'red'}},
      increasing: {line: {color: 'blue'}},
      high: [],
      low: [],
      open: [],
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
    }

    this.layout = {
      dragmode: 'zoom',
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        domain: [0, 1],
        range: ['2017-01-03 12:00', '2017-02-15 12:00'],
        rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        autorange: true,
        domain: [0, 1],
        range: [114.609999778, 137.410004222],
        type: 'linear'
      }
    }
  }

  componentDidMount() {
    axios
      .get('https://api.nomics.com/v1/candles?key=cfa361e67a06d9209da08f36a340410b', {
        params: {
          interval: '1d',
          currency: 'BTC',
          start: moment().subtract(30, 'days').format(),
          end: moment().format()
        }
      })
      .then(res => res.data.map(day => {
        this.setState({
          x: [...this.state.x, day.timestamp.slice(0, 10)],
          close: [...this.state.close, parseFloat(day.close)],
          high: [...this.state.high, parseFloat(day.high)],
          low: [...this.state.low, parseFloat(day.low)],
          open: [...this.state.open, parseFloat(day.close)]
        })
      }))
      .catch(err => console.log(err))
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

export default CandlePlot1
