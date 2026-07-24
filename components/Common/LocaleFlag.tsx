import { type Locale, localeLabels } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type LocaleFlagProps = {
  locale: Locale;
  className?: string;
  size?: number;
};

export default function LocaleFlag({
  locale,
  className,
  size = 20,
}: LocaleFlagProps) {
  const { flag, nativeName } = localeLabels[locale];
  const height = Math.round((size * 3) / 4);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- local SVG flags; next/image is unnecessary here
    <img
      src={`/images/flags/${flag}.svg`}
      alt=""
      width={size}
      height={height}
      className={cn("shrink-0 rounded-[2px] object-cover ring-1 ring-black/10", className)}
      aria-hidden="true"
      title={nativeName}
      draggable={false}
    />
  );
}
