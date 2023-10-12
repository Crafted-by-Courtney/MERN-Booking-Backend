import { Menu, Button, Divider } from "@mantine/core";
import { IoMenu, IoAirplane  } from "react-icons/io5";
import { Fragment, useState } from "react";
import useUser from "../../utilities/functions/user";
import { useSession, signIn, signOut } from "next-auth/react";
import CreateAccount from "../Account/CreateAccount";
import Login from "../Account/Login";

export default function DropdownLoggedIn(props) {
  const [loginbar, setLoginbar] = useState(props?.loginModal ?? false);
  const [createAccount, setCreateAccount] = useState(false);
  const user = useUser();
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

        <Menu.Dropdown className="rounded-xl">
          <Menu.Item onClick={() => setCreateAccount(!createAccount)}>
            You are logged in
          </Menu.Item>
          <Divider />
          <Menu.Item>{user?.email}</Menu.Item>
          <Menu.Item onClick={() => signOut()}>Logout</Menu.Item>
          <Menu.Item>Dashboard</Menu.Item>
          {/* Other items ... */}
        </Menu.Dropdown>
      </Menu>
      <Login />
      <CreateAccount loginbar={createAccount} setLoginbar={setCreateAccount} />
    </div>
  );
}