import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Delete } from "@material-ui/icons";

export default function LicenseAndCertUpdate(props) {
  const { licenseAndCerts = [], open, onclose, onsubmit } = props;

  const [licenseAndCertState] = useState(licenseAndCerts);

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSubmit = () => {
    if (onsubmit) onsubmit({ licenseAndCertState });
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
      <DialogTitle style={{ paddingBottom: 0 }}>
        Edit License and Certifications
      </DialogTitle>
      <DialogContent style={{ paddingTop: 0 }}>
        {licenseAndCertState.map((item, index) => (
          <Grid item style={{ width: "100%" }}>
            <TextField
              style={{ marginTop: "-10px", width: "60%" }}
              label={`Location ${index + 1}`}
              value={item.name}
              fullWidth
              inputProps={{ style: { fontSize: 15 } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 15 } }}
              // onChange={(e) => handleChangeLocation(e, index)}
            />
            <Button
              style={{
                margin: "0 0.5rem 0 0.5rem",
                padding: "0.5rem",
                minWidth: "fit-content",
              }}
              type="button"
              variant="outlined"
              color="primary"
            >
              <Delete fontSize="small" />
            </Button>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
