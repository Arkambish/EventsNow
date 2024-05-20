"use client";

import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import plugin from "grapesjs-blocks-basic";
import form from "grapesjs-plugin-forms";
import gradient from "grapesjs-style-gradient";
import filter from "grapesjs-style-filter";
import styleBg from "grapesjs-style-bg";
import webPage from "grapesjs-preset-webpage";
import touch from "grapesjs-touch";
import RenderedContent from "./RenderedContent";
import Indexeddb from "grapesjs-indexeddb";
import newsletter from "grapesjs-preset-newsletter";
import navbar from "grapesjs-navbar";
import Link from "next/link";
import { success } from "@/util/Toastify";

import { saveAs } from "file-saver";
import { useParams } from "next/navigation";
import { FetchPut } from "@/hooks/useFetch";

export default function Build() {
  const { id } = useParams();
  console.log(id);
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState(null);

  // console.log("mko balnneh");
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins: [
        plugin,
        navbar,
        form,
        gradient,
        filter,
        styleBg,
        webPage,
        touch,
        Indexeddb,
        newsletter,
      ],
      pluginsOpts: {
        "grapesjs-blocks-basic": {},
        [navbar]: {},
        "grapesjs-plugin-forms": {},
        "grapesjs-style-gradient": {},
        "grapesjs-style-filter": {},
        "grapesjs-style-bg": {},
        "grapesjs-preset-webpage": {},
        "grapesjs-touch": {},
        "grapesjs-preset-newsletter": {
          modalTitleImport: "Import template",
          "grapesjs-plugin-export": {
            /* options */
          },
        },
        "grapesjs-indexeddb": {
          options: {
            key: "user-project-id",
            dbName: "editorLocalData",
            objectStoreName: "projects",
          },
        },
      },
    });

    // Add a custom button to export the HTML
    editor.Panels.addButton("options", {
      id: "export-html",
      className: "btn-open-export",
      label: "Export HTML",
      command: "export-html",
      context: "export-html",
    });

    // Define the export command
    editor.Commands.add("export-html", {
      run: function (editor) {
        const htmlContent = editor.getHtml();
        setHtml(htmlContent);
      },
    });

    setEditor(editor);

    editor.on("update", () => {
      setHtml(editor.getHtml());
    });
  }, []);

  const handleSave = async () => {
    editor.runCommand("export-html");
    if (html) {
      const completeHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Generated Page</title>
          </head>
          <body>
            ${html}
          </body>
        </html>`;
      const blob = new Blob([completeHtml], {
        type: "text/html;charset=utf-8",
      });
      console.log(blob);

      const file = new File([blob], `${id}.html`, { type: "text/html" });
      console.log(file);

      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);

      console.log(formData);

      try {
        const response = await fetch("/api/v1/aws/s3-upload/pagebuilder", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        console.log(data);
        if (!data) return;

        const objectUrl = data.objectUrl;
        console.log(objectUrl);

        console.log(id);

        const updateEvent = await fetch("/api/v1/event/publishPageBuilder", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, pageBuilder: objectUrl }),
        });

        const updateEventRes = await updateEvent.json();

        if (updateEventRes.message != "pageBuilder update faild") {
          success("Host page updated successfully");
        }

        // const updateEvent = await FetchPut({
        //   endpoint: `/api/v1/event/publishPageBuilder`,
        //   body: { id, pageBuilder: objectUrl },
        // });

        console.log(updateEvent);
        // if (updateEvent.message != "pageBuilder update faild") {

        // }
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
  };

  // const renderPage = () => {
  //   if (!editor) return;

  //   const html = editor.getHtml();
  //   setHtml(html);

  //   onHtmlRendered?.(html);
  // };

  // useEffect(() => {
  //   renderPage();
  //   editor?.on("update", renderPage);
  // }, [editor]);

  return (
    <div className="p-0 m-0 overflow-x-hidden ">
      <div className="bg-[#373D49] h-12 text-white border-0 p-5">
        <Link href={"./"}>Back</Link>

        {/* <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save HTML
        </button> */}
        <button
          onClick={handleSave}
          className="bg-slate-500 mx-10 hover:bg-slate-700 text-white font-bold p-1 rounded"
        >
          Export HTML
        </button>
      </div>
      <div id="editor">hii</div>

      {/* Placeholder for rendered content (optional, can be removed) */}
      {/* {html && <RenderedContent content={html} />} */}
    </div>
  );
}
// }
