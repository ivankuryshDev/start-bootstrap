import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const NO_PHOTO_IMG = "https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png";

class EditNews extends Component {


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
      <>
        
      </>
    );

    return content;
  }
}

export default EditNews;
