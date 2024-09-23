function Balance({ value, className }) {
  return (
    <div className={`text-3xl text-slate-200 italic ${className}`}>
      Balance: {value}
    </div>
  );
}

export default Balance;
