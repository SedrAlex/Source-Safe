import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { base_url } from "./base_urls";
import { format } from "date-fns";
import { Box, Button, Typography } from "@mui/material";
import noFileImage from "../../assets/nofiles.png"; // Renamed to avoid conflict
import NoFiles from "@pages/NoFiles";
import { useLockFileMutation } from "api/files/filesApi";

const Files = ({ files, groupId }) => {
  const [values, setValues] = useState([]);
  const [checkedFiles, setCheckedFiles] = useState([]);
  const [lockFiles] = useLockFileMutation();

  useEffect(() => {
    axios
      .get(base_url + "/dummy/files.json")
      .then((res) => setValues(res.data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  const handleCheckboxChange = (fileId) => {
    setCheckedFiles((prevCheckedFiles) =>
      prevCheckedFiles.includes(fileId)
        ? prevCheckedFiles.filter((id) => id !== fileId)
        : [...prevCheckedFiles, fileId]
    );
  };

  const handleLockFiles = async () => {
    try {
      await lockFiles({ files_id: [checkedFiles] });
      alert("Files locked successfully!");
      setCheckedFiles([]); // Clear selection after locking
    } catch (error) {
      console.error("Error locking files:", error);
      alert("Failed to lock files.");
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
    <div className="row row-sm">
      {files?.map((file, index) => (
        <div
          className="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3"
          key={index}
        >
          <div className="card card-file">
            <input
              type="checkbox"
              checked={checkedFiles.includes(file.id)}
              onChange={() => handleCheckboxChange(file.id)}
            />
            <div className="dropdown-file">
              <Link
                to="#"
                className="dropdown-link"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link to="#" className="dropdown-item">
                  View Details
                </Link>
                <Link to="#" className="dropdown-item">
                  Share
                </Link>
                <Link to="#" className="dropdown-item">
                  Download
                </Link>
                <Link to="#" className="dropdown-item">
                  Rename
                </Link>
                <Link to="#" className="dropdown-item">
                  Delete
                </Link>
              </div>
            </div>
            <div className="card-file-thumb">
              <i className={`fa-regular fa-regular fa-file-code `} />
            </div>
            <div className="card-body">
              <h6>
                <Link to="#">{file.name}</Link>
              </h6>
              <span>{file.fileSize}</span>
            </div>
            <div className="card-footer">Is Locked By: {file.locked_by}</div>
            <div className="card-footer">
              Created At: {formatDate(file?.created_at)}
            </div>
            <div className="card-footer">
              Updated At: {formatDate(file?.updated_at)}
            </div>
          </div>
        </div>
      ))}
      <div style={{ textAlign: "right", width: "100%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLockFiles}
          disabled={checkedFiles.length === 0}
        >
          Lock Files
        </Button>
      </div>
    </div>
  );
};

export default Files;
