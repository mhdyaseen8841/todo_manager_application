import React, { useEffect, useState } from "react";
import {
  Container,
  Grid2 as Grid,
  TextField,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../service/todoAPI";
import { toast } from "react-toastify";
import TodoCard from "../Components/TodoCard";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import IosShareIcon from "@mui/icons-material/IosShare";

import { AddTodoModal } from "../Components/AddTodoModal";
import { updateProject,exportSummary } from "../service/projectAPI";
const Todo = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [initialTitle, setInitialTitle] = useState("");

  const [addDialog, setDialog] = useState();

  const init = () => {
    getAllTodo(id)
      .then((res) => {
        console.log(res);
        setTitle(res.data.title);
        setInitialTitle(res.data.title);
        setData(res.data.list_of_todos);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        toast.error("Project not found or some error occured");
        navigate("/");
      });
  };

  const handleClose = () => {
    setDialog();
  };

  const addTodoService = (data) => {
    addTodo({ projectId: id, ...data })
      .then((res) => {
        toast.success("TODO added successfully");
        init();
        setDialog();
      })
      .catch((err) => {
        setDialog();
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const editTodoService = (id, data) => {
    updateTodo(id, data)
      .then((res) => {
        toast.success("Todo updated successfully");
        init();
        setDialog();
      })
      .catch((err) => {
        console.log(err);
        setDialog();
        toast.error(err.response.data.message);
      });
  };

  const deleteTodoService = (id) => {
    deleteTodo(id)
      .then((res) => {
        toast.success("Todo deleted successfully");
        init();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const updateStatus = (id, data) => {
    if (data.status == "pending") {
      data.status = "completed";
    } else {
      data.status = "pending";
    }
    updateTodo(id, data)
      .then((res) => {
        toast.success("Todo Moved to " + data.status);
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
    setDialog(() => (
      <AddTodoModal
        handleClose={handleClose}
        open={true}
        handleSubmit={upd ? editTodoService : addTodoService}
        updated={upd}
        title={button}
        data={data}
      />
    ));
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    updateProject(id, { title })
      .then((res) => {
        toast.success("project title successfully");
        setInitialTitle(title);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setIsEditing(false);
  };


  const handleExport = async (id) => {
    try {

      exportSummary({id}).then((res)=>{
        toast.success("exported summary as gist completed");
        console.log(res)

        console.log(res.gistUrl)
        toast.info(
          <a 
            href={res.gistUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#0000EE', textDecoration: 'underline' }}
          >
            Gist URL: {res.gistUrl}
          </a>, 
          {
            autoClose: 5000, 
          }
        );
        
      

      }).catch((err)=>{
        
        console.log(err);
       // toast.error(err.response.data.message);
      })
    } catch (error) {
        console.error('Error:', error);
    }
};



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (!id) {
      navigate("/");
    } else {
      init();
    }
  }, []);

  return (
    <>
      <Box className="mainHeading">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {isEditing ? (
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              size="small"
              label="Project Title"
            />
          ) : (
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                display: { xs: "flex", md: "flex" },
                fontWeight: 600,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {title}
            </Typography>
          )}

          <IconButton
            onClick={isEditing ? handleSave : handleEditToggle}
            size="small"
          >
            {isEditing ? <CheckIcon /> : <ModeEditIcon />}
          </IconButton>

          {isEditing && (
            <IconButton onClick={handleCancel} size="small">
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Button variant="contained" onClick={() => handleProject()}>
          <AddIcon /> Add Todo
        </Button>
      </Box>
      <Box className="subHeading">
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "flex", md: "flex" },
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Todos
        </Typography>

        <Button
          sx={{
            mr: 5,
          }}
          variant="outlined"
          onClick={() => handleExport(id)}
        >
          <IosShareIcon />
          Export Summary
        </Button>
      </Box>
      {addDialog}

      <Grid container>
        <Grid size={{ md: 6, xs: 12 }}>
          <Card
            sx={{
              boxShadow: "none",
              backgroundColor: "#ffc570",
              minHeight: {
                xs: "200px",
                md: `calc(100vh - 100px)`,
              },
              margin: { xs: "4rem 2rem", md: "4rem 3rem" },
            }}
          >
            <Container fixed>
              <Grid paddingTop={7} paddingBottom={7} container spacing={3}>
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "flex" },
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Pending
                </Typography>

                {data &&
                data.filter((item) => item.status === "pending").length > 0 ? (
                  data
                    .filter((item) => item.status === "pending")
                    .map((item, idx) => (
                      <Grid key={idx} size={{ xs: 12 }}>
                        <TodoCard
                          updateStatus={updateStatus}
                          handleDelete={deleteTodoService}
                          handleProject={handleProject}
                          data={item}
                        />
                      </Grid>
                    ))
                ) : (
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: "100%" }}
                  >
                    <Typography variant="h6">
                      No Pending todos.. Enjoy😇
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Container>
          </Card>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card
            sx={{
              boxShadow: "none",
              backgroundColor: "#81c784",
              minHeight: {
                xs: "200px",
                md: `calc(100vh - 100px)`,
              },
              margin: { xs: "4rem 2rem", md: "4rem 3rem" },
            }}
          >
            <Container fixed>
              <Grid paddingTop={7} paddingBottom={7} container spacing={3}>
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "flex" },
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Completed
                </Typography>

                {data &&
                data.filter((item) => item.status === "completed").length >
                  0 ? (
                  data
                    .filter((item) => item.status === "completed")
                    .map((item, idx) => (
                      <Grid key={idx} size={{ xs: 12 }}>
                        <TodoCard
                          updateStatus={updateStatus}
                          handleDelete={deleteTodoService}
                          handleProject={handleProject}
                          data={item}
                        />
                      </Grid>
                    ))
                ) : (
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: "100%" }}
                  >
                    <Typography color="white" variant="h6">
                      No completed todos available
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Container>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Todo;
