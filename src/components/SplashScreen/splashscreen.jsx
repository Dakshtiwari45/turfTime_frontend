import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css"; // Import CSS file

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/homepage"); // Redirects to home after 5 seconds
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-container">
            <img src="/logo.png" alt="Logo" className="splash-logo" />
            <p className="splash-tagline">"Where passion meets play!"
            </p>
        </div>
    );
};

export default SplashScreen;



