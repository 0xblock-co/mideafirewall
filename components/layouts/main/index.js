import { Fragment } from "react";

import FooterComponent from "@/components/layouts/footer";
import HeaderComponent from "@/components/layouts/header";

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <HeaderComponent />
      <main className="mdf__main_top_fix">
        {children}
        <FooterComponent />
      </main>
    </Fragment>
  );
};

export default MainLayout;
