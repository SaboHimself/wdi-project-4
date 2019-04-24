import React from 'react'
import Plot from 'react-plotly.js'
import moment from 'moment'

class BalanceGraph extends React.Component{
  constructor(){
    super()
    this.state = {
      type: 'scatter',
      mode: 'lines',
      fill: 'tonexty'
    }
    this.sortTransactionTimestamps = this.sortTransactionTimestamps.bind(this)

    this.layout = {
      font: {
        family: 'arial, monospace',
        size: 10,
        color: 'white'
      },
      paper_bgcolor: '#1e2125',
      plot_bgcolor: '#1e2125',

      dragmode: 'zoom',
      margin: {
        r: 15,
        t: 15,
        b: 35,
        l: 25
      },
      showlegend: false,
      xaxis: {
        fixedrange: true,
        showgrid: false,
        autorange: true,
        domain: [0, 1],
        type: 'date',
        zeroline: false
      },
      yaxis: {
        fixedrange: true,
        showlegend: false,
        showgrid: false,
        autorange: true,
        domain: [0, 1],
        type: 'linear',
        zeroline: false
      },
      autosize: true
    }
  }

  sortTransactionTimestamps() {
    const sorted = this.props.transactionRequest.sort((a, b) => {
      if (moment(a.timestamp) > moment(b.timestamp)) return 1
      return - 1
    })
    const y = sorted.map(transaction => transaction.end_of_day_balance)
    const x = sorted.map(transaction => transaction.timestamp)
    this.setState({y, x})
  }

  componentDidMount() {
    this.sortTransactionTimestamps()
  }

  render(){
    return(
      <div>
        <div>
          <div>
            {this.state.x &&
          <Plot
            useResizeHandler
            style={{height: '100%', width: '100%'}}
            data={[this.state]}
            layout={this.layout}
          />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default BalanceGraph
