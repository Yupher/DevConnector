import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addEducation} from '../../actions/profileActions'


class AddEducation extends Component {
  constructor(props){
    super(props)
    this.state = {
      degree:'',
      school:'',
      from:'',
      to:'',
      errors:{},
      fieldofstudy:'',
      description:'',
      disabled: false,
      current: false
    }
    this.onChange= this.onChange.bind(this)
    this.onSubmit= this.onSubmit.bind(this)
    this.onCheck= this.onCheck.bind(this)
  }
  static getDerivedStateFromProps(nextProps,prevState){
    if(nextProps.errors !== prevState.errors){
      return {errors: nextProps.errors}
    }
    return null 
  }
  onSubmit(e){
    e.preventDefault()
    const eduData = {
      degree: this.state.degree,
      school: this.state.school,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }
    this.props.addEducation(eduData,this.props.history)
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  onCheck(e){
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }
  render() {
    const {errors} = this.state
    return (
      <div className='add-experience'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className='btn btn-light'>Go Back</Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                here you can add your education information as dgree and stuff
              </p>
              <small className="d-block pb-3">
                fields with * are required
              </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='degree *'
                  name= 'degree'
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder='school *'
                  name= 'school'
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder='field of study *'
                  name= 'fieldofstudy'
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <div className="form-check mb-3">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id='current'
                    name='current'
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                  />
                  <label htmlFor="current" className="form-check-label">Current</label>
                </div>
                <h6 >from date *</h6>
                <TextFieldGroup
                  placeholder='from *'
                  type='date'
                  name= 'from'
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>to date</h6>
                <TextFieldGroup
                  placeholder='to *'
                  name= 'to'
                  type='date'
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled? 'disabled': ''}
                />
                <TextAreaFieldGroup
                  placeholder='description'
                  name= 'description'
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <input type="submit" value="Submit" className="btn btn-info btn-block my-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps,{addEducation})(withRouter(AddEducation))