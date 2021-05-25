import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {
  Grid,
  Box,
  Button,
  Avatar,
  TextField,
  Divider,
} from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import { ApplyJobSchema } from "../../../utils/validation";
import styles from "./index.module.scss";

function JobApplyDialog(props) {
  const { user = null, job = {}, show = false, onclose, onsubmit } = props;

  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => {
    if (onclose) onclose();
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ApplyJobSchema),
  });

  const onSubmit = (data) => {
    const { email, phone, cv } = data;
    let formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("cv", cv[0]);
    if (onsubmit) onsubmit(job.id, formData);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Dialog
      open={show}
      keepMounted
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      {user && (
        <>
          <DialogTitle>Apply Job: {job.title}</DialogTitle>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <p className={styles.title}>Contact info</p>
              <Grid container spacing={1} style={{ marginBottom: "1rem" }}>
                <Grid item>
                  <Avatar
                    src={
                      user.avatar ||
                      "https://res.cloudinary.com/dghvjalhh/image/upload/v1618850154/avatars/sxqvw0io5dmkg4apx30d.jpg"
                    }
                    alt="avatar"
                  />
                </Grid>
                <Grid item>
                  <p>
                    {user.baseInfo.firstName} {user.baseInfo.lastName}
                  </p>
                  <p>{user.baseInfo.headLine}</p>
                  <Box display="flex">
                    <LocationOn fontSize="small" />
                    {user.baseInfo.locations || "Location"}
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    inputRef={register}
                    label="Email *"
                    name="email"
                    variant="outlined"
                    defaultValue={user.contact.email}
                  />
                  <Box className={styles.error}>
                    {errors.email && <span>* {errors.email.message}</span>}
                  </Box>
                </Grid>
                <Grid item>
                  <TextField
                    inputRef={register}
                    label="Phone *"
                    name="phone"
                    variant="outlined"
                    defaultValue={user.contact.phone}
                  />
                  <Box className={styles.error}>
                    {errors.phone && <span>* {errors.phone.message}</span>}
                  </Box>
                </Grid>
              </Grid>

              <br />
              <p className={styles.title}>
                Resume - type: DOC, DOCX, PDF (maximum 5 MB)
              </p>
              <Button variant="outlined" color="primary" component="label">
                Upload File
                <input
                  ref={register}
                  name="cv"
                  type="file"
                  accept=".doc,.docx,.pdf"
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
              <div className="file-name">
                {selectedFile ? <p>{selectedFile.name}</p> : null}
              </div>
              <Box className={styles.error}>
                {errors.cv && <span>* {errors.cv.message}</span>}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Apply
              </Button>
            </DialogActions>
          </form>
        </>
      )}
    </Dialog>
  );
}

export default JobApplyDialog;
