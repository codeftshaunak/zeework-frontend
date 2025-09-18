const Title = ({ size, children }) => {
  return (
    <div
      className={`mb-2 font-semibold ${size == "sm" ? "text-2xl" : "text-3xl"}`}
    >
      {children}
    </div>
  );
};

export default Title;
