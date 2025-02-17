import "./ToggleMemory.module.scss";
interface ToggleType {
  conversationalMemory: boolean;
  setConversationalMemory: (value: boolean) => void;
}

const ToggleMemory = ({
  conversationalMemory,
  setConversationalMemory,
}: ToggleType) => {
  return (
    <div className="toggle">
      <input
        type="checkbox"
        id="btn"
        onClick={() => setConversationalMemory(!conversationalMemory)}
      />
      <label htmlFor="btn"></label>
    </div>
  );
};

export default ToggleMemory;
