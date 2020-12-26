import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Nav from "./components/layout/nav/Nav";
import Footer from "./components/layout/footer/Footer";
import Index from "./pages/index/Index";
import Tag from "./pages/tag/Tag";
import { LightBoxContext } from "./contexts/lightBoxContext";
import FeatureImageProvider from "./contexts/featureImageContext";
import { ThemeContext } from "./contexts/themeContext";

const ROUTER_BASENAME = process.env.REACT_APP_ROUTER_BASENAME || "/";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { isLightBoxMode } = useContext(LightBoxContext);
  return (
    <div className={`flex min-h-screen ${theme === "dark" && "bp3-dark"}`}>
      <BrowserRouter basename={ROUTER_BASENAME}>
        <div
          className={`flex-1 flex flex-col ${
            isLightBoxMode ? "filter-blur" : "filter-none"
          }`}
        >
          <FeatureImageProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/tags/:key" component={Tag} />
              <Redirect to="/" />
            </Switch>
            <Footer />
          </FeatureImageProvider>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
