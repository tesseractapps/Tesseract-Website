import "./AppLogo.css";
import logo_small from "../../assets/tesseract_logo_small.webp";
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
      <img src={logo_small} alt="tesseract logo" />
      TesseractApps
    </div>
  );
};

export default AppLogo;
