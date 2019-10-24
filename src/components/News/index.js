import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Table
} from "reactstrap";

import ReactTable from "react-table";
import "react-table/react-table.css";

import EditNews from "../EditNews/";
import "./styles.css";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modal: false,
      loading: true
    };
  }

  componentDidMount() {
    fetch("http://test55.phpist.com.ua/api/get_news", {
      method: "POST"
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ data: res });
      console.log(res);
      this.setState({ loading: false });
    })
    .catch(err => {
      console.log(err);
      this.setState({ loading: false });
    });
  }
  

  handleSaveNews = () => {
    const { modal, data } = this.state;

    let formData = new FormData();
    formData.append("id", modal.id);
    formData.append("title", modal.title);
    // formData.append("img", modal.img);
    formData.append("description", modal.description);

    this.handleToggleModal();
    fetch("http://test55.phpist.com.ua/api/save_news", {
      method: "POST",
      body: formData
    })
      .then(res => {
        const updatedData = [];

        data.forEach(news => {
          if (modal.id === news.id) {
            updatedData.push({ ...modal });
          } else {
            updatedData.push({ ...news });
          }
        });
        this.setState({ data: updatedData });
        return res;
      })
      .catch(err => {
      });
  };

  handleToggleModal = id => {
    const { data } = this.state;
    if (id) {
      console.log("id", id);
      const news = data.find(news => news.id === id);
      this.setState(state => {
        return {
          modal: state.modal ? false : { ...news }
        };
      });
    } else {
      this.setState({ modal: false });
    }
  };

  hangleChange = (event, name) => {
    const text = event.target.value;
    console.log("text", text);

    switch (name) {
      case "title":
        this.setState(state => {
          return {
            modal: {
              ...state.modal,
              title: text
            }
          };
        });
        break;

      // case "imageUrl":
      //   this.setState(state => {
      //     return {
      //       modal: {
      //         ...state.modal,
      //         img: text
      //       }
      //     };
      //   });
      //   break;

      case "description":
        this.setState(state => {
          return {
            modal: {
              ...state.modal,
              description: text
            }
          };
        });
        break;

      default:
    }
  };



  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      return {
        onClick: () => {
          this.handleToggleModal(rowInfo.row.id);
        }
      }
    }
    return {};
  }

  render() {
    const { data, modal, loading } = this.state;
    console.log("data", data);

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

          <div className="row">
            <div className="col-lg-12">
              
            <div>
                <ReactTable 
                  style={{marginTop: '30px', cursor: 'pointer'}}
                  data={data}
                  filterable
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                  columns={[
                    {
                      Header: "NEWS",
                      columns: [
                        {
                          Header: "Id",
                          accessor: "id",
                          width: 100,
                          Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                          sortMethod: (a, b) => {
                            if (a.length === b.length) {
                              return a > b ? 1 : -1;
                            }
                            return a.length > b.length ? 1 : -1;
                          },
                          filterMethod: (filter, row) =>
                            row[filter.id].includes(filter.value)
                        },
                        {
                          Header: "Title",
                          accessor: "title",
                          width: 200,
                          sortMethod: (a, b) => {
                            if (a.length === b.length) {
                              return a > b ? 1 : -1;
                            }
                            return a.length > b.length ? 1 : -1;
                          },
                          filterMethod: (filter, row) =>
                            row[filter.id].includes(filter.value)
                        },
                        {
                          Header: "Description",
                          accessor: "description",
                          sortMethod: (a, b) => {
                            if (a.length === b.length) {
                              return a > b ? 1 : -1;
                            }
                            return a.length > b.length ? 1 : -1;
                          },
                          filterMethod: (filter, row) =>
                            row[filter.id].includes(filter.value)
                        }
                      ]
                    }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                  getTrProps={this.getTrProps}
                />
                <br />
              </div>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading panel-heading--margined">
                  DataTables Advanced Tables
                </div>
                <div className="panel-body">
                  <div className="dataTable_wrapper">
                    <Table
                      className="table table-striped table-bordered table-hover"
                      id="dataTables-example"
                    >
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Title</th>
                          <th>Image</th>
                          <th>Publish Time</th>
                          <th>Description</th>
                        </tr>
                      </thead>
  
                      <tbody>
                        {typeof data !== "undefined" ? (
                          data.map(data => {
                            return (
                              <EditNews
                                key={data.id}
                                {...data}
                                onToggleModal={() =>
                                  this.handleToggleModal(data.id)
                                }
                              />
                            );
                          })
                        ) : (
                          <div></div>
                        )}
                      </tbody>
                    </Table>
  
                    <div className="well">
                      <h4>DataTables Usage Information</h4>
                      <p>
                        DataTables is a very flexible, advanced tables plugin for
                        jQuery. In SB Admin, we are using a specialized version of
                        DataTables built for Bootstrap 3. We have also customized
                        the table headings to use Font Awesome icons in place of
                        images. For complete documentation on DataTables, visit
                        their website at{" "}
                        <a target="_blank" href="https://datatables.net/">
                          https://datatables.net/
                        </a>
                        .
                      </p>
                      <a
                        className="btn btn-default btn-lg btn-block"
                        target="_blank"
                        href="https://datatables.net/"
                      >
                        View DataTables Documentation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
  
          <Modal
            isOpen={!!modal}
            toggle={this.handleToggleModal}
            className={this.props.className}
          >
            <ModalHeader toggle={this.handleToggleModal}>Editing</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="title"
                    name="title"
                    id="title"
                    placeholder="Breaking news..."
                    value={modal.title}
                    onChange={ev => this.hangleChange(ev, "title")}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label for="imageUrl">Image URL</Label>
                  <Input
                    name="imageUrl"
                    id="imageUrl"
                    placeholder="https://..."
                    value={modal.img}
                    onChange={ev => this.hangleChange(ev, "imageUrl")}
                  />
                </FormGroup> */}
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    rows="8"
                    name="text"
                    id="description"
                    value={modal.description}
                    onChange={ev => this.hangleChange(ev, "description")}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSaveNews}>
                Save
              </Button>{" "}
              <Button color="secondary" onClick={this.handleToggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
  
          {spinner}
        </div>
      );

    }

  }
}

export default News;

// http://test55.phpist.com.ua/images/news/b60c0d2ab42c23b12546faacc904551c.jpg