import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { googleLogin } from "../services/api";

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

  return (
    <div className="w-full flex justify-center" style={{ transform: "scale(1.25)", transformOrigin: "center" }}>
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Google Login Failed")}
      shape="pill"
      size="large"
      width="320"
      text="continue_with"
      theme="outline"
    />
    </div>
  );
}

export default GoogleLoginButton;