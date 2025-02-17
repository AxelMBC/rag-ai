import "./toggleStyle.scss";
interface ToggleType {
  conversationalMemory: boolean;
  setConversationalMemory: (value: boolean) => void;
}

const Toggle = ({
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

export default Toggle;
