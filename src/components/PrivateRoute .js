import React , { Component } from 'react'
import PropTypes from 'prop-types'
import { Route ,Redirect } from 'react-router-dom';


export default class PrivateRoute extends Component  {

  static propTypes = {
    component : PropTypes.func.isRequired,
    path : PropTypes.string.isRequired
  }

  render () {
    const { component : Component , auth : isAuthenticated, ...restProps} = this.props
    return <Route { ...restProps} render ={(props) => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname : '/login' , state : { from : props.location} }}/>
      )
    )} />
  }
}