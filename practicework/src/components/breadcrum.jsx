import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 my-4">
      <ol className="flex items-center gap-2">
        
        {/* Home */}
        
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;

          const to = "/" + pathnames.slice(0, index + 1).join("/");

          // for dynamic parameters (remove ids)
          const label = value.length > 20 ? "Details" : value.replace("-", " ");

          return (
            <li key={index} className="flex items-center gap-2">
              <span className="text-gray-400"> / </span>

              {isLast ? (
                <span className="text-black font-semibold capitalize">
                  {label}
                </span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-black capitalize font-medium"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
