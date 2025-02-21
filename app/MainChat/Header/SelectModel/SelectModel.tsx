import "./SelectModelStyle.scss";
import { groqModels } from "../../../aiModels/groqModels";

type HandleSelectFunction = (modelId: string) => void;

interface SelectModelProps {
  selectedModel: string;
  handleSelect: HandleSelectFunction;
}

const SelectModel = ({ selectedModel, handleSelect }: SelectModelProps) => {
  return (
    <select
      className="btn btn-secondary"
      id="modelDropdown"
      onChange={(e) => handleSelect(e.target.value)}
      defaultValue={selectedModel}
    >
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
  );
};

export default SelectModel;
