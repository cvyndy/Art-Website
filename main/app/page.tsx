"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
  name: string;
  imageSrc?: string;
  imageAlt?: string;
  colors: string;
};

type Showcase = {
  title: string;
  description: string;
  button: string;
  slides: Slide[];
};

function RevealOnView({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function SwipeCarousel({ slides, label }: { slides: Slide[]; label: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const goTo = (index: number) => {
    const total = slides.length;
    setCurrentIndex((index + total) % total);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) {
      return;
    }

    const touchEnd = event.changedTouches[0]?.clientX ?? touchStart;
    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > 40) {
      goTo(currentIndex + (distance > 0 ? 1 : -1));
    }

    setTouchStart(null);
  };

  const flowerBursts = {
    topRight: [
      { symbol: "✿", className: "right-8 top-2 text-[1.5rem] text-[#76add8]" },
      { symbol: "❀", className: "right-0 top-10 text-[1.15rem] text-[#9bcdf0]" },
      { symbol: "✼", className: "right-16 top-11 text-[0.95rem] text-[#5f95c6]" },
      { symbol: "•", className: "right-12 top-0 text-[0.8rem] text-[#cfe8fb]" },
    ],
    bottomLeft: [
      { symbol: "✿", className: "bottom-3 left-8 text-[1.35rem] text-[#8fc4ea]" },
      { symbol: "❀", className: "bottom-11 left-0 text-[1.1rem] text-[#6fa8d6]" },
      { symbol: "✼", className: "bottom-0 left-16 text-[0.95rem] text-[#4f86bb]" },
      { symbol: "•", className: "bottom-12 left-12 text-[0.8rem] text-[#d8efff]" },
    ],
  };

  return (
    <div className="relative overflow-visible rounded-[1.8rem] border border-[#9fd0f2] bg-white p-4 shadow-[0_0_0_3px_rgba(211,236,255,0.9)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 -top-5 z-10 h-24 w-24"
      >
        {flowerBursts.topRight.map((burst, index) => (
          <span
            key={`top-right-${burst.symbol}-${index}`}
            className={`absolute inline-block drop-shadow-[0_4px_10px_rgba(255,255,255,0.85)] ${burst.className}`}
            style={{
              animation: "floatPetal 5.5s ease-in-out infinite",
              animationDelay: `${index * 0.5}s`,
              willChange: "transform, opacity",
            }}
          >
            {burst.symbol}
          </span>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-5 -left-5 z-10 h-24 w-24"
      >
        {flowerBursts.bottomLeft.map((burst, index) => (
          <span
            key={`bottom-left-${burst.symbol}-${index}`}
            className={`absolute inline-block drop-shadow-[0_4px_10px_rgba(255,255,255,0.85)] ${burst.className}`}
            style={{
              animation: "floatPetal 6s ease-in-out infinite",
              animationDelay: `${index * 0.45}s`,
              willChange: "transform, opacity",
            }}
          >
            {burst.symbol}
          </span>
        ))}
      </div>

      <div
        className="relative overflow-hidden rounded-[1.5rem]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.name}
              className="w-full shrink-0 rounded-[1.5rem] border border-[#b6ddf7] bg-white p-4"
            >
              {slide.imageSrc ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-[1.2rem] bg-white">
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt ?? slide.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-[1.2rem] bg-[#f8fcff] text-center">
                  <div className="px-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7f9bb2]">
                      Add your image
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#648095]">
                      Set `imageSrc` to a file in `public/`.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label={`Previous ${label} slide`}
          onClick={() => goTo(currentIndex - 1)}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-[#365066] shadow-[0_10px_24px_rgba(138,180,212,0.18)] transition hover:bg-white"
        >
          ←
        </button>
        <button
          type="button"
          aria-label={`Next ${label} slide`}
          onClick={() => goTo(currentIndex + 1)}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-[#365066] shadow-[0_10px_24px_rgba(138,180,212,0.18)] transition hover:bg-white"
        >
          →
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={`${slide.name}-dot`}
            type="button"
            aria-label={`Go to ${label} slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition ${
              index === currentIndex ? "w-10 bg-[#7fb4dc]" : "w-8 bg-[#c9e3f7]"
            }`}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes floatPetal {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.82;
          }
          50% {
            transform: translate3d(0, -6px, 0);
            opacity: 1;
          }
          75% {
            transform: translate3d(2px, -3px, 0);
            opacity: 0.92;
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  // Add your own images by setting imageSrc to a file path from `public/`,
  // for example: imageSrc: "/images/soft-bloom-1.jpg"
  const showcases: Showcase[] = [
    {
      title: "Ashley DUCK Lin",
      description:
        "A little duck gallery with bright personality, goofy charm, and soft blue tones all the way through.",
      button: "Check it out <3",
      slides: [
        {
          name: "Rose hush",
          imageSrc: "/Duck selfie.jpg",
          imageAlt: "Soft Bloom Prints image one",
          colors: "from-[#dcecff] via-[#eef7ff] to-[#ffffff]",
        },
        {
          name: "Blue petals",
          imageSrc: "/duck.jpg",
          imageAlt: "Soft Bloom Prints image two",
          colors: "from-[#d5ecff] via-[#e8f5ff] to-[#fbfeff]",
        },
        {
          name: "Morning stems",
          imageSrc: "/ducky.jpg",
          imageAlt: "Soft Bloom Prints image three",
          colors: "from-[#dff7f4] via-[#eefcfb] to-[#ffffff]",
        },
      ],
    },
    {
      title: "Nicole OTTER Mendo",
      description:
        "A cozy set of otter snapshots that feels playful, sweet, and just a little bit chaotic in the best way.",
      button: "Check It out ;)",
      slides: [
        {
          name: "Ribbon bundle",
          imageSrc: "/otter.jpg",
          imageAlt: "Custom Gift Sets image one",
          colors: "from-[#e4f4ff] via-[#f4fbff] to-[#ffffff]",
        },
        {
          name: "Mini card set",
          imageSrc: "/otter2.jpg",
          imageAlt: "Custom Gift Sets image two",
          colors: "from-[#d8ecff] via-[#edf7ff] to-[#ffffff]",
        },
        {
          name: "Wrapped note",
          imageSrc: "/otter3.jpg",
          imageAlt: "Custom Gift Sets image three",
          colors: "from-[#d8f1eb] via-[#eefbf7] to-[#ffffff]",
        },
      ],
    },
    {
      title: "Cindy BIRB Vuong",
      description:
        "A tiny bird collection full of soft fluff, curious stares, and main-character energy.",
      button: "Check it out :D",
      slides: [
        {
          name: "Sky study",
          imageSrc: "/birb1.jpg",
          imageAlt: "Tiny Canvas Originals image one",
          colors: "from-[#d8eaff] via-[#edf5ff] to-[#ffffff]",
        },
        {
          name: "Cloud frame",
          imageSrc: "/birb2.jpg",
          imageAlt: "Tiny Canvas Originals image two",
          colors: "from-[#dff3ff] via-[#f1f9ff] to-[#ffffff]",
        },
        {
          name: "Quiet lake",
          imageSrc: "/birb3.jpg",
          imageAlt: "Tiny Canvas Originals image three",
          colors: "from-[#dff4f2] via-[#effcf9] to-[#ffffff]",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4fbff_0%,#fcfeff_100%)] px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto min-h-[92vh] max-w-7xl px-2 py-2 sm:px-4 sm:py-3">
        <header className="flex items-center justify-between gap-6 px-3 py-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#bfd8eb] bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#dcedff_100%)] text-[1.35rem] text-[#365066] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:h-14 sm:w-14 sm:text-[1.5rem]">
              ✿
            </div>
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-display)] text-2xl leading-none text-[#2c5068] sm:text-3xl">
                NAME OF SHOP
              </p>
              <p className="mt-1 text-sm tracking-[0.18em] text-[#7f9bb2] uppercase">
                Customizable gifts by 3 Chuds
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="group flex h-12 w-12 items-center justify-center rounded-full transition hover:bg-white/50"
          >
            <span className="flex flex-col items-end gap-[5px]">
              <span className="block h-[2px] w-6 rounded-full bg-[#365066] transition group-hover:w-5" />
              <span className="block h-[2px] w-8 rounded-full bg-[#365066]" />
              <span className="block h-[2px] w-6 rounded-full bg-[#365066] transition group-hover:w-7" />
            </span>
          </button>
        </header>

        <section className="mt-10 space-y-10 sm:mt-14 sm:space-y-12">
          {showcases.map((showcase, index) => {
            const imageOnLeft = index % 2 === 0;
            const textOnRight = imageOnLeft;

            return (
              <article
                key={showcase.title}
                className="grid items-center gap-8 rounded-[2rem] border border-[rgba(162,198,224,0.28)] bg-white/40 p-5 backdrop-blur-sm sm:p-7 lg:grid-cols-2 lg:gap-12"
              >
                <div
                  className={`flex flex-col space-y-4 ${
                    textOnRight
                      ? "lg:order-2 lg:items-start lg:text-left"
                      : "lg:order-1 lg:items-end lg:justify-self-end lg:text-right"
                  }`}
                >
                  <h2
                    className={`max-w-md font-[family-name:var(--font-display)] text-[1.7rem] leading-snug text-[#3f6783] sm:text-[2rem] ${
                      textOnRight ? "" : "lg:ml-auto"
                    }`}
                  >
                    {showcase.title}
                  </h2>
                  <p
                    className={`max-w-md text-base leading-8 text-[#5f798e] sm:text-lg ${
                      textOnRight ? "" : "lg:ml-auto"
                    }`}
                  >
                    {showcase.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex rounded-md border border-[#a9cde7] bg-[#dcefff] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#2c5068] transition hover:bg-[#d2e9ff]"
                  >
                    {showcase.button}
                  </a>
                </div>

                <div className={imageOnLeft ? "lg:order-1" : "lg:order-2"}>
                  <RevealOnView>
                    <SwipeCarousel
                      slides={showcase.slides}
                      label={showcase.title}
                    />
                  </RevealOnView>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
