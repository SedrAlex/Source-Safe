import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PageHeader from "@layout/PageHeader";
import CoverImage from "../../src/assets/Invitation.png";
import { useSendInvitationMutation } from "api/groups/groupsApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import InvitationForm from "@ui/Forms/InvitationForm";

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  accessLevel: z.string().min(1, "Access level is required"),
});

const Invitation = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      accessLevel: "",
    },
  });

  const [sendInvitation] = useSendInvitationMutation();
  const { groupId } = useParams();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('accessLevel', data.accessLevel);
      formData.append('groupId', groupId); // Append groupId to the form data

      const response = await sendInvitation(formData).unwrap();
      toast.success("Invitation sent successfully!");
      console.log("Response:", response);
    } catch (error) {
      toast.error("Failed to send invitation.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <PageHeader title={"Invite A Member"} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <InvitationForm     />       
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={CoverImage}
            alt="Center Image"
            className="d-none d-md-block"
            style={{
              maxWidth: "100%",
              height: "640px",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Invitation;
