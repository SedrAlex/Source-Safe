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

const Group = ({ clubData, id }) => {
  const { theme } = useThemeProvider();
  const { width } = useWindowSize();
  const [isPrivate, setIsPrivate] = useState(clubData?.isPrivate);
  const navigate = useNavigate();

  const data = [
    { label: "Users", shortLabel: "U", value: 17, path: "users" },
    { label: "Files", shortLabel: "F", value: 29, path: "files" },
  ];

  const handleChipClick = (path) => {
    console.log(`Navigating to /groups/${id}/${path}`);
    navigate(`/groups/${id}/${path}`);
  };

  const handleInviteClick = () => {
    console.log(`Navigating to /groups/${id}/invite`);
    navigate(`/groups/${id}/invite`);
  };

  return (
    <Spring
      className={`${styles.container} ${
        theme === "light" ? styles.light : styles.dark
      } card no-shadow card-padded text-black`}
    >
      <Box sx={{ position: "relative" }}>
        <img
          className={`${styles.cover} cover`}
          src={clubData?.cover || cover}
          style={{ width: "100%", height: "auto" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            alignItems: "center",
          }}
        >
          {isPrivate && (
            <IconButton size="small" sx={{ ml: 1, cursor: 'pointer' }}>
              <img
                src={lockIcon}
                alt="Lock Icon"
                style={{ width: 35, height: 35, paddingBottom: 2.0 }}
              />
            </IconButton>
          )}
          <IconButton
            size="small"
            sx={{ ml: 1, cursor: 'pointer' }}
            // onClick={handleInviteClick}
          >
            <img
              src={envelopeIcon}
              alt="Envelope Icon"
              style={{ width: 30, height: 30 }}
            />
          </IconButton>
          <IconButton
            size="small"
            sx={{ ml: 1, cursor: 'pointer' }}
            onClick={handleInviteClick}
          >
            <img
              src={detailsIcon}
              alt="Details Icon"
              style={{ width: 30, height: 30 }}
            />
          </IconButton>
        </Box>
      </Box>
      <div
        className={`${styles.content} d-flex flex-column align-items-start justify-content-between h-100`}
      >
        <img
          className="club-logo"
          src={clubData?.icon || bvb}
          alt="Club Icon"
        />
        <div
          className={`${styles.content_header} d-flex flex-column g-4 flex-1`}
        >
          <h2 className={`${styles.club} text-20 text-black text-overflow`}>
            {clubData?.title || "React Group"}
          </h2>
          <h4 className="text-black text-overflow">
            {clubData?.description || "Paris, France"}
          </h4>
        </div>
        <div className="d-flex flex-wrap g-20 badge">
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
              style={{ cursor: 'pointer' }} 
            />
          ))}
        </div>
      </div>
    </Spring>
  );
};

export default Group;
