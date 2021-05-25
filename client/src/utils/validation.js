import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  username: yup.string().required("Enter your username"),
  password: yup.string().required("Enter your password"),
});

export const SignUpSchema = yup.object().shape({
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

export const ApplyJobSchema = yup.object().shape({
  email: yup.string().email().required("Enter your email"),
  phone: yup.string().required("Enter your phone"),
  cv: yup
    .mixed()
    .required("Please upload your cv")
    .test(
      "FILE_REQUIRED",
      "Please upload your resume",
      (value) => value && value.length > 0 // <= 5MB
    )
    .test(
      "FILE_SIZE",
      "Uploaded file larger than 5MB",
      (value) => value[0] && value[0].size < 1024 * 1024 * 5 // <= 5MB
    )
    .test(
      "FILE_FORMAT",
      "Only support docx/doc/pdf file",
      (value) =>
        value[0] &&
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/msword",
        ].includes(value[0].type)
    ),
});

export const PostJobSchema = yup.object().shape({
  title: yup.string().required("Enter job title"),
  description: yup.string().required("Write some descriptions"),
  maxSalary: yup.number().required("Enter job's max salary"),
});

export const PostResumeSchema = yup.object().shape({
  title: yup.string().required("Enter cv's title"),
});

export const CVBasicUpdateSchema = yup.object().shape({
  firstName: yup.string().required("Enter your first name"),
  lastName: yup.string().required("Enter your last name"),
  email: yup.string().required("Enter your email"),
  phone: yup.string().required("Enter your phone"),
});

export const CVAboutUpdateSchema = yup.object().shape({
  about: yup.string(),
});

export const ProfileUpdateSchema = yup.object().shape({
  firstName: yup.string().required("Enter your first name"),
  lastName: yup.string().required("Enter your last name"),
});
