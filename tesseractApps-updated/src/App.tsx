import { useRef } from "react";
import "./App.css";
import NavBarComponent from "./components/navBarComponent/NavBarComponent";
import { BrowserRouter } from "react-router-dom";
import FooterComponent from "./components/footerComponent/FooterComponent";
import AppRoutes from "./routes/AppRoutes";
import Signup from "./pages/signup/Signup";
import BookADemo from "./pages/bookADemo/BookADemo";
// import ExpoBanner from "./components/exporBanner/ExpoBanner";
import { useAppContext } from "./contexts/AppContext";
// import ExpoPage from "./pages/expoPage/ExpoPage";
// import SignupFlow from "./pages/signupflow/SignupFlow";

function App() {
  const {
    signUp,
    bookADemo,
    // expoBanner, setExpoBanner
  } = useAppContext();
  const displayCondition = signUp || bookADemo;

  const portalContainerRef = useRef<HTMLDivElement>(null);
  return (
    <BrowserRouter>
      <Signup />
      <BookADemo />
      {!displayCondition && (
        <NavBarComponent portalContainerRef={portalContainerRef} />
      )}

      <div ref={portalContainerRef} />
      {/* {!(signUp || bookADemo) && expoBanner && (
        // <ExpoBanner
        //   showBanner={expoBanner}
        //   handleBannerClose={() => {
        //     setExpoBanner(false);
        //   }}
        // />
        <ExpoPage
          showBanner={expoBanner}
          handleBannerClose={() => {
            setExpoBanner(false);
          }}
        />
      )} */}
      {!displayCondition && <AppRoutes />}
      {!displayCondition && <FooterComponent />}
    </BrowserRouter>
  );
}

export default App;
