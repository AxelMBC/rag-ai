"use client";
import { handleSignOut } from "../../lib/auth/signOutServerAction";
import { useState, useEffect } from "react";
import { groqModels } from "../../aiModels/groqModels";
import "./modelSelector.scss";
import { getAccountLinkStatus } from "../../lib/auth/getAccountLinkStatusServer";
import { unlinkGoogleAccount } from "../../lib/auth/unlinkGoogleAccountServerAction";
import { handleGoogleSignIn } from "../../lib/auth/googleSignInServerAction";
import { getUserName } from "../../lib/auth/getUserNameServerAction";

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const SideBar = ({ selectedModel, setSelectedModel }: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [offCanvas, setOffCanvas] = useState(false);
  const [username, setUsername] = useState("");
  const [updateUsername, setUpdateUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const userInfo = async () => {
      const name = await getUserName();
      if (name) {
        setUsername(name);
      }
    };
    const accountLinkStatus = async () => {
      try {
        const accountLinkStatus = await getAccountLinkStatus();
        setIsAccountLinked(accountLinkStatus);
      } catch (error) {
        console.error("Error getting account link status", error);
      }
    };
    userInfo();
    accountLinkStatus();
  }, []);

  const handleSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleCloseOffCanvas = () => {
    setOffCanvas(false);
    setIsOpen(false);
  };

  const handleSaveUsername = () => {
    if (newUsername.trim()) {
      setUsername(newUsername);
      setUpdateUsername(false);
      setIsOpen(false);
      setNewUsername("");
    }
  };

  return (
    <>
      <div
        className="position-fixed"
        style={{ backgroundColor: "#121212", width: "100%" }}
      >
        <div className="d-flex align-items-center justify-content-start m-4">
          <i
            className="fa-solid fa-bars fa-xl me-4 cursor-pointer"
            onClick={() => setOffCanvas(true)}
          ></i>
          <div className="pe-4">
            <select
              className="btn btn-secondary dropdown-toggle"
              id="modelDropdown"
              onChange={(e) => handleSelect(e.target.value)}
            >
              {selectedModel || "Select a Model"}
              {groqModels.map((model) => {
                if (model.type === "text") {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.id}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Off-Canvas Sidebar */}
      <div className={`offcanvas-container ${offCanvas ? "active" : ""}`}>
        <div className="offcanvas-content">
          <button className="btn-close" onClick={() => handleCloseOffCanvas()}>
            &times;
          </button>
          <h3>Account Options</h3>

          <select
            className="btn btn-secondary dropdown-toggle mt-4"
            id="modelDropdown"
            onChange={(e) => handleSelect(e.target.value)}
          >
            {selectedModel || "Select a Model"}
            {groqModels.map((model) => {
              return (
                <option key={model.id} value={model.id}>
                  {model.id}
                </option>
              );
            })}
          </select>
          {/* Footer section at the bottom */}
          <div className="offcanvas-footer position-relative">
            {isOpen && (
              <div className="hover-menu position-absolute">
                <button
                  className="btn btn-danger w-100 mb-2"
                  type="button"
                  onClick={() => handleSignOut()}
                >
                  Sign Out
                </button>
                <button
                  className="btn btn-secondary w-100 mb-2"
                  onClick={
                    isAccountLinked
                      ? async () => {
                          await unlinkGoogleAccount().then(() => {
                            setIsAccountLinked(false);
                          });
                        }
                      : async () => {
                          await handleGoogleSignIn().then(() => {
                            setIsAccountLinked(true);
                          });
                        }
                  }
                >
                  {isAccountLinked
                    ? "Unlink Google Account"
                    : "Link Google Account"}
                </button>
                {!updateUsername ? (
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => setUpdateUsername(true)}
                  >
                    Update Username
                  </button>
                ) : (
                  <div className="update-username-container">
                    <input
                      className="styled-input"
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Username"
                    />
                    <button
                      className="btn save-button"
                      onClick={handleSaveUsername}
                      aria-label="Save username"
                    >
                      <i className="fa-solid fa-floppy-disk"></i>
                    </button>
                  </div>
                )}
              </div>
            )}
            <div
              className="custom-username-button d-inline-flex align-items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p className="pe-3 mb-0">{username ? username : "User"}</p>
              <div className="user-icon-wrapper">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {offCanvas && (
        <div
          className="offcanvas-overlay"
          onClick={() => setOffCanvas(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
