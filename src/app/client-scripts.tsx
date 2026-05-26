"use client";

import { useEffect } from "react";

export default function ClientScripts() {
  useEffect(() => {
    const KEY = "akiwaky.lang";
    const btns = document.querySelectorAll<HTMLButtonElement>(".lang-btn");

    let stored: string | null = null;
    try { stored = localStorage.getItem(KEY); } catch {}

    if (stored) {
      btns.forEach((b) => {
        const on = b.dataset.lang === stored;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      document.documentElement.setAttribute("lang", stored);
    }

    const onClick = (e: Event) => {
      const b = e.currentTarget as HTMLButtonElement;
      btns.forEach((o) => {
        o.classList.remove("is-active");
        o.setAttribute("aria-pressed", "false");
      });
      b.classList.add("is-active");
      b.setAttribute("aria-pressed", "true");
      const lang = b.dataset.lang;
      if (lang) {
        try { localStorage.setItem(KEY, lang); } catch {}
        document.documentElement.setAttribute("lang", lang);
      }
    };
    btns.forEach((b) => b.addEventListener("click", onClick));

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

    return () => {
      btns.forEach((b) => b.removeEventListener("click", onClick));
      anchors.forEach((a) => a.removeEventListener("click", onAnchor));
    };
  }, []);

  return null;
}
