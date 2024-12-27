import React from "react";
import Select from "react-select";

const BasicInputs = () => {
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
  return (
    <>
        <div className="content container-fluid">
      
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <form action="#">
                    
                    
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                        Group Name
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Group Name"
                        />
                      </div>
                    </div>
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                      Group Background Image                      </label>
                      <div className="col-md-10">
                        <input className="form-control" type="file" />
                      </div>
                    </div>
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                      Group Icon Image                      </label>
                      <div className="col-md-10">
                        <input className="form-control" type="file" />
                      </div>
                    </div>
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                        Group Type
                      </label>
                      <div className="col-md-10">
                        <Select
                          options={selectoptions}
                          placeholder="-- Select --"
                          styles={customStyles}
                        />
                      </div>
                    </div>
                   
                   
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                        Group Description
                      </label>
                      <div className="col-md-10">
                        <textarea
                          rows={5}
                          cols={5}
                          className="form-control"
                          placeholder="Enter Description here"
                          defaultValue={""}
                        />
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

export default BasicInputs;
