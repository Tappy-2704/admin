import MoreIcon from "@/assets/icons/more-icon";
import { EyeIcon, PenIcon, Trash } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Props {
  isDarkStore: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MoreMenu = ({ isDarkStore, onView, onEdit, onDelete }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button onClick={() => setOpen(!open)}>
        <MoreIcon currentColor={isDarkStore ? "#ffffff" : "#000000"} />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-20">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            {" "}
            {onView && (
              <button
                onClick={onView}
                className={`bg-gray-100 dark:bg-gray-700 flex flex-row  items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 text-left gap-3`}
              >
                <EyeIcon size={18} /> <span>View</span>
              </button>
            )}
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            {onEdit && (
              <button
                onClick={onEdit}
                className={`bg-gray-100 dark:bg-gray-700 flex flex-row  items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 text-left gap-3`}
              >
                <PenIcon size={18} /> <span>Edit</span>
              </button>
            )}
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            {onDelete && (
              <button
                onClick={onDelete}
                className={`bg-gray-100 dark:bg-gray-700 flex flex-row  items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 text-left gap-3`}
              >
                <Trash size={18} /> <span>Delete</span>
              </button>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default MoreMenu;
