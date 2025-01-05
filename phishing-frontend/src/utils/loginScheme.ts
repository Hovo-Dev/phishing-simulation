import { object, string } from "yup";

const loginScheme = object().shape({
  email: string()
    .required("Email is required")
    .email("Email validate")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Email without spaces"
    ),
  password: string().required("Password is required").min(4, "Min length 4"),
});

export default loginScheme;
