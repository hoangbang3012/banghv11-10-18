import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
      this.state = {
        fields: {},
        errors: {}
      }
  }
  handleValidation(field){
    let fields = this.state.fields;
    let errors = this.state.errors;
    let formIsValid = true;


    if(!field || field==="name"){
      errors.name = [];
      //Validate Name
      if(!fields["name"]){
        formIsValid = false;
        errors["name"].push("Để trống cc à!");
      }else{
        formIsValid = false;
        if(fields["name"].length > 160){
          errors["name"].push("Viết dưới 160 từ thôi!");
        }
        if(fields["name"].length < 8){
          errors["name"].push("Viết nhiều chữ lên đi!")
        }
        if(fields["name"].indexOf(' ') >= 0){
          errors["name"].push("Viết liền vào đê !")
        }
        let pattern = /(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_]))+/gm;
        if(!pattern.test(fields["name"])) {
            errors["name"].push("Phải bao gồm cả chữ và số, _ hoặc -");
        }

      }

    }
if(!field || field==="email"){
    errors.email = [];
    if(!fields["email"]){
      formIsValid = false;
      errors["email"].push("Để trống cc à!");
    }else{
      formIsValid = false;
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(fields["email"])){
        errors["email"].push("Méo đúng định dạng email!")
      }    
    }
  }

if(!field || field==="phone"){
    errors.phone = [];
    console.log(fields["phone"]);
    if(!fields["phone"]){
      formIsValid = false;
      errors["phone"].push("Để trống cc à!");
    }else{
      formIsValid = false;
      if(fields["phone"].length == 10){
        let phone = /((84|09)+([0-9]{8}))+/gm;
        if(!phone.test(fields["phone"])){
          errors["phone"].push("Không đúng định dạng");
        }
      }else if(fields["phone"].length == 11){
        let phone = /((84|01[2|6|9])+([0-9]{8}))+/gm;
        if(!phone.test(fields["phone"])){
          errors["phone"].push("Không đúng định dạng");
        }
      }
      else{
        errors["phone"].push("Không đúng định dạng");
      }
      
    }
  }

  if(!field || field==="address"){
    errors.address = [];
    if(!fields["address"]){
      formIsValid = false;
      errors["address"].push("Để trống cc à!");
    }
  }

  if(!field || field==="password"){
    errors.password = [];
    if(!fields["password"]){
      formIsValid = false;
      errors["password"].push("Để trống cc à!");
    }else{
      if(fields["password"].length > 20 ){
        formIsValid = false;
        errors["password"] .push("Viết dưới 20 từ thôi!");
      }
      if(fields["password"].length < 6){
        formIsValid = false;
        errors["password"].push("Viết nhiều chữ lên đi!")
      }
      let pass = /(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}))+/gm;
      if(!pass.test(fields["password"])){
        formIsValid = false;
         errors["password"].push("Phải bao gồm chữ, số, ký tự đặc biệt, hoa thường");
      }
    }
  }

  if(!field || field==="repassword"){
    errors.repassword = [];
    if(!fields["repassword"]){
      formIsValid = false;
      errors["repassword"].push("Để trống cc à!");
    }
    else{
      if(fields["repassword"] != fields["password"]){
        formIsValid = false;
        errors["repassword"].push("Méo trùng");
      }
    }
  }
  console.log("acv", errors);
    this.setState({
      errors: errors,
      formIsValid: formIsValid
    })

  }

  /*contactSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
           alert("Form submitted");

        }else{
          //alert("Form has errors.")
        }

    }*/

  handleChange(field, e){
    //console.log(e.target.value);
    let fields = this.state.fields;
    let errors = this.state.errors;
    delete errors[field];
    fields[field]  = e.target.value;
    this.setState({
      fields: fields, 
      errors  
    })
  }
  disablesbtn = ()=>{
    if(!this.state.fields.name || !this.state.fields.email || !this.state.fields.address || !this.state.fields.phone || !this.state.fields.password || !this.state.fields.repassword) {
      return true;
    }else{
      let errors = this.state.errors;
      if(errors.name && errors.name.length > 0){
        return true;
      }else if(errors.email && errors.email.length > 0){
        return true;
      }else if(errors.address && errors.address.length > 0){
        return true;
      }else if(errors.phone && errors.phone.length > 0){
        return true;
      }else if(errors.password && errors.password.length > 0){
        return true;
      }else if(errors.repassword && errors.repassword.length > 0){
        return true;
      }
    }
    return false;
  }

  render() {
    //console.log("fuck----", this.state.errors);
    console.log("fuck----", this.disablesbtn());
    return (
      <div className="main">

        <div className="container">
            <div className="signup-content">
                <form  className="signup-form" >
                    <h2>Sign up </h2>
                    <div className="form-group">
                        <input
                          type="text"
                          className="form-input"
                          name="name"
                          placeholder="Your Name"
                          onChange={this.handleChange.bind(this, "name")}
                          onBlur={this.handleValidation.bind(this, "name")}
                          value={this.state.fields["name"]}
                        />
                        {this.state.errors.name && this.state.errors.name.map((item, index) => 
                          {return <span key={index} className="dpl-error">{item}</span>;}
                        )}
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" name="email" placeholder="Email" onBlur={this.handleValidation.bind(this, "email")} onChange={this.handleChange.bind(this,"email")} value={this.state.fields["email"]}/>
                        {this.state.errors.email && this.state.errors.email.map((item, index) => 
                          {return <span key={index} className="dpl-error">{item}</span>;}
                        )}
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" name="phone"  placeholder="Phone number" onBlur={this.handleValidation.bind(this, "phone")} onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}/>
                         {this.state.errors.phone && this.state.errors.phone.map((item, index) => 
                          {return <span key={index} className="dpl-error">{item}</span>;}
                         )}
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" name="address" placeholder="Address" onBlur={this.handleValidation.bind(this, "address")} onChange={this.handleChange.bind(this, "address")} value={this.state.fields["address"]}/>
                        {this.state.errors.address && this.state.errors.address.map((item, index) => 
                          {return <span key={index} className="dpl-error">{item}</span>;}
                         )}
                    </div>
                    <div className="form-group dpl-flex">
                      <div className="mgr30">
                       <label>
                          <input
                            type="radio"
                            value="male"
                            name ="male"
                            //checked={this.state.size === "male"}
                            onChange={this.handleChange.bind(this, "male")}
                          />
                          Large
                        </label>
                      </div>
                       
                      <div>
                        <label>
                            <input
                              type="radio"
                              value="female"
                              name ="female"
                             // checked={this.state.size === "female"}
                              onChange={this.handleChange.bind(this, "female")}
                            />
                            Female
                          </label>
                      </div>
                      
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-input" name="password" placeholder="Password" onBlur={this.handleValidation.bind(this, "password")} onChange={this.handleChange.bind(this, "password")}/>
                        {this.state.errors.password && this.state.errors.password.map((item, index) =>
                          {return <span key={index} className="dpl-error">{item}</span>;}
                        )}
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-input" name="repassword" placeholder="Confirm password" onBlur={this.handleValidation.bind(this, "repassword")}  onChange={this.handleChange.bind(this, "repassword")}/>
                        {this.state.errors.repassword && this.state.errors.repassword.map((item, index) => 
                          {return <span key={index} className="dpl-error">{item}</span>;}
                        )}
                    </div>
                    <div className="form-group">
                        <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                        <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements</label>
                    </div>
                    <div className="form-group">
                        <button /*onClick={this.contactSubmit.bind(this)}*/ className={(this.disablesbtn() ? "form-submit submit disabled" : "form-submit submit")}  value="" >Sign up</button>
                        <a href="#" className="submit-link submit">Sign in</a>
                    </div>
                </form>
            </div>
        </div>

    </div>
    );
  }
}

export default App;
