import { AuthContextProvider } from "./auth-context";
import { FavoritesContextProvider } from "./favorites-context";
import { PropertyContextProvider } from "./property-context";

const ContextWrapper = ({ children }) => {
  return (
    <AuthContextProvider>
      <PropertyContextProvider>
        <FavoritesContextProvider>
          {children}
        </FavoritesContextProvider>
      </PropertyContextProvider>
    </AuthContextProvider>
  );
};

export default ContextWrapper