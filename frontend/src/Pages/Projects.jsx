import React, { useState, useEffect } from "react";
import {
  Container,
  Grid2 as Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import StyledCard from "../Components/ProjectCard";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject
} from "../service/projectAPI";
import { AddProjectModal } from "../Components/AddProjectModal";

const Projects = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const [addDialog, setDialog] = useState();

  const init = () => {
    getAllProjects()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        
        toast.error(err.response.data.message);
      });
  };

  const handleClose = () => {
    setDialog();
    setOpen(false);
  };

  const addProjectService = (data) => {
    addProject(data)
      .then((res) => {
        toast.success("project added successfully");
        setOpen(false);
        init();
        setDialog();
      })
      .catch((err) => {
        setDialog();
        console.log(err);
        setOpen(false);
        toast.error(err.response.data.message);
      });
  };

  const editProjectService = (id,data) => {
    updateProject(id,data)
      .then((res) => {
        toast.success("project updated successfully");
        setOpen(false);
        init();
        setDialog();
      })
      .catch((err) => {
        console.log(err);
        setDialog();
        setOpen(false);
        toast.error(err.response.data.message);
      });
  };


  const deleteProjectService = (id) => {
    deleteProject(id)
      .then((res) => {
        toast.success("project deleted successfully");
        setOpen(false);
        init();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleProject = (
    e,
    upd = Boolean(false),
    button = "Add",
    data = {}
  ) => {

    
    setOpen(true);


    setDialog(() => (
      <AddProjectModal
        handleClose={handleClose}
        open={true}
        handleSubmit={upd?editProjectService:addProjectService}
        updated={upd}
        title={button}
        data={data}
      />
    ));
  };


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    init();
  }, []);

  return (
    <>
      <Box className="mainHeading">
        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Projects
        </Typography>

        <Button variant="contained" onClick={() => handleProject()}>
          Add Project
        </Button>

       
      </Box>
      {addDialog}

      {/* <Card style={{   boxShadow: "none", backgroundColor: "#dadada", margin: "4rem 4rem", }}> */}
      <Container fixed>
        <Grid paddingTop={7} paddingBottom={7} container spacing={3}>
          {data &&
            data.map((item, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                <StyledCard handleDelete={deleteProjectService} handleProject={handleProject} data={item} />
              </Grid>
            ))}
        </Grid>
      </Container>
      {/* </Card> */}
    </>
  );
};

export default Projects;
