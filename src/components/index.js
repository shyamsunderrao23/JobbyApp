import './index.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="nav-content">
      <Link className="link" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="websites-logo"
        />
      </Link>

      <div className="card">
        <li className="nav-items-card">
          <Link to="/" className="link">
            <AiFillHome className="item-icon" />
            <p className="nav-item">Home</p>
          </Link>
          <Link to="/jobs" className="link">
            <MdWork className="item-icon" />
            <p className="nav-item">Jobs</p>
          </Link>
        </li>
        <FiLogOut className="item-icon" onClick={onClickLogout} />
        <button className="logout-btn" type="submit" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </ul>
  )
}
export default Header
