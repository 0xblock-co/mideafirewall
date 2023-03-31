import { Fragment } from "react";
import NeetworkBanner from "@/components/NetworkBlog/banner-top"; 
import NeetworkBlock from "@/components/NetworkBlog/network-block";

export default function NetworkBlog() {
  return (
    <Fragment> 
        <div className="bg__light_blue">
        <NeetworkBanner/>
        <NeetworkBlock />
        </div>
    </Fragment>
  );
}