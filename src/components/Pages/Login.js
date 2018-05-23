import React , { Component } from 'react'
import validator from 'validator'
import axios from 'axios'

export default class Login extends Component {

  constructor(props) {
    super(props)

    if(this.props.auth){
        this.props.history.push('/')
    }
    this.state={
        fields :{
          email : '' ,
          password : ''
        },
        errors : {}
    }
  }

  handleValidation(callback) {
   
      let { fields } = this.state
      let errors = {}
      let formIsValid = true


      //Email
      if(validator.isEmpty(fields.email)){
        formIsValid =false
        errors["email"] = "ایمیل نمی تواند خالی باشد"
      }
      else if (!validator.isEmail(fields.email)){
        formIsValid = false
        errors["email"] = "فرمت ایمیل معتبر نیست"
      }

        //Password
        if(validator.isEmpty(fields.password)){
          formIsValid =false
          errors["password"] = "پسورد نمی تواند خالی باشد"
        }
        else if (!validator.isLength(fields.password , {min:6 , max:undefined})){
          formIsValid = false
          errors["password"] = "تعداد پسورد نمی تواند کمتر از 6 کاراکتر باشد"
        }

        this.setState({errors} ,() =>{
          return callback( formIsValid )
        })
       

    }
  handleChange(e) {
      let fields =this.state.fields
      let target = e.target
      fields[target.name] = target.value
      this.setState({fields})
  }

  handleRequest() {
    const { email , password } = this.state.fields


    let data = new FormData()
    data.append('email' , email)
    data.append('password' , password)

    axios.post('http://roocket.org/api/login' , data)
      .then ( response => {
        localStorage.setItem('api_token' , response.data.data.api_token)
        this.props.login()
        this.props.history.push('/')
      })
      .catch(error =>{
        console.log(error)
      })
  }

  handleSubmit(e) {
      e.preventDefault()

      this.handleValidation((valid) =>{
          if(valid) this.handleRequest()
      })

      
  }

  render(){

    const { email , password} = this.state.fields
    const {errors} = this.state
     return(
       <div>
            <h2>Login Form </h2>
            <form onSubmit={this.handleSubmit.bind(this)} className="col-lg-5" style={{marginTop:20}}>
               <div className="form-group">
                     <label>Email : </label>
                     <input
                      type="text"
                      className={["form-control" , errors["email"] ? 'is-invalid' : ''].join(' ')}
                      name="email" 
                      value={email}
                      onChange={this.handleChange.bind(this)}
                      placeholder="please enter your email" />
                      <span className="invalid-feedback rtl" style={{ display : errors["email"] ? 'block' : 'none'}}>{errors["email"]}</span>
               </div>
               <div className="form-group">
                     <label>Password : </label>
                     <input
                     type="password"
                     className={["form-control" , errors["password"] ? 'is-invalid' : ''].join(' ')}
                     name="password" 
                     value={password}
                     onChange={this.handleChange.bind(this)}
                     placeholder="please enter your password" />
                      <span className="invalid-feedback rtl" style={{ display : errors["password"] ? 'block' : 'none'}}>{errors["password"]}</span>
               </div>
               <div className="form-group" >
                  <button className="btn btn-danger" type="submit">Login</button>
               </div>
            </form>
       </div>  
     )
  }
}