import Image from "next/image";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div
      className={`${className} rounded-full overflow-hidden flex items-center justify-center border border-gray-200/80 shadow-sm flex-shrink-0 bg-white`}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/logo-kampung.jpg"
          alt="Logo Kampung Gendeng"
          fill
          priority
          sizes="(max-width: 768px) 48px, 64px"
          className="object-cover scale-105" 
        />
      </div>
    </div>
  );
}
