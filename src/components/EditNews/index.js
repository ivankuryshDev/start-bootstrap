import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";


class EditNews extends Component {

  titleStyle = {
    color: '#000'
  }



  render() {
    let {
      id,
      title,
      img,
      publish_on,
      publish_time,
      description,
      user_id,
      visibility
    } = this.props;
    // const { isEdited } = this.state;

    let content = (
      <tr className="odd gradeX" onClick={this.props.onToggleModal} style={{cursor: "pointer"}}>
        <td>{id}</td>
        <td>
          <Link style={this.titleStyle} to={{ pathname: "/onenews", state: { id: id } }}>{title}</Link>
        </td>
        <td>
         
        </td>
        <td>{publish_time}</td>
        <td style={{ minWidth: "35px" }}>{description}</td>
      </tr>
    );

    return content;
  }
}

export default EditNews;
