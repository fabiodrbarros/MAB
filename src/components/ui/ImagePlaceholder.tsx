import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
}

export default function ImagePlaceholder({
  label = "Imagem a substituir",
  className,
  aspectRatio = "landscape",
}: ImagePlaceholderProps) {
  const ratios = {
    square:    "aspect-square",
    video:     "aspect-video",
    portrait:  "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  return (
    <div
      className={cn(
        "relative bg-brand-dark/80 border border-white/5 overflow-hidden flex items-center justify-center",
        ratios[aspectRatio],
        className
      )}
    >
      {/* Technical grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ph-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(201,106,43,0.4)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ph-grid)" />
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(201,106,43,0.15)" strokeWidth="0.5" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(201,106,43,0.15)" strokeWidth="0.5" />
      </svg>

      {/* Corner marks */}
      {[
        "top-2 left-2 border-t border-l",
        "top-2 right-2 border-t border-r",
        "bottom-2 left-2 border-b border-l",
        "bottom-2 right-2 border-b border-r",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-4 h-4 border-brand-copper/40`} />
      ))}

      <div className="relative z-10 text-center px-4">
        <div className="w-8 h-8 border border-brand-copper/30 mx-auto mb-3 flex items-center justify-center">
          <span className="text-brand-copper/40 text-xs">+</span>
        </div>
        <p className="text-brand-copper/50 text-[10px] tracking-[0.2em] uppercase">{label}</p>
      </div>
    </div>
  );
}
