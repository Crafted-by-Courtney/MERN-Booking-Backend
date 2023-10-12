import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Checkbox } from "@mantine/core";
import axios from "axios";
import { signIn } from "next-auth/react";


export default function CreateAccount(props) {
  const [rollingButton, setRollingButton] = useState(false);
  const [success, setSuccess] = useState();
  const [checked, setChecked] = useState(false);
  const [steps, setSteps] = useState(1);
  const [userType, setUserType] = useState("");
  const form = useForm({
    initialValues: {
      email: "",
      saveLogin: false,
      role: "buyer",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Forkert email"),
    },
  });

 

  async function handleCreate(values) {
    setRollingButton(true);


    try {
      console.log(form.values);

      form.values.role = userType;
      console.log(form.values);

      const result = await axios.post("/api/createUser", form.values);
      console.log(result);
      setSuccess({ status: result.data.status, message: result.data.message });
      if (result.status == 200) {
        console.log("logged in");
        setRollingButton(false);
        signIn("credentials", {
          email: form.values.email,
          password: form.values.password,
        });
        setSuccess({
          status: result.data.status,
          message: result.data.message,
        });
       
      } else {
        console.log("fejl");
      }
    } catch (error) {
      console.log(error);
      setSuccess({ status: result.data.status, message: result.data.message });
      setRollingButton(false);
    }
  }

  return (
    <Transition.Root show={props.loginbar} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setLoginbar}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="px-5">
                  
                    <h2 className=" mt-3 text-center text-2xl font-semibold">
                      Velkommen til Sommerhusudlejning
                    </h2>
                
                  <form
                    className="space-y-6"
                    onSubmit={form.onSubmit((values) => handleCreate(values))}
                  >
                    <div className="">
                      <div className=" columns-2">
                      </div>
                      
                      <div
                        className={`w-full px-3 transition delay-150 ease-in ${
                          userType != "" && checked == true ? "visible" : "invisible"
                        }`}
                      >
                      </div>
                    </div>
                    <div>
                      <TextInput
                        label="Din email"
                        className="mt-3"
                        placeholder="Email"
                        {...form.getInputProps("email")}
                      />

                      <PasswordInput
                        label="Dit kodeord"
                        placeholder="Kodeord"
                        className="mt-3"
                        {...form.getInputProps("password")}
                      />

                      <div>
                        <Button
                          type="submit"
                          variant="gradient"
                          gradient={{ from: "blue", to: "black" }}
                          className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F87171] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F87171]"
                          loading={rollingButton}
                        >
                          Opret konto
                        </Button>
                      </div>

                      
                    </div>
                    <div className="mt-3">
                      {success?.status == "error" && (
                       ""
                      )}

                      {success?.status == "success" && (
                       ""
                      )}
                    </div>
                  </form>
                  
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            Eller registrer med
                          </span>
                        </div>
                      </div>
                    </div>                  
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
}