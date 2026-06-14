"use client";

import Image from "next/image";
import Link from "next/link";
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
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const welcomeText = "Welcome to Our Shop";
  const [typedWelcome, setTypedWelcome] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;

    setTypedWelcome("");

    const interval = window.setInterval(() => {
      currentIndex += 1;
      setTypedWelcome(welcomeText.slice(0, currentIndex));

      if (currentIndex >= welcomeText.length) {
        window.clearInterval(interval);
      }
    }, 70);

    return () => window.clearInterval(interval);
  }, []);

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

  const menuItems = [
    { label: "Welcome", href: "/", current: true },
    { label: "Shop 1", href: "#" },
    { label: "Shop 2", href: "#" },
    { label: "Shop 3", href: "#" },
    { label: "About Us", href: "/about-us" },
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4fbff_0%,#fcfeff_100%)] px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto min-h-[92vh] max-w-7xl px-2 py-2 sm:px-4 sm:py-3">
        <header className="flex items-center justify-between gap-6 px-3 py-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#bfd8eb] bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#dcedff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:h-16 sm:w-16">
              <Image
                src="/icon.jpg"
                alt="Shop icon"
                fill
                className="object-cover"
              />
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

          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="group flex h-12 w-12 items-center justify-center rounded-full transition hover:bg-white/50"
            >
              <span className="flex flex-col items-end gap-[5px]">
                <span className="block h-[2px] w-6 rounded-full bg-[#365066] transition group-hover:w-5" />
                <span className="block h-[2px] w-8 rounded-full bg-[#365066]" />
                <span className="block h-[2px] w-6 rounded-full bg-[#365066] transition group-hover:w-7" />
              </span>
            </button>

            {isMenuOpen ? (
              <div
                role="menu"
                aria-label="Site navigation"
                className="absolute right-0 top-14 z-20 min-w-[12rem] rounded-[1.4rem] border border-[#bdd7ec] bg-white/95 p-2 shadow-[0_20px_40px_rgba(159,193,218,0.28)] backdrop-blur-sm"
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    role="menuitem"
                    aria-current={item.current ? "page" : undefined}
                    className={`flex items-center justify-between rounded-[1rem] px-4 py-3 text-sm transition ${
                      item.current
                        ? "bg-[#e8f4ff] font-semibold text-[#2c5068]"
                        : "text-[#57758f] hover:bg-[#f4faff] hover:text-[#2c5068]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.current ? (
                      <span className="text-xs uppercase tracking-[0.18em] text-[#7ea6c4]">
                        Here
                      </span>
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <section className="mt-10 sm:mt-14">
          <h1 className="mb-8 min-h-[2.8rem] text-center font-[family-name:var(--font-display)] text-[2rem] leading-none text-[#3f6783] sm:mb-10 sm:min-h-[3.4rem] sm:text-[2.5rem]">
            {typedWelcome}
          </h1>

          <div className="space-y-10 sm:space-y-12">
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
          </div>
        </section>
      </div>
    </main>
  );
}
