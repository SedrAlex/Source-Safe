import React from 'react';
import { useGetFilesQuery } from 'api/files/filesApi';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import noFile from "../assets/nofiles.png"
import { useParams } from "react-router-dom";

const Files = () => {
  const { data: files, isLoading, error } = useGetFilesQuery();
  const { groupId } = useParams();

 

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {files && files.length > 0 ? (
        <Typography>Files are available</Typography>
      ) : (
        <>
          <img
            src={noFile}
            alt="No files"
            style={{ width: '500px', marginBottom: '20px', objectFit:"cover"}}
          />
          <Button
            component={Link}
            to={`/groups/${groupId}/files/new`}            
            variant="contained"
            sx={{
              backgroundColor: "#DFAA42",
              "&:hover": {
                backgroundColor: "#DFAA42",
              },
            }}
          >
            Create a New File
          </Button>
        </>
      )}
    </Box>
  );
};

export default Files;
