import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { getProfiles, updateLastSeen } from "../services/profileService";
import {
  getConversation,
  getMessages,
  sendMessage,
} from "../services/messageService";
import { useNavigate } from "react-router-dom";

function Chat() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  // Get display name
  const getDisplayName = (userId) => {
    const profile = profiles.find((profile) => profile.id === userId);

    return profile?.display_name || "User";
  };

  // Get other user
  const getOtherUser = () => {
    return profiles.find((profile) => profile.id !== user?.id);
  };

  /*
   * ============================
   * INITIALIZE CHAT
   * ============================
   */

  useEffect(() => {
    if (!user) return;

    let channel = null;
    let cancelled = false;

    const initializeChat = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Get conversation
        const conversation = await getConversation();

        if (cancelled) return;

        setConversationId(conversation);

        // 2. Get profiles
        const profileData = await getProfiles();

        if (cancelled) return;

        setProfiles(profileData);

        // 3. Get existing messages
        const existingMessages = await getMessages(conversation);

        if (cancelled) return;

        setMessages(existingMessages);

        // 4. Update our last seen
        await updateLastSeen(user.id);

        if (cancelled) return;

        /*
         * ============================
         * REALTIME CHANNEL
         * ============================
         */

        channel = supabase.channel(`chat-${conversation}-${user.id}`);

        // IMPORTANT:
        // Add ALL callbacks BEFORE subscribe()

        channel.on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${conversation}`,
          },
          (payload) => {
            setMessages((current) => {
              const exists = current.some((msg) => msg.id === payload.new.id);

              if (exists) {
                return current;
              }

              return [...current, payload.new];
            });
          },
        );

        // Subscribe only AFTER callbacks are added
        channel.subscribe((status) => {
          console.log("Realtime status:", status);
        });
      } catch (err) {
        console.error("Chat initialization error:", err);

        if (!cancelled) {
          setError(err?.message || "Unable to load chat.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    initializeChat();

    return () => {
      cancelled = true;

      if (channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    };
  }, [user]);

  /*
   * ============================
   * LAST SEEN HEARTBEAT
   * ============================
   */

  useEffect(() => {
    if (!user) return;

    const updatePresence = async () => {
      try {
        await updateLastSeen(user.id);
      } catch (err) {
        console.error("Last seen update failed:", err);
      }
    };

    updatePresence();

    const interval = setInterval(updatePresence, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  /*
   * ============================
   * AUTO SCROLL
   * ============================
   */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /*
   * ============================
   * SEND MESSAGE
   * ============================
   */

  const handleSend = async (e) => {
    e.preventDefault();

    const text = message.trim();

    if (!text || !conversationId || !user) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await sendMessage(conversationId, user.id, text);
    } catch (err) {
      console.error("Send message error:", err);

      setMessage(text);

      setError("Message could not be sent.");
    }
  };

  /*
   * ============================
   * LOGOUT
   * ============================
   */

  const handleLogout = async () => {
    try {
      await updateLastSeen(user.id);

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  /*
   * ============================
   * LOADING
   * ============================
   */

  if (loading) {
    return <div className="chat-loading">Loading chat...</div>;
  }

  const otherUser = getOtherUser();
  const currentUserProfile = profiles.find(
    (profile) => profile.id === user?.id,
  );

  /*
   * ============================
   * UI
   * ============================
   */

  return (
    <div className="chat-page">
      {/* HEADER */}

      <header className="chat-header">
        <div className="profile-info">
          <div className="avatar">
            {currentUserProfile?.display_name?.charAt(0)?.toUpperCase() || "P"}
          </div>

          <div>
            <h2>{currentUserProfile?.display_name || "Private Chat"}</h2>

            <span>Online</span>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="account-button"
            onClick={() => navigate("/account")}
          >
            Account
          </button>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* MESSAGES */}

      <main className="messages-container">
        {messages.length === 0 && (
          <div className="empty-chat">
            <div className="empty-icon">💬</div>

            <h3>No messages yet</h3>

            <p>Start a conversation.</p>
          </div>
        )}

        {messages.map((msg) => {
          const isMine = msg.sender_id === user.id;

          return (
            <div
              key={msg.id}
              className={`message-row ${isMine ? "mine" : "theirs"}`}
            >
              <div className="message-bubble">
                {!isMine && (
                  <span className="sender-name">
                    {getDisplayName(msg.sender_id)}
                  </span>
                )}

                <p>{msg.content}</p>

                <span className="message-time">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </main>

      {/* ERROR */}

      {error && <div className="error-message">{error}</div>}

      {/* INPUT */}

      <form className="message-input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit" disabled={!message.trim()}>
          ➤
        </button>
      </form>
    </div>
  );
}

export default Chat;
