import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "67def4500da6fc5c66c4",
      clientSecret: "0c9a328e776f5c73e58d10e88e35ab170793dee8",
      count: 5,
      sort: "asc",
      repos: [],
    };
  }
  componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
    .then((res) => res.json())
    .then(data => {
      if(this.refs.myRef){
        this.setState({repos: data})
      } 
    })
    .catch(err => console.log(err))
  }
  render() {
    const {repos} = this.state
    const repoItem = repos.map(repo => (
      <div key={repo.id} className = 'card card-body mb-1'>
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className='text-info' target='_balnk' rel="noopener noreferrer">
                {repo.name}
              </Link>
            </h4>
            <p>
              {repo.description}
            </p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))
    return (
      <div ref='myRef'>
        <hr/>
        <h3 className="mb-4">Latest Github Repos</h3>
        <div className="mb-5">
          {repoItem}
        </div>
        
      </div>
    );
  }
}
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}
export default ProfileGithub;
