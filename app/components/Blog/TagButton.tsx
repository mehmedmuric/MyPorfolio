import Link from "next/link";

const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  const isExternal = href.startsWith('http') || href.startsWith('https');
  const Component = isExternal ? 'a' : Link;
  const linkProps = isExternal 
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href };

  return (
    <Component
      {...linkProps}
      className="group relative inline-flex items-center justify-center min-h-[44px] px-4 py-2 
        rounded-sm bg-[#0a0a0a] border border-[#00ff41]/30 text-sm font-mono font-medium 
        text-[#788293] transition-all duration-200 hover:border-[#00ff41] hover:text-[#00ff41] 
        hover:bg-[#00ff41]/10 hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:scale-105 
        active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 
        focus:ring-offset-[#050805] will-change-transform"
    >
      <span className="relative z-10">{text}</span>
      
      {/* Glow effect on hover */}
      <span className="absolute inset-0 rounded-sm bg-[#00ff41]/0 group-hover:bg-[#00ff41]/5 
        blur-md transition-opacity duration-200 pointer-events-none" />
    </Component>
  );
};

export default TagButton;