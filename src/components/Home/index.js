import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickJobBtn = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="heading">
            Find The Job That <br />
            Fits Your Life
          </h1>
          <p className="description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs" className="btn-link">
            <button
              className="jobs-button"
              type="button"
              onClick={onClickJobBtn}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
