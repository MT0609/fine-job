import React from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Box } from "@material-ui/core";

function SkillAutoComplete(props) {
  const { skills, selectedSkills = [], onchange, error, setError } = props;
  const { t } = useTranslation();

  return (
    <>
      <Autocomplete
        multiple
        limitTags={3}
        options={skills}
        getOptionLabel={(option) => option}
        defaultValue={selectedSkills}
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
            label={t("job.skills")}
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

export default SkillAutoComplete;
