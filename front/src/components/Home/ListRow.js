import React from "react";
import { Link } from "react-router-dom";
//import {Image} from 'cloudinary-react';

const ListRow = props => {
  let date = props.employee.startDate.substr(0,10);
  return (
    <tr>
      <td>{props.employee.avatar===null||props.employee.avatar===""?null:<img className="avatar-small" src={props.employee.avatar} alt="avatar"/>}</td>
      <td>{props.employee.name}</td>
      <td>{props.employee.title}</td>
      <td>{props.employee.sex}</td>
      <td>{date}</td>
      <td>{props.employee.officePhone===null||props.employee.officePhone===""?null:(<a href={"skype:"+props.employee.officePhone+"?call"}>{props.employee.officePhone}</a>)}</td>
      <td>{props.employee.cellPhone}</td>
      <td>{props.employee.SMS}</td>
      <td>{props.employee.email===null||props.employee.email===""?null:(<a href={"mailto:"+props.employee.email}>{props.employee.email}</a>)}</td>
      <td>
        {props.employee.managerName === null ? null : (
          <button className="btn btn-link" onClick={props.employeeManager}>{props.employee.managerName}</button>
        )}
      </td>
      <td>
        {props.employee.directReports.length === 0 ? (
          0
        ) : (
          <button className="btn btn-link" onClick={props.employeeReporters}>
            {props.employee.directReports.length}
          </button>
        )}
      </td>
      <td>
        <Link to={{ pathname: `/edit/${props.employee._id}` }}>
          <button type="button" className="btn btn-success">
            Edit
          </button>
        </Link>
      </td>
      <td>
        <button
          type="button"
          className="btn  btn-danger"
          id={props.employee._id}
          onClick={props.employeeDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListRow;
