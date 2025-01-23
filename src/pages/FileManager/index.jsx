import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecentFiles from "./recentFiles";
import PageHeader from "@layout/PageHeader";
import { useGetGroupsQuery, useGetGroupQuery } from "api/groups/groupsApi";
import {
  useCreateFileMutation,
  useUnLockFileMutation,
  useUpdateFileMutation,
} from "api/files/filesApi";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import axios from "axios";
import { base_url } from "./base_urls";
import { format } from "date-fns";
import { Box, Button, Typography, Tooltip } from "@mui/material";
import noFileImage from "../../assets/nofiles.png";
import NoFiles from "@pages/NoFiles";
import { useLockFileMutation } from "api/files/filesApi";
import { useSelector } from "react-redux";

const FileManager = () => {
  const { groupId } = useParams();
  console.log("Group ID:", groupId);

  const { data: groups, isLoading, isError, error } = useGetGroupsQuery();
  const { data: group, refetch } = useGetGroupQuery(groupId);
  const files = group?.data?.files;
  const [createFile] = useCreateFileMutation();
  const [file, setFile] = useState(null);
  const [newFle, setNewFile] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [reUploadFile, setReUploadFile] = useState(null);

  const fileInputRef = useRef(null);
  // const fileReInputRef = useRef(null);
  const [fileRefs, setFileRefs] = useState({});
  const [values, setValues] = useState([]);
  const [checkedFiles, setCheckedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lockFiles] = useLockFileMutation();
  const [unlockFiles] = useUnLockFileMutation();
  const [updateFile] = useUpdateFileMutation();

  const userEmail = useSelector((state) => state?.user?.user?.email);
  const navigate = useNavigate();
  console.log("userEmail", userEmail);
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("Selected File:", selectedFile);
    handleFileUpload(selectedFile);
  };
  const handleReUploadFileChange = (event, fileId) => {
    const selectedFile = event.target.files[0];
    setNewFile(selectedFile);
    console.log("File ID on change:", fileId); // Debugging log
    if (!selectedFile) {
      toast.error("Please select a file to upload!");
      return;
    }

    handleReUploadFile(fileId, selectedFile);
  };

  // const handleCheckOut = () => {
  //   if (fileReInputRef.current) {
  //     fileReInputRef.current.click();
  //   }
  // };

  const handleReUploadFile = async (fileId, file) => {
    console.log("Re-uploading file with ID:", fileId); // Log the fileId here
    if (!file) {
      toast.error("Please select a file to upload!");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("_method", "PATCH"); // Add method spoofing
      // formData.append("file_id", fileId);

      await updateFile({ id: fileId, file: formData }).unwrap();
      await unlockFiles({ files_id: [fileId] });
      toast.success(
        "You uploaded a new version of the file and now the file is free!"
      );
      refetch();
    } catch (error) {
      console.error("Error updating file:", error);
      toast.error("Failed to update the file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("group_id", groupId);

      await createFile(formData).unwrap();
      toast.success("File uploaded successfully!");
      refetch();
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("File upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClickFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const renderGroupLinks = (groupType) => {
    return groups?.data?.[groupType]?.map((group) => (
      <li key={group.id}>
        <Link to={`/groups/${group.id}/files`}>{group.name}</Link>
      </li>
    ));
  };

  // useEffect(() => {
  //   axios
  //     .get(base_url + "/dummy/files.json")
  //     .then((res) => setValues(res.data))
  //     .catch((error) => console.error("Error fetching files:", error));
  // }, []);

  const handleCheckboxChange = (fileId) => {
    setCheckedFiles((prevCheckedFiles) =>
      prevCheckedFiles.includes(fileId)
        ? prevCheckedFiles.filter((id) => id !== fileId)
        : [...prevCheckedFiles, fileId]
    );
  };

  const handleLockFiles = async () => {
    setLoading(true);
    try {
      await lockFiles({ files_id: checkedFiles });
      toast.success("Files locked and downloaded successfully!");
      refetch();
      checkedFiles.forEach((fileId) => {
        const file = files.find((f) => f.id === fileId);
        if (file && file.url) {
          const link = document.createElement("a");
          link.href = file.url;
          link.download = file.name || "download";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
      // window.location.reload()

      setCheckedFiles([]);
    } catch (error) {
      console.error("Error locking files:", error);
      toast.error("Failed to lock files.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const cleanDateString = dateString.trim().split("Z")[0] + "Z";
      const date = new Date(cleanDateString);

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      return format(date, "yyyy/MM/dd HH:mm:ss");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };
  return (
    <>
      <PageHeader title="Files" />
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="file-wrap">
              <div className="file-sidebar">
                <div className="file-header justify-content-center">
                  <span>Groups</span>
                  <Link to="#" className="file-side-close">
                    <i className="fa-solid fa-xmark" />
                  </Link>
                </div>
                <form className="file-search">
                  <div className="input-group">
                    <div className="input-group-text">
                      <i className="fa-solid fa-magnifying-glass" />
                    </div>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      placeholder="Search"
                    />
                  </div>
                </form>
                <div className="file-pro-list">
                  <div className="file-scroll">
                    <ul className="file-menu">
                      <li className="active">
                        <Link to="#">Other Groups</Link>
                      </li>
                      {renderGroupLinks("public-groups")}
                      {renderGroupLinks("personal-groups")}
                    </ul>
                    <div className="show-more">
                      <Link to="#">Show More</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="file-cont-wrap">
                <div className="file-cont-inner">
                  <div className="file-cont-header">
                    <div className="file-options">
                      <Link
                        to="#"
                        id="file_sidebar_toggle"
                        className="file-sidebar-toggle"
                      >
                        <i className="fa-solid fa-bars" />
                      </Link>
                    </div>
                    <span>File Manager</span>
                    <div className="file-options">
                      <span className="btn-file">
                        <input
                          type="file"
                          className="upload"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                        <IconButton
                          onClick={handleClickFile}
                          disabled={isUploading}
                        >
                          <i className="fa-solid fa-upload" />
                        </IconButton>
                      </span>
                    </div>
                  </div>
                  <div className="file-content">
                    <form className="file-search">
                      <div className="input-group">
                        <div className="input-group-text">
                          <i className="fa-solid fa-magnifying-glass" />
                        </div>
                        <input
                          type="text"
                          className="form-control rounded-pill"
                          placeholder="Search"
                        />
                      </div>
                    </form>
                    <div className="file-body">
                      <div className="file-scroll">
                        <div className="file-content-inner">
                          <h4>Files</h4>
                          <div className="row row-sm">
                            {files && files.length > 0 ? (
                              files.map((file, index) => {
                                // Initialize a ref for each file if it doesn't exist
                                if (!fileRefs[file.id]) {
                                  fileRefs[file.id] = React.createRef();
                                  setFileRefs({ ...fileRefs });
                                }
                                return (
                                  <div
                                    className={`col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3 ${
                                      file?.locked_by ? "disabled-file" : ""
                                    }`}
                                    key={index}
                                  >
                                    <div className="card card-file h-75">
                                      <div className="card-file-thumb">
                                        <i
                                          className={`fa-regular fa-regular fa-file-code `}
                                        />
                                      </div>
                                      {!file?.locked_by?.email && (
                                        <div className="dropdown-file checkbox-container">
                                          <input
                                            type="checkbox"
                                            checked={checkedFiles.includes(
                                              file.id
                                            )}
                                            onChange={() =>
                                              handleCheckboxChange(file.id)
                                            }
                                            style={{ accentColor: "#DFAA42" }}
                                          />
                                        </div>
                                      )}
                                      {(file?.locked_by?.email === userEmail ||
                                        !file?.locked_by) && (
                                        <>
                                          <div className="dropdown-file">
                                            <input
                                              type="file"
                                              className="upload"
                                              hidden
                                              ref={fileRefs[file.id]}
                                              onChange={(event) =>
                                                handleReUploadFileChange(
                                                  event,
                                                  file.id
                                                )
                                              }
                                            />
                                            {file?.locked_by?.email === userEmail &&(
                                            <IconButton
                                              onClick={() =>
                                                fileRefs[
                                                  file.id
                                                ].current.click()
                                              }
                                              style={{
                                                fontSize: "16px",
                                                padding: "4px",
                                                marginBottom: "6px",
                                              }}
                                            >
                                              <i className="fa-solid fa-upload " />
                                            </IconButton>
                                            )}
                                            <Link
                                              to="#"
                                              className="dropdown-link"
                                              data-bs-toggle="dropdown"
                                              onClick={(e) =>
                                                file?.locked_by &&
                                                e.preventDefault()
                                              }
                                            >
                                              <i className="fa fa-ellipsis-v" />
                                            </Link>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <Link
                                                to={`/groups/${groupId}/files/${file.id}/details`}
                                                className="dropdown-item"
                                              >
                                                View Details
                                              </Link>
                                              {group?.data?.owner.email ===
                                                userEmail && (
                                                <Link
                                                  to="#"
                                                  className="dropdown-item"
                                                >
                                                  Delete
                                                </Link>
                                              )}
                                            </div>
                                          </div>
                                        </>
                                      )}

                                      <div className="card-body">
                                        <h6>
                                          <Link to="#">{file?.name}</Link>
                                        </h6>
                                        <span > File Version {file?.version}</span>
                                      </div>
                                      <div className="card-footer">
                                        {file?.locked_by ? (
                                          <Tooltip
                                            title={`This file is locked by: ${file?.locked_by?.user_name}`}
                                          >
                                            <span style={{ color: "#DFAA42" }}>
                                              Is Locked By:{" "}
                                              {file?.locked_by?.user_name}
                                            </span>
                                          </Tooltip>
                                        ) : (
                                          <span style={{ color: "#DFAA42" }}>
                                            Not Locked{" "}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div
                                style={{ width: "78vw", textAlign: "center" }}
                              >
                                <img
                                  src={noFileImage}
                                  alt="No files available"
                                  style={{
                                    width: "100%",
                                    height: "40%",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                            )}
                            {files && files.length > 0 && (
                              <div
                                style={{ textAlign: "right", width: "100%" }}
                              >
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: "#DFAA42" }}
                                  onClick={handleLockFiles}
                                  disabled={
                                    checkedFiles.length === 0 || loading
                                  }
                                >
                                  {loading ? "Loading..." : "Check In"}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileManager;
