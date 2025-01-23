import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import styles from "./styles.module.scss";
import Spring from "@components/Spring";
import { useThemeProvider } from "@contexts/themeContext";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import cover from "@assets/cover.jpg";
import bvb from "@assets/clubs/computer.png";
import { useAcceptInvitationMutation, useRejectInvitationMutation } from "api/groups/groupsApi";
import { toast } from "react-toastify";

const InvitationCard = ({ clubData, owned }) => {
  const { theme } = useThemeProvider();
  const { width } = useWindowSize();
  const [isPrivate, setIsPrivate] = useState(clubData?.type === "private");
  const navigate = useNavigate();
  const [acceptInvitation, { isLoading: isAccepting, error: acceptError }] = useAcceptInvitationMutation();
  const [rejectInvitation, { isLoading: isRejecting, error: rejectError }] = useRejectInvitationMutation();

  const handleAcceptClick = async () => {
    const invitationId = clubData?.id;
    if (!invitationId) {
      toast.error("Invitation ID is undefined");
      return;
    }
    try {
      await acceptInvitation(invitationId);
      toast.success("Invitation accepted");
    } catch (error) {
      toast.error("Error accepting invitation");
      console.error("Error accepting invitation:", error);
    }
  };

  const handleRejectClick = async () => {
    const invitationId = clubData?.id;
    if (!invitationId) {
      toast.error("Invitation ID is undefined");
      return;
    }
    try {
      await rejectInvitation(invitationId);
      toast.success("Invitation rejected");
    } catch (error) {
      toast.error("Error rejecting invitation");
      console.error("Error rejecting invitation:", error);
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
          src={clubData?.group?.bg_image_url || cover}
          style={{ width: "100%", height: "auto" }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "black",
              color: "black",
              cursor: "pointer",
              marginRight: '10px'
            }}
            onClick={handleAcceptClick}
            disabled={isAccepting}
          >
            {isAccepting ? "Accepting..." : "Accept"}
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "black",
              color: "black",
              cursor: "pointer"
            }}
            onClick={handleRejectClick}
            disabled={isRejecting}
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </Button>
        </div>
      </div>
      <div
        className={`${styles.content} d-flex flex-column align-items-start justify-content-between h-100`}
      >
        <img
          className="club-logo"
          src={clubData?.group?.icon_image_url || bvb}
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
          <h6 className="text-black text-overflow">
            Your role in this group is {clubData?.role} 
          </h6>
         
        </div>
      </div>
    </Spring>
  );
};

export default InvitationCard;
