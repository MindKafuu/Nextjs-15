import React, { useMemo } from "react";

export const CampaignHeader = ({ header }: { header: string }) => {
  return (
    <div className="px-4 py-2 rounded-3xl bg-amber-200">
      {useMemo(
        () => (
          <label className="label-h3 ml-8">{header}</label>
        ),
        [header]
      )}
    </div>
  );
};
