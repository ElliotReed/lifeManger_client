import { BrowserRouter as Router } from "react-router-dom";

import { AxiosProvider } from "libs/authentication/axios/useAxios";
import { AuthProvider } from "libs/authentication/useAuth.js";
import { AssetProvider } from "screens/AssetManager/useAssets";

export default function AppProviders({ children }) {
  return (
    <Router>
      <AxiosProvider>
        <AuthProvider>
          <AssetProvider>{children}</AssetProvider>
        </AuthProvider>
      </AxiosProvider>
    </Router>
  );
}
