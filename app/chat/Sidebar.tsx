"use client";
import { handleSignOut } from "../lib/auth/signOutServerAction";
import { useState, useEffect } from "react";
import { groqModels } from "../aiModels/groqModels";
import "./modelSelector.scss";
import { getAccountLinkStatus } from "../lib/auth/getAccountLinkStatusServer";
import { unlinkGoogleAccount } from "../lib/auth/unlinkGoogleAccountServerAction";
import { handleGoogleSignIn } from "../lib/auth/googleSignInServerAction";
import { getUserName } from "../lib/auth/getUserNameServerAction";

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

interface ModelOptionsType {
  id: string;
  owned_by: string;
  type: string;
  description: string;
}

const ModelSelector = ({
  selectedModel,
  setSelectedModel,
}: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userInfo = async () => {
      const name = await getUserName();
      if (name) {
        setUsername(name);
      }
    };
    const accountLinkStatus = async () => {
      await getAccountLinkStatus();
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

  return (
    <div className="dropdown d-flex justify-content-start m-4">
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

      <div
        className={`dropdown-menu${isOpen ? " show" : ""}`}
        aria-labelledby="modelDropdown"
      >
        {groqModels
          .filter((model: ModelOptionsType) => model.type === "text")
          .map((model: ModelOptionsType) => (
            <div key={model.id}>
              <button
                className="dropdown-item text-white"
                onClick={() => handleSelect(model.id)}
              >
                <strong>{model.id}</strong>
                <p className="mb-0">{model.description}</p>
              </button>
            </div>
          ))}
      </div>

      <div>{username}</div>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => handleSignOut()}
      >
        Sign Out
      </button>
      <button
        className="link-account-button"
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
        {isAccountLinked ? "Unlink Google Account" : "Link Google Account"}
      </button>
    </div>
  );
};

export default ModelSelector;
