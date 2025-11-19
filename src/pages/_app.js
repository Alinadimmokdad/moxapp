import { LoadingProvider } from "@/contexts/LoadingContext";
import { AuthProvider } from "../contexts/AuthContext";
import MUIThemeProvider from "@/providers/ThemeProvider";

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <LoadingProvider>
        <MUIThemeProvider>
          {getLayout(<Component {...pageProps} />)}
        </MUIThemeProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}
