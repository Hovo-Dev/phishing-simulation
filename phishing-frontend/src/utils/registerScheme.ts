import { object, string } from "yup";

const registerScheme = object().shape({
  fullName: string()
    .required("Last name is required")
    .matches(/^[^\s]+$/, "Last name without whitespace")
    .min(2, "FullName min 2")
    .max(30, "FullName max 30"),
  email: string()
    .required("Email is required")
    .email("Email validate")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Email without spaces"
    ),
  password: string().required("Password is required").min(4, "Min length 4"),
});

export default registerScheme;
