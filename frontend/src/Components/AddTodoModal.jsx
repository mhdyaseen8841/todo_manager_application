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

export const AddTodoModal = (props) => {
  const [description, setDescription] = React.useState(props.data?.description || "");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = () => {
    if (description == "") {
      toast.error("enter Todo description");
      return;
    }

    {
      props.updated
        ? props.data.description === description
          ? toast.error("no change in description")
          : props.handleSubmit(props.data._id, { description })
        : props.handleSubmit({ description });
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
          <Typography>{props.title} Todo</Typography>
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
            label="Todo Description"
            value={description}
            type="text"
            fullWidth
            onChange={handleDescriptionChange}
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
