import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Box } from "@material-ui/core";

function CompanyAutoComplete(props) {
  const { companies, onchange, error, setError } = props;

  return (
    <>
      <Autocomplete
        // freeSolo
        options={companies}
        getOptionLabel={(option) => option?.name}
        filterSelectedOptions
        onChange={(event, newValue) => {
          onchange(newValue?.id);
          setError("");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            label="Company"
            name="skills"
            placeholder="Choose company"
          />
        )}
      />
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
    </>
  );
}

export default CompanyAutoComplete;
