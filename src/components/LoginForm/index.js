import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
// eslint-disable-next-line no-unused-vars
import Home from '../Home'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="password-label" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          className="password-input-field"
          id="password"
          type="password"
          onChange={this.onChangePassword}
          placeholder="Password"
          value={password}
        />
      </>
    )
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="user-label-name" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          className="user-input-field"
          id="username"
          placeholder="Username"
          onChange={this.onChangeUsername}
          type="text"
          value={username}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="login-card">{this.renderUsername()}</div>
            <div className="password-card">{this.renderPassword()}</div>
            <button className="button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
