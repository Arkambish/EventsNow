import React from "react";

const UploadPage = ({ page }: { page: string }) => {
  return (
    <div>
      <div>
        <iframe src={page} width="100%" height="600px" />
      </div>
    </div>
  );
};

export default UploadPage;
