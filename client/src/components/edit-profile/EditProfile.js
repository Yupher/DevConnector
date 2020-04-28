import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import isEmpty from '../../validation/is-empty'

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      github: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      youtube: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
   componentDidMount() {
    this.props.getCurrentProfile();
  } 

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skills = profile.skills.join(",");

       profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.github = !isEmpty(profile.github) ? profile.github : "";

      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : ""; 

      this.setState({
        handle: profile.handle,
        company: profile.company,
        location: profile.location,
        status: profile.status,
        website: profile.website,
        github: profile.github,
        bio: profile.bio,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        instagram: profile.social.instagram,
        youtube: profile.social.youtube,
        linkedin: profile.social.linkedin,
        skills,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      github:this.state.github,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      youtube: this.state.youtube,
    };
    this.props.createProfile(profileData, this.props.history);
  }
  onChange = (e) => {
    this.setState({  
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInput;
    if (displaySocialInputs) {
      socialInput = (
        <div>
          <InputGroup
            placeholder="Twitter"
            name="twitter"
            icon="fa fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook"
            name="facebook"
            icon="fa fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Instagram"
            name="instagram"
            icon="fa fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Youtube"
            name="youtube"
            icon="fa fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="LinkedIn"
            name="linkedin"
            icon="fa fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </div>
      );
    }
    const options = [
      { label: "Select your professional status *", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Student", value: "Student" },
      { label: "Manager", value: "Manager" },
      { label: "Business owner", value: "Business owner" },
      { label: "Intern", value: "Intern" },
      { label: "Instructor", value: "Instructor" },
      { label: "other", value: "other" },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>

              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">Fields with * are required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="handle *"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="unique handle for your profile as company name, full name ...."
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="select  your current career status"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="leave it blank if you are not an employee or you do not own a company"
                />
                <TextFieldGroup
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="leave it blank if you do not own a website"
                />
                <TextFieldGroup
                  placeholder="location"
                  name="location"
                  value={this.state.location }
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder="skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="use comma separated value (eg: HTML,CSS,JavaScript)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="github"
                  value={this.state.github}
                  onChange={this.onChange}
                  error={errors.github}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInput}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4 mb-2"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
