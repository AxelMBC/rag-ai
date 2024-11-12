"use client";

import { groqModels, promptOptions } from "../AIModels/groqModels";

interface modelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  isThread: boolean;
  setIsThread: (isThread: boolean) => void;
}

const ModelSelector = ({
  selectedModel,
  setSelectedModel,
  isThread,
  setIsThread,
}: modelSelectorProps) => {
  return (
    <div className="fixed-selector">
      <div>
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
      <div>
        Zero-Shot Prompting:
        <select
          className="border-0 text-white ms-1"
          value={isThread.toString()}
          onChange={(e) => {
            setIsThread(e.target.value === "true");
            console.log("target: ", e.target);
          }}
          style={{ width: "150px" }}
        >
          {promptOptions.map((item) => (
            <option
              key={item.label}
              value={item.value.toString()}
              style={{ backgroundColor: "rgba(1,1,1)" }}
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default ModelSelector;
