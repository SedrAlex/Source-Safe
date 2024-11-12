import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PageHeader from "@layout/PageHeader";
import CoverImage from "../../src/assets/coverr.webp";
import { MuiFileInput } from "mui-file-input";
import { useCreateGroupMutation } from "api/groups/groupsApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useCreateFileMutation } from "api/files/filesApi";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

const NewFile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const [bgFile, setBgFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [createFile] = useCreateFileMutation();
  const { groupId } = useParams();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (fileUrl) formData.append("fileUrl", fileUrl);
      if (bgFile) formData.append("background", bgFile);

      const response = await createFile(formData).unwrap();
      toast.success("File created successfully!");
      console.log("Response:", response);
    } catch (error) {
      toast.error("Failed to create file.");
      console.error("Error:", error);
    }
  };

  const handleFileChange = (newValue) => {
    setFileUrl(newValue);
  };

  const handleBgChange = (newValue) => {
    setBgFile(newValue);
  };

  return (
    <>
      <PageHeader title={"New File"} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "20px", position: "relative" ,}}
      >
        <img
          src={CoverImage}
          alt="Center Image"
          style={{
            maxWidth: "100%",
            height: "600px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            // backgroundColor: "rgba(223, 170, 66,0.3)",
            borderRadius: "10px",
            zIndex: 1,
          }}
        ></div>
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
                  label="File Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <MuiFileInput
              placeholder="Insert File Background Image"
              value={bgFile}
              onChange={handleBgChange}
              sx={{ width: "100%" }}
            />
            {bgFile && <p>{bgFile.name}</p>}
          </Grid>
          <Grid item xs={12}>
            <MuiFileInput
              placeholder="Insert File Url"
              value={fileUrl}
              onChange={handleFileChange}
              sx={{ width: "100%" }}
            />
            {fileUrl && <p>{fileUrl.name}</p>}
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
              {"Create File"}{" "}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewFile;
