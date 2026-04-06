import { useState, type CSSProperties, type ImgHTMLAttributes } from 'react';
import logoUrl from '../../assets/images/logo.png?url';

const publicFallback = `${import.meta.env.BASE_URL}logo.png`.replace(/\/{2,}/g, '/').replace(':/', '://');

/** URL du logo (import Vite `?url`). */
export const siteLogoUrl = logoUrl;

type SiteLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  /** Logo blanc sur fond sombre (footer, panneau login) — filtre inline pour éviter tout souci Tailwind. */
  inverted?: boolean;
};

export default function SiteLogo({
  className = '',
  alt = 'Coris Meso Finance',
  inverted,
  style,
  ...props
}: SiteLogoProps) {
  const [src, setSrc] = useState(logoUrl);

  const filterStyle: CSSProperties | undefined = inverted
    ? { filter: 'brightness(0) invert(1)' }
    : undefined;

  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      onError={() => {
        if (src !== publicFallback) setSrc(publicFallback);
      }}
      className={['block min-h-[2.25rem] w-auto max-w-[min(100%,240px)] object-contain object-left', className].filter(Boolean).join(' ')}
      style={{ ...filterStyle, ...style }}
      {...props}
    />
  );
}
