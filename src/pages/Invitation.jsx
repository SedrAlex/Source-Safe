import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PageHeader from "@layout/PageHeader";
import CoverImage from "../../src/assets/invitation.jpg";
import { useSendInvitationMutation } from "api/groups/groupsApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

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
      <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: "20px", position: "relative" }}>
        <img src={CoverImage} alt="Center Image" style={{ maxWidth: "100%", height: "600px", objectFit: "cover", borderRadius: "10px" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(223, 170, 66,0.3)", borderRadius: "10px", zIndex: 1 }}></div>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="accessLevel"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Access Level"
                  variant="outlined"
                  fullWidth
                  error={!!errors.accessLevel}
                  helperText={errors.accessLevel ? errors.accessLevel.message : ""}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="read">Read Only</option>
                  <option value="write">Full Access</option>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#DFAA42",
                "&:hover": {
                  backgroundColor: "#DFAA42",
                },
              }}
            >
              Send Invitation
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Invitation;
