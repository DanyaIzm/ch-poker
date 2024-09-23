function WinnerPage({ winner }) {
  return (
    <div className="h-screen flex content-center justify-center">
      <h1
        className="text-5xl text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]
 font-bold animated-background transition-all m-auto"
      >
        Winner is player {winner}
      </h1>
    </div>
  );
}

export default WinnerPage;
