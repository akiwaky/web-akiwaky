"use client";

import { useEffect } from "react";

export default function ClientScripts() {
  useEffect(() => {
    const KEY = "akiwaky.lang";
    const btns = document.querySelectorAll<HTMLButtonElement>(".lang-btn");

    // Cache original EN innerHTML for every translated element
    const i18nEls = document.querySelectorAll<HTMLElement>("[data-es]");
    i18nEls.forEach((el) => {
      el.dataset.en = el.innerHTML;
    });

    function applyLang(lang: string) {
      i18nEls.forEach((el) => {
        el.innerHTML = lang === "es" ? (el.dataset.es ?? el.dataset.en ?? "") : (el.dataset.en ?? "");
      });
      btns.forEach((b) => {
        const on = b.dataset.lang === lang;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      document.documentElement.setAttribute("lang", lang);
      try { localStorage.setItem(KEY, lang); } catch {}
    }

    // Restore saved language on load
    let stored: string | null = null;
    try { stored = localStorage.getItem(KEY); } catch {}
    if (stored && stored !== "en") applyLang(stored);

    const onClick = (e: Event) => {
      const b = e.currentTarget as HTMLButtonElement;
      const lang = b.dataset.lang;
      if (lang) applyLang(lang);
    };
    btns.forEach((b) => b.addEventListener("click", onClick));

    // Smooth-scroll anchors
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const onAnchor = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const id = a.getAttribute("href");
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el instanceof HTMLElement) {
          e.preventDefault();
          window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
        }
      }
    };
    anchors.forEach((a) => a.addEventListener("click", onAnchor));

    // Entrance animations — Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      btns.forEach((b) => b.removeEventListener("click", onClick));
      anchors.forEach((a) => a.removeEventListener("click", onAnchor));
      observer.disconnect();
    };
  }, []);

  return null;
}
