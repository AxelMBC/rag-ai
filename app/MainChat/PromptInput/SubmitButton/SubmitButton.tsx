const SubmitButton = ({ handlePrompt, loading }) => {
  return (
    <button
      className="d-flex justify-content-center align-items-center cursor-pointer me-3"
      onClick={() => handlePrompt()}
      disabled={loading}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "white",
      }}
    >
      <i className="fas fa-arrow-up" style={{ color: "black" }} />
    </button>
  );
};

export default SubmitButton;
