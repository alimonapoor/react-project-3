import React , { Component } from 'react'
import Header from './sections/Header'
import { Route , Switch } from 'react-router-dom'
import axios from 'axios'

//Components
import Home from './../components/Pages/Home';
import About from './../components/Pages/About';
import Contact from './../components/Pages/Contact';
import Product from './../components/Pages/Product'
import NoMatch from './../components/Pages/NoMatch'
import Login from './../components/Pages/Login'
import UserPanel from './../components/Pages/UserPanel'
import PrivateRoute from './PrivateRoute '

//styles
import '../styles/css/bootstrap.min.css'
import '../styles/css/bootstrap-rtl.min.css'


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated : true
    }
  }

  componentDidMount() {
    let apiToken = localStorage.getItem('api_token')
    if(apiToken !== null ) {
      axios.get(`http://roocket.org/api/user?api_token=${apiToken}`)
                .then(response =>{
                      this.setState({ isAuthenticated : true})
                })
                .catch(error => {
                      this.setState({ isAuthenticated : false})
                })
    } else {
          this.setState({ isAuthenticated :false})
    }
  }

  handleLogout() {
    localStorage.removeItem('api_token')
    this.setState( { isAuthenticated : false})
  }

  handleLogin() {
    this.setState({ isAuthenticated : true})
  }

  render(){
    return(
        <div>
          <Header auth={this.state.isAuthenticated} logout={this.handleLogout.bind(this)} />
              <div className="container">
                  <div style={{ paddingTop:70 }} >
                  <Switch>
                    <Route path="/" exact={true} component={ Home } />
                    <Route path="/Product/:id" component={ Product } />
                    <Route path="/about" component={ About } />
                    <Route path="/contact" component={ Contact} />
                    <Route path="/login" render = {(props) => <Login {...props} auth ={this.state.isAuthenticated} login = {this.handleLogin.bind(this)}/>} />
                    <Route  component={ NoMatch} />
                    <PrivateRoute path="/user-panel" component={ UserPanel } auth={this.state.isAuthenticated}/>
                  </Switch>
                  </div>
              </div>
        </div>
    )
  }
}