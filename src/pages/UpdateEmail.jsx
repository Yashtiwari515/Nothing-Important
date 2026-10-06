import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

function UpdateEmail() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const newEmail = email.trim();

    if (!newEmail) {
      setError("Please enter an email.");
      return;
    }

    if (newEmail === user?.email) {
      setError("This is already your current email.");
      return;
    }

    try {
      setLoading(true);

      const { error: updateError } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (updateError) {
        throw updateError;
      }

      setMessage(
        "Email update requested. Check your email to confirm the change.",
      );
    } catch (err) {
      console.error("Email update error:", err);
      setError(err.message || "Unable to update email.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">📧</div>

        <h1>Update Email</h1>

        <p className="login-subtitle">
          Change the email linked to your account
        </p>

        <form onSubmit={handleUpdateEmail}>
          <div className="form-group">
            <label>Current Email</label>

            <input type="email" value={user.email || ""} disabled />
          </div>

          <div className="form-group">
            <label>New Email</label>

            <input
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          {message && <div className="success-message">{message}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Updating..." : "Update Email"}
          </button>
        </form>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/chat")}
        >
          Back to Chat
        </button>
      </div>
    </div>
  );
}

export default UpdateEmail;
