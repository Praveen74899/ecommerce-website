import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();

  const parts = location.pathname.split("/").filter(Boolean);

  // Improved ID detection
  const isId = (value) => {
    // If purely alphabetic → NOT ID
    if (/^[a-zA-Z]+$/.test(value)) return false;

    // If contains hyphens or underscores → NOT ID
    if (/[-_]/.test(value)) return false;

    // If length >= 12 AND alphanumeric → ID
    return /^[a-zA-Z0-9]+$/.test(value) && value.length >= 12;
  };

  return (
    <nav className="text-sm text-gray-700 my-4">
      <ol className="flex items-center gap-2">
        
        {/* Home always clickable */}
        <li>
          <Link to="/" className="hover:text-black font-medium">Home</Link>
        </li>

        {parts.map((part, index) => {
          const path = "/" + parts.slice(0, index + 1).join("/");
          const isLast = index === parts.length - 1;

          const label = isId(part)
            ? "Details"
            : part.replace(/-/g, " ");

          return (
            <li key={index} className="flex items-center gap-2">
              <span className="text-gray-400">/</span>

              {isLast ? (
                <span className="font-semibold text-black capitalize">
                  {label}
                </span>
              ) : (
                <Link 
                  to={path}
                  className="hover:text-black font-medium capitalize"
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
}
