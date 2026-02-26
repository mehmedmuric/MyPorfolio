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
      className="inline-flex items-center justify-center px-5 py-2.5
        rounded-xl bg-slate-800 border border-slate-700
        text-sm font-medium text-slate-300
        hover:bg-emerald-600 hover:border-emerald-500 hover:text-white
        hover:shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-0.5
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
    >
      {text}
    </Component>
  );
};

export default TagButton;