import { LoadingProvider } from "@/contexts/LoadingContext";
import { AuthProvider } from "../contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
import MUIThemeProvider from "@/providers/ThemeProvider";
import ProtectedRoute from "@/components/protectedRoutes/ProtectedRoute";
import { SnackbarProvider } from "notistack"; // ✅ Import SnackbarProvider

const publicRoutes = ["/", "/login", "/signup"]; // add more if needed

export default function MyApp({ Component, pageProps, router }) {
  const getLayout = Component.getLayout || ((page) => page);

  const isPublic = publicRoutes.includes(router.pathname);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={3000}
    >
      <AuthProvider>
        <LoadingProvider>
          <SearchProvider>
            <MUIThemeProvider>
              {isPublic ? (
                getLayout(<Component {...pageProps} />)
              ) : (
                <ProtectedRoute>
                  {getLayout(<Component {...pageProps} />)}
                </ProtectedRoute>
              )}
            </MUIThemeProvider>
          </SearchProvider>
        </LoadingProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}
