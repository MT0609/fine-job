import React from "react";
import HomeSection from "../homeSection";

function CompanyHome({ company = [] }) {
  return (
    <div>
      <HomeSection title="About" content={company.about} />

      <HomeSection
        title="Specialties"
        list={company.baseInfo?.specialties || []}
      />
    </div>
  );
}

export default CompanyHome;
