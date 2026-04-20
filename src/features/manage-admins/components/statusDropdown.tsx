"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  status: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange: (value: boolean) => void;
}

export default function StatusDropdown({
  status,
  disabled,
  loading,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside); 
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function handleOpen(e: React.MouseEvent) {
    e.stopPropagation();
    if (disabled || loading) return;

    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }

    setOpen((prev) => !prev);
  }

  const activeStyle = status
    ? "bg-green-50 text-green-600"
    : "bg-red-50 text-red-500";

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleOpen}
        disabled={disabled || loading}
        className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition
          ${activeStyle}
          ${
            disabled || loading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:opacity-80"
          }`}
      >
        {loading ? (
          <span className="animate-pulse">Memuat...</span>
        ) : (
          <>
            {status ? "Aktif" : "Nonaktif"}
            {!disabled && (
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            )}
          </>
        )}
      </button>

      {open && !disabled && (
        <div
          ref={dropdownRef} 
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
          className="fixed w-28 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-[9999]"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(true);
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-xs hover:bg-green-50 text-green-600 flex items-center gap-2
              ${status ? "bg-green-50 font-medium" : ""}`}
          >
            {status && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            )}
            Aktif
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(false);
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-xs hover:bg-red-50 text-red-500 flex items-center gap-2
              ${!status ? "bg-red-50 font-medium" : ""}`}
          >
            {!status && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            )}
            Nonaktif
          </button>
        </div>
      )}
    </>
  );
}