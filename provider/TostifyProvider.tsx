import React from "react";
import { Toaster } from "react-hot-toast";

export default function TostifyProvider() {
  return (
    <div>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            backgroundColor: "#fff",
            color: "#374151",
            fontSize: "16px",
            padding: "16px 24px",
          },
        }}
      />
    </div>
  );
}
