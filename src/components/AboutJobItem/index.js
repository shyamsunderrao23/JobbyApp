import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobs from '../similarJobs'
import './index.css'

const apiJobItemStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    jobDataDetails: [],
    similarJobsData: [],
    apiStatus: apiJobItemStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  // eslint-disable-next-line no-unused-vars
  getJobData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiJobItemStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobData = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const responseJobData = await fetch(jobDetailsApiUrl, optionsJobData)
    if (responseJobData.ok === true) {
      const fetchedJobData = await responseJobData.json()
      const UpdatedJobDetailsData = [fetchedJobData.job_details].map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          companyWebsiteUrl: eachItem.company_website_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          lifeAtCompany: {
            description: eachItem.life_at_company.description,
            imageUrl: eachItem.life_at_company.image_url,
          },
          skills: eachItem.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          title: eachItem.title,
        }),
      )

      const UpdatedSimilarJobsDetails = fetchedJobData.similar_jobs.map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        }),
      )
      this.setState({
        jobDataDetails: UpdatedJobDetailsData,
        similarJobsData: UpdatedSimilarJobsDetails,
        apiStatus: apiJobItemStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiJobItemStatusConstants.failure,
      })
    }
  }

  onRenderJobDetailsSuccessView = () => {
    const {jobDataDetails, similarJobsData} = this.state
    if (jobDataDetails.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        // eslint-disable-next-line no-unused-vars
        id,
        jobDescription,
        location,
        packagePerAnnum,
        rating,
        lifeAtCompany,
        skills,
        title,
      } = jobDataDetails[0]
      return (
        <>
          <div className="about-job-item-container">
            <div className="about-job-first-container">
              <div className="about-job-company-logo-container">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
                <div className="company-name-and-rating-card">
                  <h1 className="about-job-company-title">{title}</h1>
                  <div className="rating-card">
                    <AiFillStar className="rating-star-icon" />
                    <p className="company-rating">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-empType-package-container">
                <div className="location-and-empType-card">
                  <MdLocationOn className="about-job-company-location-icon" />
                  <p className="about-job-company-location">{location}</p>
                  <MdWork className="about-job-company-work-type-icon" />
                  <p className="about-job-company-work-type">
                    {employmentType}
                  </p>
                </div>
                <p className="about-job-company-package">{packagePerAnnum}</p>
              </div>
              <hr className="hr-line" />
              <div className="about-job-second-part-container">
                <div className="description-and-visit-container">
                  <h1 className="about-job-description-heading">Description</h1>
                  <a className="company-link" href={companyWebsiteUrl}>
                    Visit <FiExternalLink className="link-icon" />
                  </a>
                </div>
                <p className="about-job-company-description">
                  {jobDescription}
                </p>
              </div>
              <div className="skills-container">
                <h1 className="skills-heading">Skills</h1>
                <ul className="about-ul-skills-container">
                  {skills.map(eachSkill => (
                    <li
                      className="about-job-each-skill-item"
                      key={eachSkill.name}
                    >
                      <img
                        src={eachSkill.imageUrl}
                        alt={eachSkill.name}
                        className="skill-logo"
                      />
                      <p className="skill-name">{eachSkill.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="company-life-img-container">
                <h1 className="company-life-heading">Life at Company</h1>
                <div className="company-life-description-and-image-card">
                  <p className="company-life-description">
                    {lifeAtCompany.description}
                  </p>
                  <img
                    src={lifeAtCompany.imageUrl}
                    alt="life-at-company"
                    className="company-life-image"
                  />
                </div>
              </div>
            </div>
            <h1 className="similar-jobs-heading">Similar Jobs</h1>
            <ul className="similar-jobs-ul-container">
              {similarJobsData.map(eachItem => (
                <SimilarJobs
                  key={eachItem.id}
                  similarJobsData={eachItem}
                  employmentType={employmentType}
                />
              ))}
            </ul>
          </div>
        </>
      )
    }
    return null
  }

  onRetryJobsDetails = () => {
    this.getJobData()
  }

  onRenderJobDetailsFailureView = () => (
    <div className="jobs-data-failure-view-container">
      <img
        src=" https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onRetryJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  RenderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRenderJobDetailsStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiJobItemStatusConstants.success:
        return this.onRenderJobDetailsSuccessView()
      case apiJobItemStatusConstants.failure:
        return this.onRenderJobDetailsFailureView()
      case apiJobItemStatusConstants.inProgress:
        return this.RenderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">
          {this.onRenderJobDetailsStatus()}
        </div>
      </>
    )
  }
}

export default AboutJobItem
