import React, { useState } from "react";
import { Button, IconButton, Box } from "@mui/material";
import styles from "./styles.module.scss";
import Spring from "@components/Spring";
import StatsBadge from "@ui/StatsBadge";
import { useThemeProvider } from "@contexts/themeContext";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import cover from "@assets/cover.jpg";
import bvb from "@assets/clubs/computer.png";
import lockIcon from "@assets/lock.png";
import envelopeIcon from "@assets/envelop.png";
import detailsIcon from "@assets/details.png";
import trashIcon from "@assets/trash.png";
import { useDeleteGroupMutation } from "api/groups/groupsApi";
import { toast } from "react-toastify";

const Group = ({ clubData, owned }) => {
  const { theme } = useThemeProvider();
  const { width } = useWindowSize();
  const [isPrivate, setIsPrivate] = useState(clubData?.type === "private");
  const navigate = useNavigate();
  const [deleteGroup] = useDeleteGroupMutation();

  const data = [
    { label: "Users", shortLabel: "U", value: 17, path: "users" },
    { label: "Files", shortLabel: "F", value: 29, path: "files" },
  ];

  const handleChipClick = (path) => {
    console.log(`Navigating to /groups/${clubData?.id}/${path}`);
    navigate(`/groups/${clubData?.id}/${path}`);
  };

  const handleInviteClick = () => {
    console.log(`Navigating to /groups/${clubData?.id}/invite`);
    navigate(`/groups/${clubData?.id}/invite`);
  };

  const handlePreviewClick = () => {
    console.log(`Navigating to /groups/${clubData?.id}/`);
    navigate(`/groups/${clubData?.id}/`);
  };
  const handleDeleteClick = async () => {
    try {
      await deleteGroup(clubData?.id).unwrap();
      toast.success("Group Deleted successfully!");
      navigate(`/groups`);
    } catch (error) {
      toast.error("Failed to Delete group.");
    }
  };
  return (
    <Spring
      className={`${styles.container} ${
        theme === "light" ? styles.light : styles.dark
      } card no-shadow card-padded text-black`}
    >
      <div sx={{ position: "relative" }}>
        <img
          className={`${styles.cover} cover`}
          src={clubData?.bg_image_url || cover}
          style={{ width: "100%", height: "auto" }}
        />
        <Box
          sx={{
            position: "absolute",
            right: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          {isPrivate && (
            <IconButton
              size="small"
              sx={{ cursor: "pointer" }}
              onClick={handlePreviewClick}
            >
              <img
                src={lockIcon}
                alt="Lock Icon"
                style={{ width: 35, height: 35, paddingBottom: 2.0 }}
              />
            </IconButton>
          )}
          {owned && (
            <>
              <IconButton
                size="small"
                sx={{ cursor: "pointer" }}
                onClick={handlePreviewClick}
              >
                <img
                  src={detailsIcon}
                  alt="Details Icon"
                  style={{ width: 30, height: 30 }}
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{ cursor: "pointer" }}
                onClick={handleInviteClick}
              >
                <img
                  src={envelopeIcon}
                  alt="Envelope Icon"
                  style={{ width: 30, height: 30 }}
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{ cursor: "pointer" }}
                onClick={handleDeleteClick}              >
                <img
                  src={trashIcon}
                  alt="Trash Icon"
                  style={{ width: 30, height: 30 }}
                />
              </IconButton>
            </>
          )}
        </Box>
      </div>
      <div
        className={`${styles.content} d-flex flex-column align-items-start justify-content-between h-100`}
      >
        <img
          className="club-logo"
          src={clubData?.icon_image_url || bvb}
          alt="Club Icon"
        />
        <div
          className={`${styles.content_header} d-flex flex-column g-4 flex-1`}
        >
          <h2 className={`${styles.club} text-20 text-black text-overflow`}>
            {clubData?.name || "React Group"}
          </h2>
          <h4 className="text-black text-overflow">
            {clubData?.description || "Paris, France"}
          </h4>
        </div>
        <div className="d-flex flex-wrap g-20" style={{ marginTop: "10px" }}>
          {data.map((item, index) => (
            <StatsBadge
              key={index}
              label={
                width >= 1024
                  ? width >= 1500 && width < 1920
                    ? item.shortLabel
                    : item.label
                  : item.shortLabel
              }
              value={item.value}
              onClick={() => handleChipClick(item.path)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </Spring>
  );
};

export default Group;
