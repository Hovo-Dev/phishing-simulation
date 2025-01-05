import { object, string } from "yup";

const phishingScheme = object().shape({
  email: string()
    .required("Email is required")
    .email("Email validate")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Email without spaces"
    ),
});

export default phishingScheme;
