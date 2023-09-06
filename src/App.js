import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import AllJobs from './components/AllJobs'
import JobItem from './components/AboutJobItem'
import ProtectedRoute from './components/ProtectedRoute'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={AllJobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
