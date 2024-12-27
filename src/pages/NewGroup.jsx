import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PageHeader from "@layout/PageHeader";
import CoverImage from "../../src/assets/cover_image.png";
import { MuiFileInput } from "mui-file-input";
import { useCreateGroupMutation } from "api/groups/groupsApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import BasicInputs from "@ui/Forms/BasicInputs";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  type: z.enum(["public", "private"], "Type must be either public or private"),
});

const NewGroup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      type: "public",
    },
  });

  const [logoFile, setLogoFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [createGroup] = useCreateGroupMutation();
  const { groupId } = useParams();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("type", data.type);
      if (logoFile) formData.append("logo", logoFile);
      if (bgFile) formData.append("background", bgFile);

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
      <PageHeader title={groupId !== "new" ? "Update Group" : "New Group"} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <BasicInputs     />       
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={CoverImage}
            alt="Center Image"
            style={{
              maxWidth: "100%",
              height: "650px",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default NewGroup;
