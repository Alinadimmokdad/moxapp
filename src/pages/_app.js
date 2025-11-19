import { LoadingProvider } from "@/contexts/LoadingContext";
import { AuthProvider } from "../contexts/AuthContext";
import MUIThemeProvider from "@/providers/ThemeProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LoadingProvider>
        <MUIThemeProvider>
          <Component {...pageProps} />
        </MUIThemeProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}
