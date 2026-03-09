import "./AppLogo.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const AppLogo = () => {
  const { handleBookADemo, handleSignup, setExpoBanner } = useAppContext();
  const navigate = useNavigate();
  const handleClick = () => {
    handleBookADemo(false);
    handleSignup(false);
    setExpoBanner(false);
    navigate("/");
  };
  return (
    <div id="app-logo" onClick={() => handleClick()}>
      <div id="app-logo-icon" role="img" aria-label="Tesseract Apps Logo" />
      TesseractApps
    </div>
  );
};

export default AppLogo;
