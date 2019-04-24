import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: {name, value}}) {
    const data ={...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)

      }).then(() => this.props.history.push('/'))
      .catch(() =>  {
        this.setState({ error: 'Invalid Credentials'})
      })
  }

  render() {
    return(
      <div className="register container">
        <h2>Login</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className="row">
            <div className="twelve columns">
              <label htmlFor="email">Email</label>
              <input
                className="u-full-width"
                onChange={ this.handleChange }
                name="email"
                type="text"
                value={ this.state.data.email || ''}
                id="email"
              />
            </div>
            <div className="twelve columns">
              <label htmlFor="password">Password</label>
              <input
                className="u-full-width"
                onChange={ this.handleChange }
                type="password"
                name="password"
                value={ this.state.data.password || ''}
                id="password"
              />
            </div>
            <div className="row">
              <button className="six columns">Login</button>
              <p className="six columns">Not a member? <Link to='/register'>Register Here</Link></p>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
