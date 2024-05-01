import React from "react";
import { Fragment, useState, useEffect } from "react";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { People } from "@/app/organization/dashboard/[id]/components/InviteButton";
import { Combobox, Transition } from "@headlessui/react";

// { id: 0, name: "" } file format of select props

type ComboboxComponent = {
  data: People[];
  select: People;
  setSelect: React.Dispatch<React.SetStateAction<People>>;
  placeholder: string;
};

export default function ComboboxComponent({
  data,
  select,
  setSelect,
  placeholder,
}: ComboboxComponent) {
  // const [email, setEmail] = useState<People>({ id: 0, name: "" });
  const [query, setQuery] = useState("");
  const filteredData =
    query === ""
      ? data
      : data.filter((dataObj: People) =>
          dataObj.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div>
      <Combobox value={select} onChange={setSelect}>
        <div className="relative mt-1 -z-8">
          {/* <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"> */}
          <Combobox.Input
            className="w-full border-2 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0 border-gray-400 rounded-lg"
            displayValue={(dataObj: any) => dataObj.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
          {/* </div> */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((DataObj: People) => (
                  <Combobox.Option
                    key={DataObj.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={DataObj}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {DataObj.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
