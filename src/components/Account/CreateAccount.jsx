// sends a POST request to an API endpoint to create a new user

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function CreateAccount(props) {
  const [rollingButton, setRollingButton] = useState(false);
  const [success, setSuccess] = useState({ status: "", message: "" });
  const [userType, setUserType] = useState("buyer");
  const form = useForm({
    initialValues: {
      email: "",
      saveLogin: false,
      role: "buyer",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // Add more validation rules if needed
    },
  });

  async function handleCreate(values) {
    setRollingButton(true);

    try {
      form.values.role = userType;
      const result = await axios.post("/api/createUser", form.values);

      if (result.status === 200) {
        setRollingButton(false);
        signIn("credentials", {
          email: form.values.email,
          password: form.values.password,
        });
        // Provide user-friendly success message and guidance
        setSuccess({
          status: "success",
          message: "Your account has been created. Check your email for verification.",
        });
        // Optionally update steps or navigate to the next step
        setSteps(2);
      }
    } catch (error) {
      console.error(error);
      // Provide a user-friendly error message
      setSuccess({
        status: "error",
        message: "An error occurred while creating your account. Please try again.",
      });
      setRollingButton(false);
    }
  }

  return (
    <Transition.Root show={props.loginbar}>
      <Dialog as="div" className="relative z-10" onClose={props.setLoginbar}>
        {/* Render your form fields here */}
        <div className="mt-6">
          {success.status === "error" && <div className="error-message">{success.message}</div>}
          {success.status === "success" && <div className="success-message">{success.message}</div>}
        </div>
        {/* ... More JSX for the dialog */}
      </Dialog>
    </Transition.Root>
  );
}
