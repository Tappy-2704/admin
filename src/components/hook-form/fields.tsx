import RHFEditorField from "./rhf-editor-filed";
import { RHFSelectField } from "./rhf-select-field";
import { RHFTextareaField } from "./rhf-texarea-field";
import { RHFTextField } from "./rhf-text-field";

export const Field = {
  Text: RHFTextField,
  Textarea: RHFTextareaField,
  Select: RHFSelectField,
  Editor: RHFEditorField,
};
