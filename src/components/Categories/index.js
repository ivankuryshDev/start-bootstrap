import React, { Component } from "react";
import {
  Spinner
} from "reactstrap";
import './styles.css';

import ReactTable from "react-table";
import "react-table/react-table.css";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    fetch("http://test55.phpist.com.ua/api/get_categories")
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    let { data, loading } = this.state;

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
            <ReactTable style={{marginTop: '30px'}}
                  data={data}
                  filterable
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                  columns={[
                    {
                      Header: "CATEGORIES",
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
                          Header: "Name",
                          accessor: "name",
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
                          Header: "Name En",
                          accessor: "name_en",
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
            </div>
          </div>
          {spinner}
        </div>
      );
    }
  }
}

export default Categories;
