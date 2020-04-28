import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      email2: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashbord");
    }
  }
  /*componentWillReceiveProps(nextProp) {
    if (nextProp.errors) {
      this.setState({ errors: nextProp.errors });
    }
  }*/
  static getDerivedStateFromProps(nextProps,prevState){
    if(nextProps.errors !== prevState.errors){
      return {errors: nextProps.errors}
    }
    return null
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      email2: this.state.email2,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info = 'this site uses garavatar, if you want a profile image use a gravatar email'
                />
                <TextFieldGroup
                  type="email"
                  name="email2"
                  placeholder="Confirm Email"
                  value={this.state.email2}
                  onChange={this.onChange}
                  error={errors.email2}
                />
                <TextFieldGroup
                type='password'
                name= 'password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                />
                <TextFieldGroup
                type='password'
                name= 'password2'
                placeholder='Confirm Password'
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4 mb-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
