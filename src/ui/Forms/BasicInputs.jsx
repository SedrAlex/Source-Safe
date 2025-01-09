import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@ui/Shared/Breadcrumbs";
import Select from "react-select";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
} from "api/groups/groupsApi";
import { toast } from "react-toastify";

const BasicInputs = ({ defaultValues }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const [createGroup] = useCreateGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();

  const { groupId } = useParams();
  const navigate = useNavigate();

  const selectOptions = [
    { label: "Private", value: "private" },
    { label: "Public", value: "public" },
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

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("bg_image", data.bg_image);
      formData.append("icon_image", data.icon_image);
      formData.append("type", data.type);
      formData.append("description", data.description);


      if (groupId !== "new") {
        await updateGroup({ id: groupId, formData });
        toast.success("Group updated successfully!");
        navigate("/groups");
      } else {
        await createGroup(formData);
        toast.success("Group created successfully!");
        navigate("/groups");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const isDisabled = groupId !== "new";

  return (
    <div className="content container-fluid">
      <Breadcrumbs
        maintitle="Basic Inputs"
        title="Dashboard"
        subtitle="Basic Inputs"
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-block mb-6 row">
                  <label className="col-form-label col-md-2">Group Name</label>
                  <div className="col-md-10">
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Group Name"
                          {...field}
                        />
                      )}
                    />
                    {errors?.name && <span>{errors?.name?.message}</span>}
                  </div>
                </div>
                <div className="input-block mb-6 row">
                  <label className="col-form-label col-md-2">
                    Group Background Image
                  </label>
                  <div className="col-md-10">
                    <Controller
                      name="bg_image"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => field.onChange(e.target.files[0])}
                          disabled={isDisabled}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="input-block mb-6 row">
                  <label className="col-form-label col-md-2">
                    Group Icon Image
                  </label>
                  <div className="col-md-10">
                    <Controller
                      name="icon_image"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="form-control"
                          type="file"
                          disabled={isDisabled}
                          onChange={(e) => field.onChange(e.target.files[0])}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="input-block mb-6 row">
                  <label className="col-form-label col-md-2">Group Type</label>
                  <div className="col-md-10">
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={selectOptions}
                          placeholder="-- Select --"
                          styles={customStyles}
                          value={selectOptions.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(option) => field.onChange(option.value)}
                        />
                      )}
                    />
                    {errors?.type && <span>{errors?.type?.message}</span>}
                  </div>
                </div>
                <div className="input-block mb-6 row">
                  <label className="col-form-label col-md-2">
                    Group Description
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
                  </div>
                </div>
                <div className="input-block mb-6 row">
                  <div className="col-md-10 offset-md-2 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInputs;
