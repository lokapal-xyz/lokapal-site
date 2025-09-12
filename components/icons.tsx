import { siGithub, siX, siLogmein, siSubstack, siTelegram, siMedium, siProducthunt, siMega } from 'simple-icons';

interface SimpleIconProps {
  size?: number;
  className?: string;
}

export function GithubIcon({ size = 24, className = "" }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d={siGithub.path} />
    </svg>
  );
}

export function XIcon({ size = 24, className = "" }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d={siX.path} />
    </svg>
  );
}

export function LinkedInIcon({ size = 24, className = "" }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d={siLogmein.path} />
    </svg>
  );
}

export function SubstackIcon({ size = 24, className = "" }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d={siSubstack.path} />
    </svg>
  );
}

export function TelegramIcon({ size = 24, className = "" }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d={siTelegram.path} />
    </svg>
  );
}

export function MediumIcon({ size = 24, className = "" }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d={siMedium.path} />
    </svg>
  );
}

export function PhIcon({ size = 24, className = "" }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d={siProducthunt.path} />
    </svg>
  );
}
