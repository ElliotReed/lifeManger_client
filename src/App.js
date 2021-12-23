import { BrowserRouter as Router } from "react-router-dom";

import Layout from "components/Layout/Layout";
import RouterConfig from "routers/RouterConfig";
import PublicRouterConfig from "routers/PublicRouterConfig";

export default function App() {
  return (
    <Router>
      <Layout>
        <PublicRouterConfig />
        <RouterConfig />
      </Layout>
    </Router>
  );
}
