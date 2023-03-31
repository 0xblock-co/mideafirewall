import dynamic from "next/dynamic";
import { Fragment } from "react";

const FooterComponent = dynamic(() => import("@/components/layouts/footer"));
const HeaderComponent = dynamic(() => import("@/components/layouts/header"));

const MainLayout = ({ headerData, children }) => {
  return (
    <Fragment>
      <HeaderComponent headerData={headerData} />
      <main className="mdf__main_top_fix">
        {children}
        <FooterComponent />
      </main>
    </Fragment>
  );
};

export default MainLayout;
