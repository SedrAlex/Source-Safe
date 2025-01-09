import React from "react";
import Breadcrumbs from "@ui/Shared/Breadcrumbs";
import { Controller } from "react-hook-form";

const InvitationForm = ({ control, errors, handleSubmit, onSubmit }) => {
  const selectoptions = [
    { label: "Writer", value: "writer" },
    { label: "Viewer", value: "viewer" },
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
        <Breadcrumbs
          maintitle="Invitation"
          title="Dashboard"
          subtitle="Invite a Member"
        />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-block mb-6 row">
                    <label className="col-form-label col-md-2">
                      Member Email
                    </label>
                    <div className="col-md-10">
                      <Controller
                        name="recipient_email"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Member Email"
                            {...field}
                          />
                        )}
                      />
                      {errors.recipient_email && (
                        <span className="text-danger">
                          {errors.recipient_email.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="input-block mb-3 row">
                    <label className="col-form-label col-md-2">
                      Description
                    </label>
                    <div className="col-md-10">
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            rows={5}
                            cols={5}
                            className="form-control"
                            placeholder="Enter Description here"
                            {...field}
                          />
                        )}
                      />
                      {errors.description && (
                        <span className="text-danger">
                          {errors.description.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="input-block mb-3 row">
                    <label className="col-form-label col-md-2">Roles</label>
                    <div className="col-md-10">
                      {selectoptions.map((option) => (
                        <div className="radio" key={option.value}>
                          <label className="col-form-label">
                            <Controller
                              name="role"
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="radio"
                                  value={option.value}
                                  checked={field.value === option.value}
                                  onChange={() => field.onChange(option.value)}
                                />
                              )}
                            />
                            {option.label}
                          </label>
                        </div>
                      ))}
                      {errors.role && (
                        <span className="text-danger">
                          {errors.role.message}
                        </span>
                      )}
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
