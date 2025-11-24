import { LoadingProvider } from "@/contexts/LoadingContext";
import { AuthProvider } from "../contexts/AuthContext";
import MUIThemeProvider from "@/providers/ThemeProvider";
import ProtectedRoute from "@/components/protectedRoutes/ProtectedRoute";

const publicRoutes = ["/", "/login", "/signup"]; // add more if needed

export default function MyApp({ Component, pageProps, router }) {
  const getLayout = Component.getLayout || ((page) => page);

  const isPublic = publicRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      <LoadingProvider>
        <MUIThemeProvider>
          {isPublic ? (
            getLayout(<Component {...pageProps} />)
          ) : (
            <ProtectedRoute>
              {getLayout(<Component {...pageProps} />)}
            </ProtectedRoute>
          )}
        </MUIThemeProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}
