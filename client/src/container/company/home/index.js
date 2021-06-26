import React from "react";
import { useTranslation } from "react-i18next";
import HomeSection from "../homeSection";

function CompanyHome({ company = [] }) {
  const { t } = useTranslation();
  return (
    <div>
      <HomeSection title={t("company.about")} content={company.about} />

      <HomeSection
        title={t("company.specialties")}
        list={company.baseInfo?.specialties || []}
      />
    </div>
  );
}

export default CompanyHome;
