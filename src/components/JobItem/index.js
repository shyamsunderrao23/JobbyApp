import {Link} from 'react-router-dom'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobItem = props => {
  const {jobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsDetails
  return (
    <Link to={`jobs/${id}`} className="link-item">
      <li className="jobs-item-container">
        <div className="first-part-container">
          <div className="image-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="company-name-and-details">
              <h1 className="company-heading">{title}</h1>
              <div className="company-rating-container">
                <AiFillStar className="star-icon" />
                <p className="company-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-empType-package-container">
            <div className="location-and-empType-card">
              <div className="location-card">
                <MdLocationOn className="location-icon" />
                <p className="company-location">{location}</p>
              </div>
              <div className="work-type">
                <MdWork className="work-icon" />
                <p className="company-empType">{employmentType}</p>
              </div>
            </div>
            <p className="company-package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="second-part-container">
          <h1 className="description-heading">Description</h1>
          <p className="description-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
