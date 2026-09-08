import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { googleLogin } from "../services/api";
import { useEffect, useState } from "react";

function GoogleLoginButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await googleLogin({
        token:credentialResponse.credential});

      dispatch(setUserData(res.data.user));

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 450);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  return (
    <div className="w-full flex justify-center" >
      
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Google Login Failed")}
      shape="pill"
      size="large"
      width={isMobile ? "210" : "380"}
      text="continue_with"
      theme="outline"
    />
    </div>
  );
}

export default GoogleLoginButton;

//style={{ transform: "scale(1.25)", transformOrigin: "center" }}