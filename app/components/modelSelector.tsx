"use client";

import { groqModels } from "../AIModels/groqModels";

interface modelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const ModelSelector = ({
  selectedModel,
  setSelectedModel,
}: modelSelectorProps) => {
  return (
    <div className="fixed-selector">
      Modelo:
      <select
        className="border-0 text-white ms-1"
        value={selectedModel}
        onChange={(e) => {
          setSelectedModel(e.target.value);
        }}
        style={{ width: "150px" }}
      >
        {groqModels.map((model) => (
          <option key={model.id} style={{ backgroundColor: "rgba(1,1,1)" }}>
            {model.id}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ModelSelector;
