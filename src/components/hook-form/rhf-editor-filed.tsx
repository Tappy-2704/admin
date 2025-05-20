import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";

interface MenuBarProps {
  editor: Editor | null;
}
// Menu Bar
const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg shadow">
      <button
        type="reset"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1 rounded border text-sm ${
          editor.isActive("heading", { level: 1 })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        H1
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1 rounded border text-sm ${
          editor.isActive("heading", { level: 2 })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        H2
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1 rounded border text-sm ${
          editor.isActive("heading", { level: 3 })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        H3
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-3 py-1 rounded border text-sm ${
          editor.isActive("paragraph")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        Paragraph
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded border text-sm font-bold ${
          editor.isActive("bold")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        Bold
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded border text-sm italic ${
          editor.isActive("italic")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        Italic
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1 rounded border text-sm line-through ${
          editor.isActive("strike")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        Strike
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`px-3 py-1 rounded border text-sm ${
          editor.isActive("highlight")
            ? "bg-yellow-400 text-white"
            : "bg-white hover:bg-yellow-100 border-gray-300"
        }`}
      >
        Highlight
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`px-3 py-1 rounded border text-sm ${
          editor.isActive({ textAlign: "left" })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        Left
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`px-3 py-1 rounded border text-sm ${
          editor.isActive({ textAlign: "center" })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        Center
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`px-3 py-1 rounded border text-sm ${
          editor.isActive({ textAlign: "right" })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        Right
      </button>
      <button
        type="reset"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`px-3 py-1 rounded border text-sm ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-100 border-gray-300"
        }`}
      >
        Justify
      </button>
    </div>
  );
};
interface EditorWrapperProps {
  value: string;
  onChange: (value: string) => void;
}

// 👇 Tách riêng Editor Component (gọi hook ở đây)
const EditorWrapper = ({ value, onChange }: EditorWrapperProps) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "min-h-[16rem] prose focus:outline-none",
      },
    },
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Đồng bộ lại nội dung nếu value thay đổi từ form (hiếm xảy ra)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

type Props = {
  name: string;
  label?: string;
  helperText?: string;
  InputProps?: {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  };
  InputLabelProps?: {
    shrink?: boolean;
  };
};

export const RHFEditorField = ({
  name,
  label,
  helperText,
  InputProps,
  InputLabelProps,
}: Props) => {
  const { control } = useFormContext();
  const { isDarkStore } = useDarkModeStore();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1 w-full">
          {label && (
            <label
              className={`text-sm font-medium ${
                InputLabelProps?.shrink ? "text-gray-500" : "text-gray-800"
              }`}
            >
              {label}
            </label>
          )}
          <div className="relative w-full">
            {InputProps?.startAdornment && (
              <div className="absolute inset-y-0 left-2 flex items-center">
                {InputProps.startAdornment}
              </div>
            )}
            <div
              className={`border rounded-xl px-4 py-3 ${
                isDarkStore
                  ? error
                    ? "border-red-500"
                    : "border-neutrals-500"
                  : error
                    ? "border-red-500"
                    : "border-neutrals-300"
              }`}
            >
              <EditorWrapper value={field.value} onChange={field.onChange} />
            </div>
            {InputProps?.endAdornment && (
              <div className="absolute inset-y-0 right-2 flex items-center">
                {InputProps.endAdornment}
              </div>
            )}
          </div>
          <span className="text-red-500 text-sm">
            {error?.message ?? helperText}
          </span>
        </div>
      )}
    />
  );
};

export default RHFEditorField;
