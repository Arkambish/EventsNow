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
      <div className="">
        <input
          onChange={(e) => setFname(e.target.value)}
          id={type}
          value={value}
          name={type}
          type={type}
          placeholder={`Enter your ${name}`}
          autoComplete="email"
          className={`w-full px-3 py-[4px] border rounded-md focus:outline-none focus:border-slate-700  my-2 ${
            name == "Primary email address" ? "lowercase" : "capitalize"
          }`}
        />
      </div>
    </div>
  );
}

export default Profsetti;
