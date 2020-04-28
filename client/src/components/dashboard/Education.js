import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation} from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }
  render() {
    const education = this.props.education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.degree}</td>
        <td>{edu.school}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>
          {"  -  "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h4 className="mb-4">Education credentials</h4>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>School</th>
                  <th>Field of study</th>
                  <th>Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{education}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};
export default connect(null, { deleteEducation })(Education);
