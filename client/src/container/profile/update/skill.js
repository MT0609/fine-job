import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import SkillAutoComplete from "../../../components/talent/autocomplete/skills";
import * as JOBCONSTANTS from "../../../constants/jobConstants";

export default function ProfileUpdate(props) {
  const { user, show, onclose, onsubmit } = props;

  const { t } = useTranslation();
  const [skills, setSkills] = useState(user?.skills);
  const [skillError, setSkillError] = useState("");

  const handleClose = () => {
    if (onclose) onclose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onsubmit) onsubmit(skills);
  };

  return (
    <Dialog fullWidth open={show} onClose={handleClose}>
      <DialogTitle>{t("people.skills")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <SkillAutoComplete
            skills={JOBCONSTANTS.JOBSKILLS}
            selectedSkills={user.skills}
            error={skillError}
            onchange={(values) => setSkills(values)}
            setError={(err) => setSkillError(err)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("people.cancelButton")}
          </Button>
          <Button type="submit" color="primary">
            {t("people.saveButton")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
