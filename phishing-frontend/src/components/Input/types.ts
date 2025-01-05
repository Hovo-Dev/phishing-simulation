import type {
  ChangeEvent,
  FocusEvent,
  HTMLInputTypeAttribute,
  KeyboardEvent,
} from "react";

import type { TSVG } from "types";

export type TInput = {
  name: string;
  Icon?: TSVG;
  type?: HTMLInputTypeAttribute;
  register?: any;
  error?: string;
  label?: string;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string | number;
  containerClass?: string;
  onBlur?: (data: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (data: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (data: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (
    value: string | number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
};
