export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div
      className={`${className} rounded-full bg-primary flex items-center justify-center border-2 border-accent/40 shadow-sm flex-shrink-0`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="20" cy="20" r="20" fill="#14532d" />
        <circle cx="20" cy="20" r="17" fill="none" stroke="#bef264" strokeWidth="1.5" strokeDasharray="2.5 2" />
        <text
          x="20"
          y="25"
          textAnchor="middle"
          fill="white"
          fontSize="13"
          fontWeight="800"
          fontFamily="sans-serif"
        >
          KG
        </text>
      </svg>
    </div>
  );
}
