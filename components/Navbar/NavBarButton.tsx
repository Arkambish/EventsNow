import React, { MouseEventHandler } from "react";
interface NavBarButton {
  text: string;
  // handleNavBarButton: MouseEventHandler<HTMLButtonElement>;
}

export default function NavBarButton({
  text,
}: // handleNavBarButton,
NavBarButton) {
  return (
    <li>
      <button className="button">
        <div className="block py-2 px-3 text-gray-900 rounded bg-gray-100 md:bg-transparent md:border-0 md:text-eventBrown md:p-0  md:dark:text-eventBrown dark:bg-gray-700 dark:text-white md:dark:bg-transparent">
          {text}
        </div>
      </button>
    </li>
  );
}
