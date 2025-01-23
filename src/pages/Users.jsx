import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Avatar_02,
  Avatar_03,
  Avatar_04,
  Avatar_05,
  Avatar_08,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
  Avatar_19,
} from "../ImagePath";
import Breadcrumbs from "@ui/Shared/Breadcrumbs";
import PageHeader from "@layout/PageHeader";
import { useGetGroupQuery, useGetUserReportQuery } from "api/groups/groupsApi";
import avatar from "../assets/avatar/1.jpeg";

const Users = () => {
  const { groupId } = useParams();
  const { data: group, isLoading, isError, error } = useGetGroupQuery(groupId);
  const { data: report } = useGetUserReportQuery(groupId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const handleDownload = (url) => {
    window.location.href = url;
  };
  return (
    <div>
      <PageHeader title="Users " />

      <div className="content container-fluid">
        {/* <Breadcrumbs
          maintitle="Users"
          title="Groups"
          subtitle="Users"
          modal="#add_user"
          name="Add User"
          Linkname="/users"
          
        /> */}
        {/* <EmployeeListFilter /> */}

        <div className="row">
          {group?.data?.users?.map((employee) => (
            <div
              className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
              key={employee.id}
            >
              <div className="profile-widget">
                <div className="profile-img">
                  <Link to="/profile" className="avatar">
                    <img src={avatar} alt="avatar" />
                  </Link>
                </div>
                <div className="dropdown profile-action">
                  <Link
                    to="#"
                    className="action-icon dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* <i className="material-icons">more_vert</i> */}
                  </Link>
                  {/* <div className="dropdown-menu dropdown-menu-right"> */}
                    <button onClick={() => handleDownload(report.data[0].report_url)}>
                      <i className="la la-download" />
                      Download
                    </button>
                    {/* <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#delete"
                    >
                      <i className="fa-regular fa-trash-can m-r-5" /> Delete
                    </Link> */}
                  {/* </div> */}
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                  <Link to={`/profile/${employee.id}`}>{employee.name}</Link>
                </h4>
                <div className="small text-muted">{employee.role}</div>

                {/* Add Email Link */}
                <div className="small text-muted">
                  <a href={`mailto:${employee.email}`}>{employee.email}</a>
                </div>

                {/* Add Membership Information */}
                <div className="small text-muted">
                  Membership: {employee.membership}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <AllEmployeeAddPopup /> */}
      {/* Delete Modal */}
      {/* <DeleteModal Name="Delete Employee" /> */}
      {/* Delete Modal */}
    </div>
  );
};

export default Users;
