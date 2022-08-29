import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"

type Props = {
  children: React.ReactNode
  title?: string
  description?: string
}

const Layout = ({children, title, description}: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <main className="max-w-2xl m-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout