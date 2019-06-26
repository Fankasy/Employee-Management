import React, { Component } from "react";
import ListRow from "./ListRow.js";
import ReduxLazyScroll from "redux-lazy-scroll";

class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAsc: "",
      sexAsc: "",
      drAsc: ""
    };
  }

//  componentDidMount = () => {
//    this.props.onLoad(1);
//  };
    
  nameSort = () => {
    let arr = this.props.employees;
    if (this.state.nameAsc) {
      this.props.setSort("nameAsc");
      arr.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else {
      this.props.setSort("nameDesc");
      arr.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    this.setState({ nameAsc: !this.state.nameAsc });
    
  };

  sexSort = () => {
    let arr = this.props.employees;
    if (this.state.sexAsc) {
      this.props.setSort("sexAsc");
      arr.sort((a, b) => {
        return a.sex.localeCompare(b.sex);
      });
    } else {
      this.props.setSort("sexDesc");
      arr.sort((a, b) => {
        return b.sex.localeCompare(a.sex);
      });
    }
    this.setState({ sexAsc: !this.state.sexAsc });
  };

  drSort = () => {
    let arr = this.props.employees;
    if (this.state.drAsc) {
      this.props.setSort("drAsc");
      arr.sort((a, b) => {
        return a.directReports.length - b.directReports.length;
      });
    } else {
      this.props.setSort("drDesc");
      arr.sort((a, b) => {
        return b.directReports.length - a.directReports.length;
      });
    }
    this.setState({ drAsc: !this.state.drAsc });
  };

  handleDelete = id => {
    console.log("handle delete" + id);
//    this.setState({
//      nameAsc: "",
//      sexAsc: "",
//      ageAsc: ""
//    });
    this.props.onDelete(id);
  };

 loadItems = () => {
    console.log("page"+this.props.page)
    if(this.props.resultField==="getEmployees"){
        this.props.onLoad(this.props.page);
    }
 }
 
  render() {
    const { employees, employeesStatus, onReporters, onManager,hasMore,sort } = this.props;
    console.log(JSON.stringify(employees));

//    if (employeesStatus === "fail") {
//      return <p>Sorry! There was an error loading the employees</p>;
//    }
//
//    if (employeesStatus === "start") {
//      return <p>Loading…</p>;
//    }

    return (
      <div className="table posts-lazy-scroll containTable ">
        <ReduxLazyScroll
        className="listWrap"
          isFetching={employeesStatus === "start"}
          
          loadMore={this.loadItems}
          hasMore={hasMore}
          threshold = {0}
        >
        <table className="table table-striped list" >
            <thead>
              <td>Avatar</td>
              <td onClick={this.nameSort}>
                Name
                {sort ==="nameAsc"?<i className="fas fa-long-arrow-alt-up"></i>
                : sort === "nameDesc" ?<i className="fas fa-long-arrow-alt-down"></i>:
                <i class="fas fa-arrows-alt-v"></i>
                }
                
              </td>
              <td>Title</td>
              <td onClick={this.sexSort}>
                Sex
                {sort ==="sexAsc"?<i className="fas fa-long-arrow-alt-up"></i>
                : sort === "sexDesc" ?<i className="fas fa-long-arrow-alt-down"></i>:
                <i class="fas fa-arrows-alt-v"></i>
                }
                
              </td>
              <td>startDate</td>
              <td>officePhone</td>
              <td>cellPhone</td>
              <td>SMS</td>
              <td>email</td>
              <td>manager</td>
              <td onClick={this.drSort}>
                #DR
                {sort ==="drAsc"?<i className="fas fa-long-arrow-alt-up"></i>
                : sort === "drDesc" ?<i className="fas fa-long-arrow-alt-down"></i>:
                <i class="fas fa-arrows-alt-v"></i>
                }
                
              </td>
              <td>Edit</td>
              <td>Delete</td>
            </thead>
          <tbody>
        {employees.map(employee => (
                    <ListRow
                      key={employee._id}
                      id={employee._id}
                      employee={employee}
                      employeeDelete={() => this.handleDelete(employee._id)}
                      employeeReporters={() => onReporters(employee._id)}
                      employeeManager={() => onManager(employee._id)}
                    />
                  ))}
            </tbody>
        </table>  

        </ReduxLazyScroll>
        <div className="row posts-lazy-scroll__messages">
          {employeesStatus === "start" && <div className="alert alert-info"> Loading more posts... </div>}

          {!hasMore && employeesStatus !== "fail" &&
            <div className="alert alert-success">All the posts has been loaded successfully.</div>
          }
          {employeesStatus === "fail" && <div className="alert alert-danger">Opps! There was an error loading the employees.</div>}
          </div>
        </div>
     

    );
  }
}

export default EmployeesList;
