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
    <div className="col-auto d-inline">
      <div className="d-flex align-items-center">
        Modelo:
        <select
          className="border-0 bg-transparent text-white ms-4"
          value={selectedModel}
          onChange={(e) => {
            setSelectedModel(e.target.value);
          }}
        >
          {groqModels.map((model) => (
            <option key={model.id} style={{ backgroundColor: "rgba(1,1,1)" }}>
              {model.id}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default ModelSelector;
