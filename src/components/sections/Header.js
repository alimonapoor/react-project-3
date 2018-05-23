import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import NavItem  from '../NavItem'



class Header extends Component {
  render() {
      const { auth : isAuthenticated } = this.props
    return(
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container">
          <div className="navbar-header">
              <Link className="navbar-brand" to="/">Project name</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
              <ul className="mr-auto navbar-nav">
                  <NavItem activeOnlyWhenExact={true} activeClassName="selected" to="/">Home</NavItem>
                  <NavItem to="/about">About</NavItem>
                  <NavItem to="/contact">Contact</NavItem>
              </ul>
              <div className="my-2  my-lg-0">
              {
                  isAuthenticated ? (
                      <div>
                          <Link className = "btn btn-success" to ="/UserPanel">User Panel </Link>
                          <button className="btn btn-warning" style={{ marginLeft : 10}} onClick={this.props.logout}>LogOut</button>
                      </div>    
                  ) : (
                    <Link className="btn btn-success" to="/login">Login</Link>
                  )
              }
                   
              </div>      
          </div>
      </div>
  </nav>
    )
  }
}

export default Header