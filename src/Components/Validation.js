// Validation.js
import * as Yup from 'yup';

const Validation = Yup.object({
  fname: Yup.string().min(3, "Minimum 3 characters").max(10, "Maximum 10 characters").required("Please enter fname"),
  email: Yup.string().email("Invalid email format").required("Please enter email"),
  phoneno: Yup.string().matches(/^\d+$/, "Must be only digits").min(10, "Minimum 10 digits").max(10, "Maximum 10 digits").required("Please enter phone number"),
  address: Yup.string().required("Please enter address"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Please enter password")
});

export default Validation;
