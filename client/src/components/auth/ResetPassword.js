import React, { Component } from "react";
import TextFieldGroup from '../common/TextFieldGroup'




class ResetPaswword extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const email = {
      email: this.state.email
    };
    console.log(email);
  }
  render() {
   // const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Reset password</h1>
              <p className="lead text-center">
                To reset Password enter your  correct email
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  //error={errors.email}
                 />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPaswword;
