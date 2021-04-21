import * as yup from "yup";

const SignInSchema = yup.object().shape({
  username: yup.string().required("Enter your username"),
  password: yup.string().required("Enter your password"),
});

const SignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(10, "Max 10 characters")
    .required("Fill in your firstname"),
  lastName: yup
    .string()
    .max(10, "Max 10 characters")
    .required("Fill in your lastname"),
  email: yup.string().email().required("Enter your email"),
  username: yup.string().required("Fill in your username"),
  sex: yup.string().oneOf(["male", "female"]),
  // password: yup
  //   .string()
  //   .min(8, "Password must be at least 8 characters")
  //   .required("Enter your password"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})/,
      "Password must be at least 8 characters, including character and number"
    ),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password not match")
    .required("Enter your confirmed password"),
});

export { SignInSchema, SignUpSchema };
