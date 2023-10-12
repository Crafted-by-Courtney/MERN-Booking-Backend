import { Button, Menu } from "@mantine/core";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import CreateAccount from "../Account/CreateAccount";
import Login from "../Account/Login";

export default function Dropdown(props) {
  const [loginbar, setLoginbar] = useState(props?.LoginModel ?? false);
  const [createAccount, setCreateAccount] = useState(false);
  return (
    <div>
      <Menu
        withArrow
        position="bottom-end"
        offset={18}
        transition="rotate-right"
        transitionDuration={150}
      >
        <Menu.Target>
          <Button className="hover:bg-white">
            <IoMenu className="h-6 text-gray-600" />
          </Button>
        </Menu.Target>
        <Menu.Dropdown className="rounded-xl"> {/* Fixed typo in className */}
          <Menu.Item onClick={() => setLoginbar(!loginbar)}>Login</Menu.Item>
          <Menu.Item onClick={() => setCreateAccount(!createAccount)}>Create Account</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Login loginbar={loginbar} setLoginbar={setLoginbar} />
      <CreateAccount loginbar={createAccount} setLoginbar={setCreateAccount} />
    </div>
  );
}
