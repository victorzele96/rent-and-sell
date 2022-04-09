import { FavoritesContextProvider } from "./favorites-context";
import { PropertyContextProvider } from "./property-context";

const ContextWrapper = ({ children }) => {
  return (
    <PropertyContextProvider>
      <FavoritesContextProvider>
        {children}
      </FavoritesContextProvider>
    </PropertyContextProvider>
  );
};

export default ContextWrapper