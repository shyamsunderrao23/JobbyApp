import './index.css'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

const SimilarJobs = props => {
  const {similarJobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    // eslint-disable-next-line no-unused-vars
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsData

  return (
    <li className="similar-jobs-li-container">
      <div className="img-and-company-rating-card">
        <img
          src={companyLogoUrl}
          alt="similar jobs company logo"
          className="similar-jobs-company-image"
        />
        <div className="company-name-and-rating-card">
          <h1 className="similar-job-company-title">{title}</h1>
          <div className="rating-card">
            <AiFillStar className="star-icon" />
            <p className="company-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="description-container">
        <h1 className="similar-description-heading">Description</h1>
        <p className="similar-job-company-description">{jobDescription}</p>
      </div>
      <div className="location-and-emp-type-container">
        <div className="card">
          <MdLocationOn className="location-icon" />
          <p className="similar-job-company-location">{location}</p>
        </div>
        <div className="card">
          <MdWork className="empType-icon" />
          <p className="similar-job-empType-heading">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
