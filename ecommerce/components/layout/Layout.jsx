import CopyRights from "../common/CopyRights";
import Footer from "../common/Footer";
import Header from "../common/Header";



export default function Layout({ children }) {

  return (
    <>
      <Header />
      <main className='w-full min-h-[200vh]  overflow-x-hidden'>{children}</main>
      <Footer />
      <CopyRights />
    </>
  )
}