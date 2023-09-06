import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiProfileStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const failureView = 'https://assets.ccbp.in/frontend/react-js/failure-img.png'

class AllJobs extends Component {
  state = {
    apiProfileData: [],
    apiJobsData: [],
    checkBoxInput: [],
    SearchInput: '',
    radioInput: '',
    apiProfileStatus: apiProfileStatusConstants.initial,
    apiJobsStatus: apiJobsStatusConstants.initial,
  }

  componentDidMount = () => {
    this.onGetProfileDetails()
    this.onGetJobsDetails()
  }

  onGetProfileDetails = async () => {
    this.setState({apiProfileStatus: apiProfileStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    // eslint-disable-next-line no-unused-vars
    const {checkBoxInput, radioInput, SearchInput} = this.state
    const apiProfileUrl = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(apiProfileUrl, optionsProfile)

    if (profileResponse.ok === true) {
      const fetchedDataProfile = [await profileResponse.json()]
      const updatedProfileData = fetchedDataProfile.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        apiProfileData: updatedProfileData,
        responseSuccess: true,
        apiProfileStatus: apiProfileStatusConstants.success,
      })
    } else {
      this.setState({
        apiProfileStatus: apiProfileStatusConstants.failure,
      })
    }
  }

  onGetJobsDetails = async () => {
    this.setState({apiJobsStatus: apiJobsStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkBoxInput, radioInput, SearchInput} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInput}&minimum_package=${radioInput}&search=${SearchInput}`
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const jobsResponse = await fetch(jobsApiUrl, optionsJobs)
    if (jobsResponse.ok === true) {
      const fetchedDataJobs = await jobsResponse.json()
      const UpdatedDataJobs = fetchedDataJobs.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        apiJobsData: UpdatedDataJobs,
        apiJobsStatus: apiJobsStatusConstants.success,
      })
    } else {
      this.setState({apiJobsStatus: apiJobsStatusConstants.failure})
    }
  }

  onGetRadioOptions = event => {
    this.setState({radioInput: event.target.id}, this.onGetJobsDetails)
  }

  onGetCheckBoxInputOptions = event => {
    const {checkBoxInput} = this.state
    const InputNotInList = checkBoxInput.filter(
      eachItem => eachItem === event.target.id,
    )

    if (InputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkBoxInput: [...prevState.checkBoxInput, event.target.id],
        }),
        this.onGetJobsDetails,
      )
    } else {
      const filteredData = checkBoxInput.filter(
        eachItem => eachItem !== event.target.id,
      )

      this.setState(
        // eslint-disable-next-line no-unused-vars
        prevState => ({checkBoxInput: filteredData}),
        this.onGetJobsDetails,
      )
    }
  }

  onGetProfileView = () => {
    const {apiProfileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = apiProfileData[0]
      return (
        <div className="profile-container">
          <img src={profileImageUrl} alt={name} className="profile-logo" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.onGetProfileDetails()
  }

  onGetProfileFailureView = () => (
    <div className="profile-failure-view-container">
      <button
        className="failure-btn"
        type="button"
        onClick={this.onRetryProfile}
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

  onRenderProfileStatus = () => {
    const {apiProfileStatus} = this.state

    switch (apiProfileStatus) {
      case apiProfileStatusConstants.success:
        return this.onGetProfileView()
      case apiProfileStatusConstants.failure:
        return this.onGetProfileFailureView()
      case apiProfileStatusConstants.inProgress:
        return this.RenderLoadingView()
      default:
        return null
    }
  }

  onRetryJobs = () => {
    this.onGetJobsDetails()
  }

  onGetJobsFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src={failureView}
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
        onClick={this.onRetryJobs}
      >
        Retry
      </button>
    </div>
  )

  onGetJobsView = () => {
    const {apiJobsData} = this.state
    const noJobs = apiJobsData.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-heading">No jobs found</h1>
        <p className="no-jobs-paragraph">
          We could not find any jobs. Try other filters..
        </p>
      </div>
    ) : (
      <ul className="ul-jobs-item-container">
        {apiJobsData.map(eachItem => (
          <JobItem key={eachItem.id} jobsDetails={eachItem} />
        ))}
      </ul>
    )
  }

  onRenderJobsStatus = () => {
    const {apiJobsStatus} = this.state
    switch (apiJobsStatus) {
      case apiJobsStatusConstants.success:
        return this.onGetJobsView()
      case apiJobsStatusConstants.failure:
        return this.onGetJobsFailureView()
      case apiJobsStatusConstants.inProgress:
        return this.RenderLoadingView()
      default:
        return null
    }
  }

  onGetCheckBoxView = () => (
    <ul className="check-box-container">
      {employmentTypesList.map(eachItem => (
        <li className="list-container" key={eachItem.employmentTypeId}>
          <input
            className="input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onGetCheckBoxInputOptions}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioButtonsView = () => (
    <ul className="radio-buttons-container">
      {salaryRangesList.map(eachItem => (
        <li className="list-container" key={eachItem.salaryRangeId}>
          <input
            className="radio"
            id={eachItem.salaryRangeId}
            type="radio"
            name="action"
            onChange={this.onGetRadioOptions}
          />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onSearchInput = event => {
    this.setState({SearchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.onGetJobsDetails()
  }

  onEnterSearchInput = event => {
    if (event === 'Enter') {
      this.onGetJobsDetails()
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {checkBoxInput, radioInput, SearchInput} = this.state
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="side-bar-container">
            {this.onRenderProfileStatus()}
            <hr className="line" />
            <h1 className="text">Types of Employment</h1>
            {this.onGetCheckBoxView()}
            <hr className="line" />
            <h1 className="text">Salary Range</h1>
            {this.onGetRadioButtonsView()}
          </div>
          <div className="jobs-container">
            <div className="search-card">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={SearchInput}
                onChange={this.onSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                className="search-btn-logo"
                data-testid="searchButton"
                type="button"
                onClick={this.onSubmitSearchInput}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            <div className="jobs-cards">{this.onRenderJobsStatus()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default AllJobs
