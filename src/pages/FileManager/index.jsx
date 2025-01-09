import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import RecentFiles from "./recentFiles";
import Files from "./files";
import PageHeader from "@layout/PageHeader";
import { useGetGroupsQuery, useGetGroupQuery } from "api/groups/groupsApi";
import { useCreateFileMutation } from "api/files/filesApi";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

const FileManager = () => {
  const { groupId } = useParams();
  console.log("Group ID:", groupId);

  const { data: groups, isLoading, isError, error } = useGetGroupsQuery();
  const { data: group } = useGetGroupQuery(groupId);
  const [createFile] = useCreateFileMutation();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("Selected File:", selectedFile);
    handleFileUpload(selectedFile);
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('group_id', groupId);

      await createFile(formData ).unwrap();
      toast.success("File uploaded successfully!");
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
                        <IconButton onClick={handleClickFile} disabled={isUploading}>
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
                          <Files files={group?.data?.files} />
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
