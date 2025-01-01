"use client";
import { handleSignOut } from "../lib/auth/signOutServerAction";
import { useState } from "react";
import { groqModels } from "../aiModels/groqModels";
import "./modelSelector.scss";

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
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => handleSignOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default ModelSelector;
