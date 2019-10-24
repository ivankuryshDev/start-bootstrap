import React, { Component } from "react";
import { Container, Row, Col, Spinner} from 'reactstrap';

import "./styles.css";

const NO_PHOTO_IMG = "https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png";

class OneNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    let formData = new FormData();
    formData.append("id", this.props.location.state.id);

    fetch("http://test55.phpist.com.ua/api/get_one_news", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res, loading: false });
      })
      .catch(err => {
        console.log("error: ", err);
        this.setState({ loading: false });
      });
  }

  

  render() {
    let {
      title,
      img,
      description,
      publish_time,
      name_company
    } = this.state.data;

    let {loading} = this.state;

    let spinner = null;

    if (loading) {
      return(
        <div className="spinner_container__shown">
          <Spinner style={{ width: "3rem", height: "3rem" }} color="primary" />
        </div>
      );
    }else{

    return (
      <div id="page-wrapper">
        <Container>
          <Row>
            <Col><p className="title">{title}</p></Col>
          </Row>
          <Row>
            <Col style={{display: 'flex', justifyContent: 'space-between'}}><p className="publish"><i class="fa fa-calendar" aria-hidden="true"></i>{` `+publish_time}</p><p className="company">{name_company}</p></Col>
          </Row>
          <hr className="horisontal_line" />
          <Row>
            <Col><img className="image"
                    src={!img ? this.src = NO_PHOTO_IMG : this.src = img}
                    alt="some"
                    height="400"
                    width="400"
                  />
            </Col>
          </Row>
          <Row>
            <Col><p className="description">{description}</p></Col>
          </Row>
          <hr />
        </Container>
        {spinner}
      </div>
    );
    }
  }
}

export default OneNews;
