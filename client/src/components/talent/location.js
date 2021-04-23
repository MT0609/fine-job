import React, { useState } from "react";
import { Grid, Button, TextField, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

function LocationsAdd(props) {
  const { defaultValues = [""], onEdit, error, setError } = props;

  const [locations, setLocations] = useState(defaultValues);

  const handleChangeLocation = (e, index) => {
    let newLocations = [...locations];
    newLocations[index] = e.target.value;
    setLocations(newLocations);
    if (onEdit) onEdit(newLocations);
    if (setError) setError("");
  };

  const handleAddLocation = (e, index) => {
    let newLocations = [...locations];
    newLocations.splice(index + 1, 0, "");
    setLocations(newLocations);
    if (onEdit) onEdit(newLocations);
    if (setError) setError("");
  };

  const handleDeleteLocation = (e, index) => {
    let newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
    if (onEdit) onEdit(newLocations);
    if (setError) setError("");
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={2} xs={12}>
        <div style={{ paddingTop: "1rem" }}>Locations</div>
      </Grid>
      <Grid item sm={10} xs={12}>
        <Grid container spacing={2} direction="column" alignItems="flex-start">
          {locations.map((location, index) => (
            <Grid item style={{ width: "100%" }}>
              <TextField
                style={{ marginTop: "-10px", width: "60%" }}
                label={`Location ${index + 1}`}
                value={location}
                fullWidth
                inputProps={{ style: { fontSize: 15 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 15 } }}
                onChange={(e) => handleChangeLocation(e, index)}
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
                onClick={(e) => handleAddLocation(e, index)}
              >
                <AddIcon fontSize="small" />
              </Button>
              {locations.length > 1 && (
                <Button
                  style={{
                    margin: "0 0.5rem 0 0.5rem",
                    padding: "0.5rem",
                    minWidth: "fit-content",
                  }}
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={(e) => handleDeleteLocation(e, index)}
                >
                  <DeleteIcon style={{}} fontSize="small" />
                </Button>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
      {error && (
        <Box
          style={{
            color: "red",
            textAlign: "left",
            fontStyle: "italic",
            fontSize: "0.8rem",
          }}
        >
          {error && <span>* {error}</span>}
        </Box>
      )}
    </Grid>
  );
}

export default LocationsAdd;
