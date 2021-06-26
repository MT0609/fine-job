import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function CVSkillUpdate(props) {
  const { allSkills = [], userSkills = [], open, onclose, onsubmit } = props;

  const [skills, setSkills] = useState([]);

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSubmit = () => {
    if (onsubmit) onsubmit({ skills });
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle style={{ paddingBottom: 0 }}>Edit Skills</DialogTitle>
      <DialogContent>
        <Autocomplete
          multiple
          options={allSkills}
          getOptionLabel={(option) => option}
          defaultValue={userSkills}
          filterSelectedOptions
          onChange={(event, newValue) => {
            setSkills(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              label="Skills"
              name="skills"
              placeholder="Add more skills"
            />
          )}
        />
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
