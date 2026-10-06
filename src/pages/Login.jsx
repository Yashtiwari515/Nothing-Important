import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showPrank, setShowPrank] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");
    setShowWarning(false);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      const nextAttempt = wrongAttempts + 1;

      setWrongAttempts(nextAttempt);

      if (nextAttempt === 1) {
        setError("Incorrect password. Please try again.");
      } else if (nextAttempt === 2) {
        setShowWarning(true);
        setError("Password incorrect.");
      } else if (nextAttempt >= 3) {
        setShowPrank(true);
        setEmail("");
        setPassword("");
        setWrongAttempts(0);
      }

      setLoading(false);
      return;
    }

    // Successful login
    setWrongAttempts(0);
    setPassword("");

    navigate("/chat");
  };

  const closePrank = () => {
    setShowPrank(false);
    setError("");
    setWrongAttempts(0);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {!showPrank ? (
          <>
            <div className="login-icon">🔐</div>

            <h1>Private Chat</h1>

            <p className="login-subtitle">Sign in to continue</p>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              {showWarning && (
                <div className="login-warning">
                  ⚠️ Multiple incorrect attempts detected.
                </div>
              )}

              {error && !showWarning && (
                <div className="login-error">{error}</div>
              )}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Checking..." : "Enter Chat"}
              </button>
            </form>
          </>
        ) : (
          <div className="prank-screen">
            <div className="prank-icon">😂</div>

            <h1>You are pranked!</h1>

            <p>Thanks for using the website.</p>

            <p className="prank-small">
              Don't worry, nothing happened to your account.
            </p>

            <button className="login-button" onClick={closePrank}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
