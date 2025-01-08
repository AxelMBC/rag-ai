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

const Header = ({ selectedModel, setSelectedModel }: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [offCanvas, setOffCanvas] = useState(false);
  const [username, setUsername] = useState("");

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
    setIsOpen(false);
  };

  const handleCloseOffCanvas = () => {
    setOffCanvas(false);
    setIsOpen(false);
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
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="modelDropdown"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
            >
              {selectedModel || "Select a Model"}
            </button>
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
                  className="btn btn-secondary w-100"
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

export default Header;
