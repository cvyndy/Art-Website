"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Commission = {
  name: string;
  price: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  status: string;
};

const characterCommissions: Commission[] = [
  {
    name: "Mini Character Plush",
    price: "Starting at $35",
    description:
      "A small crochet version of a favorite character with signature colors, outfit details, and a cute desk-sized finish.",
    imageSrc: "/duck.jpg",
    imageAlt: "Mini crochet character commission example",
    status: "Open",
  },
  {
    name: "Deluxe Character Doll",
    price: "Starting at $58",
    description:
      "A more detailed custom piece with extra accessories, hair shaping, and layered costume features.",
    imageSrc: "/otter3.jpg",
    imageAlt: "Detailed crochet character doll example",
    status: "Open",
  },
  {
    name: "Couple Character Set",
    price: "Starting at $95",
    description:
      "Two matching crochet character dolls made as a pair for gifts, displays, or fandom-themed keepsakes.",
    imageSrc: "/birb2.jpg",
    imageAlt: "Pair of crochet character commissions",
    status: "Limited slots",
  },
];

const ocCommissions: Commission[] = [
  {
    name: "Original Character Mini",
    price: "Starting at $40",
    description:
      "A custom OC crochet plush based on your references, color palette, and overall vibe.",
    imageSrc: "/Duck selfie.jpg",
    imageAlt: "Original character crochet commission example",
    status: "Open",
  },
  {
    name: "OC With Props",
    price: "Starting at $68",
    description:
      "A more expressive build for original characters that includes favorite accessories, props, or themed details.",
    imageSrc: "/otter.jpg",
    imageAlt: "Original character with accessory commission example",
    status: "Made to quote",
  },
  {
    name: "Full Storypiece OC",
    price: "Starting at $110",
    description:
      "A larger custom order for detailed OCs with styling choices that make the final piece feel especially personal.",
    imageSrc: "/birb1.jpg",
    imageAlt: "Detailed original character crochet piece",
    status: "Waitlist",
  },
];

const requestSteps = [
  "Send character or OC references, colors, and any must-have details.",
  "We confirm size, complexity, timeline, and a starting quote.",
  "Once approved, your custom crochet piece goes into the commission queue.",
];

const menuItems = [
  { label: "Welcome", href: "/", current: false },
  { label: "Shop 1", href: "/shop-1", current: false },
  { label: "Shop 2", href: "/shop-2", current: true },
  { label: "Shop 3", href: "#", current: false },
  { label: "About Us", href: "/about-us", current: false },
];

export default function ShopTwoPage() {
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

  const renderCommissionSection = (
    title: string,
    subtitle: string,
    note: string,
    items: Commission[],
  ) => (
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
        {items.map((item) => (
          <article
            key={item.name}
            className="relative rounded-[2rem] border border-[rgba(162,198,224,0.3)] bg-[#fdfefe] p-5 shadow-[0_14px_30px_rgba(188,214,233,0.16)]"
          >
            <div className="absolute left-1/2 top-3 h-5 w-16 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-[rgba(191,214,227,0.55)]" />
            <div className="mb-4 flex items-center justify-end gap-3 pt-3">
              <span className="rounded-full bg-[#e8f4ff] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#5a84a0]">
                {item.status}
              </span>
            </div>

            {item.imageSrc ? (
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-[#d9eaf7] bg-white">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt ?? item.name}
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
              {item.name}
            </h3>
            <p className="mt-2 text-lg font-semibold text-[#2c5068]">
              {item.price}
            </p>
            <p className="mt-3 text-base leading-7 text-[#5f798e]">
              {item.description}
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
              Crochet Commissions
            </p>
            <h1 className="mt-2 text-center font-[family-name:var(--font-display)] text-[2.2rem] text-[#3f6783] sm:text-[2.8rem]">
              Shop 2
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-8 text-[#5f798e] sm:text-lg">
              A custom crochet page for fandom characters, original characters,
              and soft little commission pieces with lots of personality.
            </p>
          </div>

          <div className="relative mt-10 rounded-[2rem] border border-[rgba(162,198,224,0.28)] bg-[#fdfefe] p-6 shadow-[0_14px_30px_rgba(188,214,233,0.16)] sm:p-8">
            <div className="absolute right-8 top-4 h-5 w-16 rotate-[4deg] rounded-sm bg-[rgba(207,232,255,0.7)]" />
            <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#8caec7]">
              How It Works
            </p>
            <h2 className="mt-2 text-center font-[family-name:var(--font-display)] text-[1.8rem] text-[#3f6783] sm:text-[2.2rem]">
              Custom orders, but still cute and simple
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {requestSteps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-[1.6rem] border border-[#d5e8f6] bg-[#f9fcff] p-5 text-center shadow-[0_10px_24px_rgba(188,214,233,0.12)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8caec7]">
                    Step {index + 1}
                  </p>
                  <p className="mt-3 text-base leading-7 text-[#5f798e]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {renderCommissionSection(
            "Character Commissions",
            "Fandom Board",
            "Use this section for anime, game, show, or movie inspired crochet commissions with recognizable design details.",
            characterCommissions,
          )}

          {renderCommissionSection(
            "Original Character Commissions",
            "OC Board",
            "Use this section for original characters, self-inserts, mascots, and custom designs based on client references.",
            ocCommissions,
          )}
        </section>
      </div>
    </main>
  );
}
