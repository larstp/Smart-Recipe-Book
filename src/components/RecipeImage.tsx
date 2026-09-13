import { useState } from 'react';

type RecipeImageProps = {
  src?: string | null;
  alt?: string;
  title: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  fallbackTextClassName?: string;
};

export default function RecipeImage({
  src,
  alt,
  title,
  className,
  imageClassName,
  fallbackClassName,
  fallbackTextClassName,
}: RecipeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const normalizedSrc = src?.trim() ?? '';
  const shouldShowFallback = !normalizedSrc || failedSrc === normalizedSrc;

  return (
    <div className={className}>
      {shouldShowFallback ? (
        <div
          className={`flex flex-col items-center justify-center gap-3 rounded-lg bg-gray-100 text-gray-600 ${fallbackClassName ?? ''}`}
          role="img"
          aria-label={alt || title}
        >
          <img
            src="/icons/orange/lucide_donut.svg"
            alt="No image available"
            className="h-14 w-14"
            loading="lazy"
          />
          <p
            className={`text-sm font-semibold select-none ${fallbackTextClassName ?? ''}`}
          >
            No image available
          </p>
        </div>
      ) : (
        <img
          src={normalizedSrc}
          alt={alt || title}
          onError={() => setFailedSrc(normalizedSrc)}
          className={imageClassName}
          loading="lazy"
        />
      )}
    </div>
  );
}
