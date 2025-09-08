import { AppProps } from 'next/app'
import '../styles/index.scss'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
