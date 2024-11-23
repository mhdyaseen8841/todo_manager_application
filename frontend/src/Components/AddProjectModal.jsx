import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    // Adjust width here
    width: "600px", // Set fixed width
    maxWidth: "600px", // Ensure max width doesn't restrict
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const AddProjectModal = (props) => {
  const [title, setTitle] = React.useState(props.data?.title || "");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    if (title == "") {
      toast.error("enter project title");
      return;
    }

    {
      props.updated
        ? props.data.title === title
          ? toast.error("no change in title")
          : props.handleSubmit(props.data._id, { title })
        : props.handleSubmit({ title });
    }
  };

  return (
    <React.Fragment>
      <StyledDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography>{props.title} Project</Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            variant="outlined"
            autoFocus
            required
            margin="dense"
            id="name"
            label="Project Name"
            value={title}
            type="text"
            fullWidth
            onChange={handleTitleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </StyledDialog>
    </React.Fragment>
  );
};
