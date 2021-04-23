import * as yup from "yup";
import { JOBTYPES } from "../constants/jobConstants";

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

const PostJobSchema = yup.object().shape({
  title: yup.string().required("Enter job title"),
  jobType: yup.mixed().oneOf(JOBTYPES),
  description: yup.string().required("Write some descriptions"),
  maxSalary: yup.number().required("Enter job's max salary"),
});

export { SignInSchema, SignUpSchema, PostJobSchema };
