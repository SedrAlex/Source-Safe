// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { base_url } from "./base_urls";
// import { format } from "date-fns";
// import { Box, Button, Typography, Tooltip } from "@mui/material";
// import noFileImage from "../../assets/nofiles.png";
// import NoFiles from "@pages/NoFiles";
// import { useLockFileMutation } from "api/files/filesApi";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Files = ({ files, groupId }) => {
//   const [values, setValues] = useState([]);
//   const [checkedFiles, setCheckedFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [lockFiles] = useLockFileMutation();
//   const userEmail = useSelector((state) => state?.user?.user?.email);
//   console.log("====================================");
//   console.log(userEmail);
//   console.log("====================================");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(base_url + "/dummy/files.json")
//       .then((res) => setValues(res.data))
//       .catch((error) => console.error("Error fetching files:", error));
//   }, []);

//   const handleCheckboxChange = (fileId) => {
//     setCheckedFiles((prevCheckedFiles) =>
//       prevCheckedFiles.includes(fileId)
//         ? prevCheckedFiles.filter((id) => id !== fileId)
//         : [...prevCheckedFiles, fileId]
//     );
//   };

//   const handleLockFiles = async () => {
//     setLoading(true);
//     try {
//       await lockFiles({ files_id: checkedFiles });
//       toast.success("Files locked and downloaded successfully!");

//       checkedFiles.forEach((fileId) => {
//         const file = files.find((f) => f.id === fileId);
//         if (file && file.url) {
//           const link = document.createElement("a");
//           link.href = file.url;
//           link.download = file.name || "download";
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//         }
//       });
//       // navigate("/groups");
//       window.location.reload() 
//       setCheckedFiles([]);
  
//     } catch (error) {
//       console.error("Error locking files:", error);
//       toast.error("Failed to lock files.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     try {
//       const cleanDateString = dateString.trim().split("Z")[0] + "Z";
//       const date = new Date(cleanDateString);

//       if (isNaN(date.getTime())) {
//         throw new Error("Invalid date");
//       }

//       return format(date, "yyyy/MM/dd HH:mm:ss");
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return "Invalid Date";
//     }
//   };

//   return (
//     <div className="row row-sm">
//       <ToastContainer />
//       {files && files.length > 0 ? (
//         files.map((file, index) => (
//           <div
//             className={`col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3 ${
//               file?.locked_by ? "disabled-file" : ""
//             }`}
//             key={index}
//           >
//             <div className="card card-file">
//               {(file?.locked_by?.email === userEmail  || !file?.locked_by) && (
//                 <div className="checkbox-container">
//                   <input
//                     type="checkbox"
//                     checked={checkedFiles.includes(file.id)}
//                     onChange={() => handleCheckboxChange(file.id)}
//                     style={{ accentColor: "#DFAA42" }}
//                   />
//                 </div>
//               )}
//               {(file?.locked_by?.email === userEmail  || !file?.locked_by) && (
//                 <div className="dropdown-file">
//                   <Link
//                     to="#"
//                     className="dropdown-link"
//                     data-bs-toggle="dropdown"
//                     onClick={(e) => file?.locked_by && e.preventDefault()}
//                   >
//                     <i className="fa fa-ellipsis-v" />
//                   </Link>
//                   <div className="dropdown-menu dropdown-menu-right">
//                     <Link
//                       to={`/groups/${groupId}/files/${file.id}/details`}
//                       className="dropdown-item"
//                     >
//                       View Details
//                     </Link>
//                     <Link to="#" className="dropdown-item">
//                       Delete
//                     </Link>
//                   </div>
//                 </div>
//               )}
//               <div className="card-file-thumb">
//                 <i className={`fa-regular fa-regular fa-file-code `} />
//               </div>
//               <div className="card-body">
//                 <h6>
//                   <Link to="#">{file.name}</Link>
//                 </h6>
//                 <span>{file.fileSize}</span>
//               </div>
//               <div className="card-footer">
//                 {file?.locked_by ? (
//                   <Tooltip
//                     title={`This file is locked by: ${file?.locked_by?.user_name}`}
//                   >
//                     <span style={{ color: "#DFAA42" }}>
//                       Is Locked By: {file?.locked_by?.user_name}
//                     </span>
//                   </Tooltip>
//                 ) : (
//                   <span style={{ color: "#DFAA42" }}>Not Locked </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div style={{ width: "78vw", textAlign: "center" }}>
//           <img
//             src={noFileImage}
//             alt="No files available"
//             style={{
//               width: "100%",
//               height: "40%",
//               objectFit: "contain",
//             }}
//           />
//         </div>
//       )}
//       {files && files.length > 0 && (
//         <div style={{ textAlign: "right", width: "100%" }}>
//           <Button
//             variant="contained"
//             style={{ backgroundColor: "#DFAA42" }}
//             onClick={handleLockFiles}
//             disabled={checkedFiles.length === 0 || loading}
//           >
//             {loading ? "Loading..." : "Check In"}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Files;
