import { ToastContainer } from 'react-toastify'
import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import '@rainbow-me/rainbowkit/styles.css'
import { useEffect, useState } from 'react'
import { Providers } from '@/services/provider'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from 'react-redux'
import { store } from '@/store'
// import { SignInWithMetamaskButton } from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
  // dbConnect();
  const [showChild, setShowChild] = useState<boolean>(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild || typeof window === 'undefined') {
    return null
  } else {
    return (
      
      // <ClerkProvider {...pageProps}>
      <Providers pageProps={pageProps}>
        <Provider store={store}>
          <div className="min-h-screen relative">
            <Header />
            <Component {...pageProps} />
            <Footer />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable 
              pauseOnHover
              theme="dark"
            />
          </div>
        </Provider>
      </Providers>
      // </ClerkProvider>


    )
  }
}
