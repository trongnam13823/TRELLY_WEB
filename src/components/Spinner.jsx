export default function Spinner({ size = 56, strokeWidth = 4 }) {
  return (
    <div className="relative animate-spin">
      <div
        style={{ width: size, height: size, borderWidth: strokeWidth }}
        className={`rounded-full border-primary border-x-transparent`}
      />
      <div
        style={{ borderWidth: strokeWidth, inset: strokeWidth }}
        className={`absolute border-primary/10 rounded-full`}
      />
    </div>
  );
}