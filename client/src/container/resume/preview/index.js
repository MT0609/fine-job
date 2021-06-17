import React from "react";
import { Email, Phone } from "@material-ui/icons";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";

export default function ResumePreview(props) {
  const { data, open, onclose } = props;

  console.log(data);

  const handleClose = () => {
    if (onclose) onclose();
  };

  return (
    <>
      {data && data.userSnapShort && (
        <>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>{data.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <h4>
                  {data.userSnapShort.baseInfo.firstName}{" "}
                  {data.userSnapShort.baseInfo.lastName}
                </h4>
                <p>{data.userSnapShort.baseInfo.locations}</p>
                <p>
                  <Email />
                  {data.userSnapShort.contact.email}
                </p>
                <p>
                  <Phone />
                  {data.userSnapShort.contact.phone}
                </p>
                <p>
                  <img
                    width={20}
                    src={
                      "https://res.cloudinary.com/dghvjalhh/image/upload/v1623904294/avatars/job_cycxwz.svg"
                    }
                    alt="fine-job"
                  />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${window.location.protocol}//${window.location.host}/profile/${data.userID}`}
                  >
                    {`${window.location.protocol}//${window.location.host}/profile/${data.userID}`}
                  </a>
                </p>
                <div>
                  <p>Education</p>
                </div>
                <div>
                  <p>Skills</p>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </>
      )}
    </>
  );
}
