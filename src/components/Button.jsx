function Button({ children, onClick, variant = "primary", type = "button" }) {
  const styles = {
    primary: { backgroundColor: "#1a367c", color: "white", border: "none" },
    outline: { backgroundColor: "transparent", color: "#1a367c", border: "2px solid #1a367c" }
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      style={{
        padding: "12px 24px",
        borderRadius: "4px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
        ...styles[variant]
      }}
    >
      {children}
    </button>
  );
}
export default Button;