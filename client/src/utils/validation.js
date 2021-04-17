import * as yup from "yup";

const SignInSchema = yup.object().shape({
  email: yup.string().email().required("Enter your email"),
  password: yup.string().required("Enter your password"),
});

const SignUpSchema = yup.object().shape({
  firstName: yup.string().required("Fill in your firstname"),
  lastName: yup.string().required("Fill in your lastname"),
  email: yup.string().email().required("Enter your email"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Enter your password"),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password not match")
    .required("Enter your confirmed password"),
});

export { SignInSchema, SignUpSchema };
