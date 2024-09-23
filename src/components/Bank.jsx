import "./Bank.css";

function Bank({ value, className }) {
  return (
    <div
      className={`text-5xl text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]
 font-bold animated-background transition-all ${className}`}
    >
      {value}
    </div>
  );
}

export default Bank;
