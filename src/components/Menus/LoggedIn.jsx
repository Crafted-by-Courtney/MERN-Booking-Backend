import { Menu, Button, Divider } from "@mantine/core";
import { IoMenu } from "react-icons/io5";
import { Fragment, useState } from "react";
import useUser from "../../utilities/functions/user";
import { useSession, signOut } from "next-auth/react";
import CreateAccount from "../Account/CreateAccount";
import Login from "../Account/Login";

export default function DropdownLoggedIn(props) {
  const [loginbar, setLoginbar] = useState(props?.loginModal ?? false);
  const [createAccount, setCreateAccount] = useState(false);
  const user = useUser();
  const { data: session } = useSession();

  const menuItems = [
    { label: "You are logged in", condition: session?.user },
    { label: user?.email, condition: session?.user },
    { label: "Logout", condition: session?.user, action: signOut },
    { label: "Dashboard", condition: session?.user && user?.role === "admin" },
    // Add other menu items here
  ];

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
          {menuItems.map((item, index) =>
            item.condition ? (
              <Fragment key={index}>
                <Menu.Item onClick={item.action || (() => {})}>
                  {item.label}
                </Menu.Item>
                {index < menuItems.length - 1 && <Divider />}
              </Fragment>
            ) : null
          )}
        </Menu.Dropdown>
      </Menu>
      <Login />
      <CreateAccount loginbar={createAccount} setLoginbar={setCreateAccount} />
    </div>
  );
}
