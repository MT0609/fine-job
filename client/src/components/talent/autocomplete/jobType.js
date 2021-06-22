import React from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Box } from "@material-ui/core";

function JobTypeAutoComplete(props) {
  const { types, selectedTypes = [], onchange, error, setError } = props;
  const { t } = useTranslation();

  return (
    <>
      <Autocomplete
        multiple
        limitTags={3}
        options={types}
        getOptionLabel={(option) => option}
        defaultValue={selectedTypes}
        filterSelectedOptions
        onChange={(event, newValue) => {
          onchange(newValue);
          setError("");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            label={t("job.employmentType")}
            name="skills"
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

export default JobTypeAutoComplete;
