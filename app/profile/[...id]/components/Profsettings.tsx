import React from "react";

interface Details {
  name: string;
  type: string;
  value?: string | number;
  setFname?: any;
}

function Profsetti({ name, type, value, setFname }: Details) {
  return (
    <div className="sm:col-span-4 capitalize mt-2">
      <label
        htmlFor={type}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {name}
      </label>
      <div className="mt-2">
        <input
          onChange={(e) => setFname(e.target.value)}
          id={type}
          value={value}
          name={type}
          type={type}
          placeholder={`Enter your ${name}`}
          autoComplete="email"
          className={`block w-full p-2  rounded-md focus:outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-100 placeholder:text-gray-300  focus:ring-1 focus:ring-inset  focus:ring-slate-300 text-sm sm:leading-6 ${
            name == "Primary email address" ? "lowercase" : "capitalize"
          }`}
        />
      </div>
    </div>
  );
}

export default Profsetti;
