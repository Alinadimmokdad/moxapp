import { AuthProvider } from "../contexts/AuthContext";
import MUIThemeProvider from "@/providers/ThemeProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MUIThemeProvider>
        <Component {...pageProps} />
      </MUIThemeProvider>
    </AuthProvider>
  );
}
