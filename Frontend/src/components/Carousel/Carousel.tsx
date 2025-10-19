import { useRef, useCallback, useEffect } from "react";
import "./Carousel.module.css";

interface CarouselProps {
  images: string[];
  autoScroll?: boolean;
  scrollSpeed?: number;
}

export function Carousel({
  images,
  autoScroll = false,
  scrollSpeed = 300,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fonction de défilement optimisée avec useCallback
  const scrollByAmount = useCallback((amount: number) => {
    carouselRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }, []);

  // Gestion du scroll avec la molette
  const handleWheelScroll = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      scrollByAmount(e.deltaY);
    },
    [scrollByAmount]
  );

  // Navigation gauche/droite
  const handleNavigation = useCallback(
    (direction: "left" | "right") => {
      const scrollAmount = carouselRef.current?.offsetWidth ?? 0;
      scrollByAmount(direction === "left" ? -scrollAmount : scrollAmount);
    },
    [scrollByAmount]
  );

  // Auto-scroll
  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      handleNavigation("right");
    }, scrollSpeed);
    return () => clearInterval(interval);
  }, [autoScroll, scrollSpeed, handleNavigation]);

  // Gestion clavier (accessibilité)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleNavigation("left");
      if (e.key === "ArrowRight") handleNavigation("right");
    },
    [handleNavigation]
  );

  return (
    <div
      className="carousel-wrapper"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Image carousel"
    >
      {/* Bouton gauche */}
      <button
        onClick={() => handleNavigation("left")}
        className="carousel-arrow arrow-left"
        aria-label="Previous slide"
        type="button"
      >
        &lt;
      </button>

      {/* Carousel */}
      <div
        className="carousel-container"
        ref={carouselRef}
        onWheel={handleWheelScroll}
        role="list"
      >
        {images.map((image, index) => (
          <div
            key={`slide-${index}`}
            className="carousel-slide"
            role="listitem"
          >
            <img
              src={image}
              alt={`Slide ${index + 1} of ${images.length}`}
              className="carousel-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Bouton droite */}
      <button
        onClick={() => handleNavigation("right")}
        className="carousel-arrow arrow-right"
        aria-label="Next slide"
        type="button"
      >
        &gt;
      </button>

      {/* Indicateurs de position */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={`indicator-${index}`}
            className="carousel-indicator"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => {
              const scrollAmount =
                (carouselRef.current?.offsetWidth ?? 0) * index;
              carouselRef.current?.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
