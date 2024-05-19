import React from "react";
import DOMPurify from "dompurify";

function RenderedContent({ content }) {
  console.log(content);
  const sanitizedContent = DOMPurify.sanitize(content); // Sanitize the HTML
  console.log(sanitizedContent);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}

export default RenderedContent;
