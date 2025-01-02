import React from "react";
import Breadcrumbs from "@ui/Shared/Breadcrumbs";
import Select from "react-select";

const InvitationForm = () => {
  const selectoptions = [
    { label: "Private", value: "Private" },
    { label: "Public", value: "Public" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FDCA40" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#FDCA40",
      },
    }),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Access form data here
    console.log("Form submitted");
  };

  return (
    <>
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Invitation"
          title="Dashboard"
          subtitle="Invite a Member"
        />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="input-block mb-6 row">
                    <label className="col-form-label col-md-2">
                      Member Email
                    </label>
                    <div className="col-md-10">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Member Email"
                      />
                    </div>
                  </div>
                 
                  <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">Access Levels</label>
                      <div className="col-md-10">
                        <div className="radio">
                          <label className="col-form-label">
                            <input type="radio" name="radio" /> Read Only
                          </label>
                        </div>
                        <div className="radio">
                          <label className="col-form-label">
                            <input type="radio" name="radio" /> Full Access
                          </label>
                        </div>
                        {/* <div className="radio">
                          <label className="col-form-label">
                            <input type="radio" name="radio" /> Option 3
                          </label>
                        </div> */}
                      </div>
                    </div>
                 
                  <div className="input-block mb-6 row">
                  <div className="col-md-10 offset-md-2 d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvitationForm;
