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
    <div className="col-12 text-center">
      <select
        value={selectedModel}
        onChange={(e) => {
          setSelectedModel(e.target.value);
        }}
      >
        {groqModels.map((model) => (
          <option key={model.id}>{model.id}</option>
        ))}
      </select>
      <p className="prompt">What is your question?</p>
    </div>
  );
};
export default ModelSelector;
