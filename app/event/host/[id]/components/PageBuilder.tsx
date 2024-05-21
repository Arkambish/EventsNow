import React from "react";

const PageBuilder = ({ page }: { page: string }) => {
  return (
    <div>
      <div>
        <iframe src={page} width="100%" height="600px" />
      </div>
    </div>
  );
};

export default PageBuilder;
