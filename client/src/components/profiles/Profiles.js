import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import {getProfiles} from '../../actions/profileActions'
import ProfileItem from './ProfileItem'

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles()
  }
  render() {
    const {profiles, loading} = this.props.profile 
    let profileItem
    if(profiles === null || loading){
      profileItem = <Spinner />
    } else{
      if(profiles.length > 0){
        profileItem = profiles.map(profile=>(
          <ProfileItem key={profile._id} profile={profile} />
        )) 
      }else{
        profileItem = <h1> no profile found </h1>
      }
    }
    return (
      <div className='profiles'>
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h1 className="display-4 text-center">
                Dev Profiles
              </h1>
              <p className="lead text-center">
                connect with other devs
              </p>
              {profileItem}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
  profile: state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)