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

const people = [
  {
    name: "Ashley DUCK Lin",
    imageSrc: "/Duck selfie.jpg",
    imageAlt: "Ashley profile photo",
    summary:
      "Ashley brings the duck energy: bright, silly, and always the first one to turn a random idea into something weirdly adorable.",
  },
  {
    name: "Nicole OTTER Mendo",
    imageSrc: "/otter.jpg",
    imageAlt: "Nicole profile photo",
    summary:
      "Nicole is the cozy one of the group, adding soft details, playful chaos, and the kind of charm that makes every section feel more alive.",
  },
  {
    name: "Cindy BIRB Vuong",
    imageSrc: "/birb1.jpg",
    imageAlt: "Cindy profile photo",
    summary:
      "Cindy keeps everything light and lovable, mixing tiny dramatic flair with the sweet little finishing touches that pull the whole page together.",
  },
];

const menuItems = [
  { label: "Welcome", href: "/", current: false },
  { label: "Shop 1", href: "/shop-1", current: false },
  { label: "Shop 2", href: "/shop-2", current: false },
  { label: "Shop 3", href: "#", current: false },
  { label: "About Us", href: "/about-us", current: true },
];

const faqItems = [
  {
    question: "Do you take custom crochet orders?",
    answer:
      "Yes, we do. If you have a color palette, animal, or gift idea in mind, we can work with you to make something cute and personal.",
  },
  {
    question: "How long does it take to make an order?",
    answer:
      "It depends on the size and detail, but most small crochet pieces take around one to two weeks before they are ready to ship.",
  },
  {
    question: "Can I request specific colors?",
    answer:
      "Absolutely. We love matching favorite colors, themes, and gift vibes so each piece feels a little more special.",
  },
  {
    question: "How should I care for crochet items?",
    answer:
      "We love making couple-themed crafts because they feel personal, goofy, and sweet all at once. A handmade piece can hold little inside jokes, favorite colors, and shared memories, which makes it feel more special than just buying something random off a shelf.",
  },
];

export default function AboutUsPage() {
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
              Journal Page
            </p>
            <h1 className="mt-2 text-center font-[family-name:var(--font-display)] text-[2.2rem] text-[#3f6783] sm:text-[2.8rem]">
              About Us
            </h1>
          </div>

          <RevealOnView>
            <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {people.map((person) => (
              <article
                key={person.name}
                className="relative rounded-[2rem] border border-[rgba(162,198,224,0.3)] bg-[#fdfefe] p-6 text-center shadow-[0_14px_30px_rgba(188,214,233,0.16)]"
              >
                <div className="absolute left-1/2 top-3 h-5 w-16 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-[rgba(191,214,227,0.55)]" />
                <div className="mb-4 text-left text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8caec7]">
                  Profile Note
                </div>
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-[#d8ecff] shadow-[0_12px_24px_rgba(176,208,230,0.2)]">
                  <Image
                    src={person.imageSrc}
                    alt={person.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="mt-5 font-[family-name:var(--font-display)] text-[1.6rem] leading-tight text-[#3f6783]">
                  {person.name}
                </h2>

                <p className="mt-3 text-base leading-8 text-[#5f798e]">
                  {person.summary}
                </p>
              </article>
            ))}
            </div>
          </RevealOnView>

          <RevealOnView>
            <div className="relative mt-12 rounded-[2rem] border border-[rgba(162,198,224,0.28)] bg-[#fdfefe] p-6 shadow-[0_14px_30px_rgba(188,214,233,0.16)] sm:mt-14 sm:p-8">
            <div className="absolute right-8 top-4 h-5 w-16 rotate-[4deg] rounded-sm bg-[rgba(207,232,255,0.7)]" />
            <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#8caec7]">
              Quick Answers
            </p>
            <h2 className="mt-2 text-center font-[family-name:var(--font-display)] text-[1.8rem] text-[#3f6783] sm:text-[2.2rem]">
              Q&amp;A
            </h2>

            <div className="mt-6 space-y-4">
              {faqItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[1.5rem] border border-[#d5e8f6] bg-[#f9fcff] px-5 py-4"
                >
                  <h3 className="text-lg font-semibold text-[#2c5068]">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-[#5f798e]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
            </div>
          </RevealOnView>
        </section>
      </div>
    </main>
  );
}
