import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
	const [currentstate, setCurrentState] = useState("Sign Up");

	return (
		<div className="login-popup">
			<form className="login-popup-container">
				<div className="login-popup-title">
					<h2>{currentstate}</h2>
					<img
						onClick={() => setShowLogin(false)}
						src={assets.cross_icon}
						alt=""
					/>
				</div>

				<div className="login-popup-inputs">
					{currentstate === "Login" ? (
						<></>
					) : (
						<input type="text" placeholder="Your Name" required />
					)}

					<input type="email" placeholder="Your Email" required />
					<input type="password" placeholder="Password" required />
				</div>

				<button>
					{currentstate === "Sign Up" ? "Create Account" : "Login"}
				</button>

				<div className="login-popup-condition">
					<input type="checkbox" required />
					<p>By continuing, i agree to the terms of use & privacy policy.</p>
				</div>
				{currentstate === "Login" ? 
					<p>
						Create a New Account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span>
					</p>
				 : 
					<p>
						Already have an accoun? <span onClick={() => setCurrentState("Login")}>Login Here</span>
					</p>
				}
			</form>
		</div>
	);
};

export default LoginPopup;
