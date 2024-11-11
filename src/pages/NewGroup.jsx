import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PageHeader from "@layout/PageHeader";
import CoverImage from "../../src/assets/CoverImage.webp";
import { MuiFileInput } from "mui-file-input";
import { useCreateGroupMutation } from "api/groups/groupsApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["public", "private"], "Type must be either public or private"),
});

const NewGroup = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: "public",
    },
  });

  const [logoFile, setLogoFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [createGroup] = useCreateGroupMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('type', data.type);
      if (logoFile) formData.append('logo', logoFile);
      if (bgFile) formData.append('background', bgFile);

      const response = await createGroup(formData).unwrap();
      toast.success("Group created successfully!");
      console.log("Response:", response);
    } catch (error) {
      toast.error("Failed to create group.");
      console.error("Error:", error);
    }
  };

  const handleLogoChange = (newValue) => {
    setLogoFile(newValue);
  };

  const handleBgChange = (newValue) => {
    setBgFile(newValue);
  };

  return (
    <>
      <PageHeader title="New Group" />
      <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: "20px", position: "relative" }}>
        <img src={CoverImage} alt="Center Image" style={{ maxWidth: "100%", height: "600px", objectFit: "contain", borderRadius: "10px" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(223, 170, 66,0.3)", borderRadius: "10px", zIndex: 1 }}></div>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Group Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Group Type"
                  variant="outlined"
                  fullWidth
                  error={!!errors.type}
                  helperText={errors.type ? errors.type.message : ""}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <MuiFileInput
              placeholder="Insert Group Background Image"
              value={logoFile}
              onChange={handleLogoChange}
              sx={{ width: "100%" }}
            />
            {logoFile && <p>{logoFile.name}</p>}
          </Grid>
          <Grid item xs={12}>
            <MuiFileInput
              placeholder="Insert Group Icon Image"
              value={bgFile}
              onChange={handleBgChange}
              sx={{ width: "100%" }}
            />
            {bgFile && <p>{bgFile.name}</p>}
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
              Create Group
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewGroup;
