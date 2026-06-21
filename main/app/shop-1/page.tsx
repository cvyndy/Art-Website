"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

type Product = {
  name: string;
  price: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  status: string;
};

// Add or remove products here to grow the page.
// Use `imageSrc` with files from `public/`, for example: "/duck.jpg"
const pipeCleanerBouquets: Product[] = [
  {
    name: "Sunny Bloom Bouquet",
    price: "$28",
    description:
      "A soft pastel bouquet with playful color and a handmade gift-shop feel.",
    imageSrc: "/ducky.jpg",
    imageAlt: "Pipe cleaner flower bouquet",
    status: "Made to order",
  },
  {
    name: "Blue Skies Bouquet",
    price: "$32",
    description:
      "A fuller bouquet with airy blue tones and a sweet, cheerful silhouette.",
    imageSrc: "/otter2.jpg",
    imageAlt: "Blue pipe cleaner bouquet",
    status: "Low stock",
  },
  {
    name: "Mini Thank You Bouquet",
    price: "$16",
    description:
      "A smaller bouquet meant for quick gifts, desk decor, or add-on orders.",
    imageSrc: "/birb3.jpg",
    imageAlt: "Mini pipe cleaner bouquet",
    status: "Ready to ship",
  },
];

const photoCards: Product[] = [
  {
    name: "Duck Selfie Photo Card",
    price: "$8",
    description:
      "A glossy photo card with bright duck energy for journaling, gifts, or display.",
    imageSrc: "/Duck selfie.jpg",
    imageAlt: "Duck selfie photo card",
    status: "New",
  },
  {
    name: "Otter Cozy Photo Card",
    price: "$8",
    description:
      "A soft little otter portrait card with calm tones and cozy character.",
    imageSrc: "/otter.jpg",
    imageAlt: "Otter photo card",
    status: "Ready to ship",
  },
  {
    name: "Birb Drama Photo Card",
    price: "$8",
    description:
      "A tiny main-character bird card that feels cute, dramatic, and easy to collect.",
    imageSrc: "/birb1.jpg",
    imageAlt: "Bird photo card",
    status: "Ready to ship",
  },
];

const menuItems = [
  { label: "Welcome", href: "/", current: false },
  { label: "Shop 1", href: "/shop-1", current: true },
  { label: "Shop 2", href: "/shop-2", current: false },
  { label: "Shop 3", href: "#", current: false },
  { label: "About Us", href: "/about-us", current: false },
];

export default function ShopOnePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const renderProductSection = (
    title: string,
    subtitle: string,
    note: string,
    items: Product[],
  ) => (
    <RevealOnView>
      <div className="relative mt-10 rounded-[2rem] border border-[rgba(162,198,224,0.28)] bg-[#fdfefe] p-6 shadow-[0_14px_30px_rgba(188,214,233,0.16)] sm:p-8">
        <div className="absolute right-8 top-4 h-5 w-16 rotate-[4deg] rounded-sm bg-[rgba(207,232,255,0.7)]" />
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#8caec7]">
          {subtitle}
        </p>
        <h2 className="mt-2 text-center font-[family-name:var(--font-display)] text-[1.8rem] text-[#3f6783] sm:text-[2.2rem]">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-7 text-[#5f798e]">
          {note}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((product) => (
            <article
              key={product.name}
              className="relative rounded-[2rem] border border-[rgba(162,198,224,0.3)] bg-[#fdfefe] p-5 shadow-[0_14px_30px_rgba(188,214,233,0.16)]"
            >
              <div className="absolute left-1/2 top-3 h-5 w-16 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-[rgba(191,214,227,0.55)]" />
              <div className="mb-4 flex items-center justify-end gap-3 pt-3">
                <span className="rounded-full bg-[#e8f4ff] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#5a84a0]">
                  {product.status}
                </span>
              </div>

              {product.imageSrc ? (
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-[#d9eaf7] bg-white">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt ?? product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-[1.5rem] border border-dashed border-[#c8dcec] bg-[#f8fcff] text-center text-sm leading-6 text-[#648095]">
                  Add a product image in `public/`
                </div>
              )}

              <h3 className="mt-5 font-[family-name:var(--font-display)] text-[1.6rem] leading-tight text-[#3f6783]">
                {product.name}
              </h3>
              <p className="mt-2 text-lg font-semibold text-[#2c5068]">
                {product.price}
              </p>
              <p className="mt-3 text-base leading-7 text-[#5f798e]">
                {product.description}
              </p>

              <button
                type="button"
                className="mt-5 inline-flex rounded-md border border-[#a9cde7] bg-[#dcefff] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#2c5068] transition hover:bg-[#d2e9ff]"
              >
                Check it out
              </button>
            </article>
          ))}
        </div>
      </div>
    </RevealOnView>
  );

  return (
    <main className="min-h-screen bg-[#eef7ff] px-4 py-4 sm:px-6 sm:py-6">
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
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#7f9bb2]">
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

        <section className="relative mt-10 overflow-hidden rounded-[2.3rem] border border-[#cfe3f4] bg-[#f6fbff] px-5 py-8 shadow-[0_18px_42px_rgba(188,214,233,0.18)] sm:mt-14 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_31px,rgba(124,160,186,0.15)_31px,rgba(124,160,186,0.15)_32px)]" />
          <div className="pointer-events-none absolute inset-y-0 left-[9%] w-[2px] bg-[rgba(152,186,214,0.34)]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(126,166,196,0.12)_0.8px,transparent_0.8px)] [background-size:18px_18px]" />
          <div className="pointer-events-none absolute left-5 top-8 rotate-[-10deg] text-[1.2rem] text-[#9bbfe0]">✿</div>
          <div className="pointer-events-none absolute right-8 top-14 rotate-[8deg] text-[1rem] text-[#87a9bf]">❀</div>
          <div className="pointer-events-none absolute bottom-8 right-10 rotate-[-8deg] text-[1.2rem] text-[#b3d3ec]">✿</div>

          <div className="relative">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.26em] text-[#7ea6c4]">
              Shop Page
            </p>
            <h1 className="mt-2 text-center font-[family-name:var(--font-display)] text-[2.2rem] text-[#3f6783] sm:text-[2.8rem]">
              Ashley&apos;s Shop
            </h1>
          </div>

          {renderProductSection(
            "Flowers you can choose from",
            "Bouquet Board",
            "Handmade bouquet listings live here. Add as many styles, sizes, or colorways as you want in the bouquet array.",
            pipeCleanerBouquets,
          )}

          {renderProductSection(
            "Photo Cards",
            "Card Board",
            "Use this section for collectible photo cards, small card packs, or themed drops with the same layout.",
            photoCards,
          )}
        </section>
      </div>
    </main>
  );
}
