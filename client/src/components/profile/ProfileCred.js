import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCred extends Component {
  render() {
    const { experience, education } = this.props;
    const expItem = experience.map((exp) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <strong>{exp.title}</strong>
        </p>
        <p>
          {"From:     "}
          <Moment format="DD/MM/YYYY">{exp.from}</Moment>
          {" - "}
          {exp.to === null ? (
            "  Now"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </p>
       
        <p>{exp.location === "" ? null : exp.location}</p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Description: </strong>
              {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItem = education.map((edu) => (
      <li key="edu._id" className="list-group-item">
        <h4>{edu.school}</h4>
        <h4>{edu.degree}</h4>
        <h6>{edu.fieldofstudy}</h6>
        <p>
          {"From:     "}
          <Moment format="DD/MM/YYYY">{edu.from}</Moment>
          {" - "}
          {edu.to === null ? (
            "  Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description: </strong>
              {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6 mb-3">
          <h3 className="text-center text-info">Experience</h3>
          {expItem.length > 0 ? (
            <ul className="list-group">{expItem}</ul>
          ) : (
            <p className="text-center text-muted">
              this loser has no experience
            </p>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <h3 className="text-center text-info">Education</h3>
          {eduItem.length > 0 ? (
            <ul className="list-group">{eduItem}</ul>
          ) : (
            <p className="text-center text-muted">
              this loser has no Education
            </p>
          )}
        </div>
      </div>
    );
  }
}
export default ProfileCred;
