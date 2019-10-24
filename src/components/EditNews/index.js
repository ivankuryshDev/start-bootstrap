import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const NO_PHOTO_IMG = "https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png";

class EditNews extends Component {

  titleStyle = {
    color: '#000'
  }

  addDefaultSrc = (ev) => {
    if(!this.props.img){
      return ev.target.src = NO_PHOTO_IMG;
    }else{
      return ev.target.src = this.props.img;
    }
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
          <img
            src={!img ? this.src = NO_PHOTO_IMG : this.src = img}
            alt="some"
            height="42"
            width="42"
          />
        </td>
        <td>{publish_time}</td>
        <td style={{ minWidth: "35px" }}>{description}</td>
      </tr>
    );

    return content;
  }
}

export default EditNews;
