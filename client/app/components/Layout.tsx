import { Outlet } from "react-router";

export default function Layout() {
  return (
    <section>
      <div className=" flex flex-row  justify-center items-center">
        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" />
        <ul className="list-none  flex  flex-1 justify-center flex-row  gap-5 ">
          <li>Home</li>
          <li>Login</li>
          <li>Create</li>
        </ul>
      </div>
      <section>
        <Outlet />
      </section>
    </section>
  );
}
