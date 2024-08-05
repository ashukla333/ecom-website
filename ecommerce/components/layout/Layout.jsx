import Categorys from "../homePageComponent/Categorys";
import CopyRights from "../common/CopyRights";
import Footer from "../common/Footer";
import Header from "../common/Header";

export default function Layout({ children }) {
  return (
    <>
      <div style={{ zIndex: "1000" }}>
        <Header />
        <Categorys />
      </div>
      <div
        style={{ zIndex: "0" }}
        className="w-full min-h-[100vh]  !z-[0] overflow-x-hidden"
      >
        {children}
      </div>
      <Footer />
      <CopyRights />
    </>
  );
}
