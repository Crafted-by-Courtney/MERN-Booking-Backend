import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@mantine/form";
import { TextInput, Checkbox, PasswordInput, Button } from "@mantine/core";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const query = router.query;
  const [rollingButton, setRollingButton] = useState(false);
  const [success, setSuccess] = useState({ status: "", message: "" });

  useEffect(() => {
    if (status && query) {
      if (status !== "authenticated") {
        if (query?.error === "Password-fail") {
          props.setLoginbar(true);
          setSuccess({
            status: "error",
            message: "Invalid credentials. Please contact us for support.",
          });
        }
        if (query?.error === "Email-exists") {
          props.setLoginbar(true);
          setSuccess({
            status: "error",
            message: "The email does not exist. Please check your email address.",
          });
        }
      }
    }
  }, [query, status]);

  const form = useForm({
    initialValues: {
      email: "",
      saveLogin: false,
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // Add more validation rules if needed
    },
  });

  async function handleSubmit() {
    setRollingButton(true);

    try {
      const signInResult = await signIn("credentials", {
        email: form.values.email,
        password: form.values.password,
      });

      if (signInResult.error) {
        // Handle authentication error
        setSuccess({
          status: "error",
          message: "Authentication failed. Please check your credentials.",
        });
      } else {
        // Successful login
        setRollingButton(false);
        setSuccess({ status: "success", message: "Login successful." });
        // Optionally update steps or navigate to the next step
        // setSteps(2);
      }
    } catch (error) {
      console.error(error);
      setRollingButton(false);
      setSuccess({ status: "error", message: "Login failed." });
    }
  }

  return (
    <Transition.Root show={props.loginbar} as={Fragment}>
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
