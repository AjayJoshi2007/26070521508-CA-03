"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { SoloChiefLogo } from "@/components/SoloChiefLogo";
import { SOCIAL_LINKS, NAVIGATION, FOOTER_TEXT } from "@/lib/config";

function XIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
    >
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function ThreadsIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
    >
      <title>Threads</title>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.228 1.33-2.932.88-.672 2.072-1.055 3.453-1.109 1.122-.044 2.162.07 3.105.34-.067-1.476-.614-2.578-1.633-3.253-.707-.467-1.614-.705-2.696-.708h-.02c-1.558.013-2.81.538-3.635 1.524l-1.47-1.386C7.46 5.593 9.18 4.88 11.243 4.862h.029c1.48.005 2.76.369 3.81 1.083 1.197.813 2.022 2.018 2.426 3.55.383-.1.786-.173 1.2-.215l.034-.003c1.72-.153 3.235.168 4.382 1.082 1.28 1.02 1.947 2.613 1.876 4.476-.094 2.508-1.077 4.58-2.924 6.16C20.31 22.584 17.717 23.565 14.48 23.9l-.002.001c-.378.038-.76.065-1.148.08-.38.014-.76.02-1.144.02zm1.676-9.01c-.927-.28-1.94-.413-3.008-.373-.928.036-1.696.266-2.222.665-.476.364-.706.82-.684 1.356.039.718.44 1.274 1.16 1.608.558.26 1.256.39 2.02.354 1.065-.058 1.9-.44 2.483-1.136.44-.527.738-1.283.882-2.247a6.986 6.986 0 0 0-.631-.227z" />
    </svg>
  );
}

export function Footer() {
  const socialIcons = [
    { Icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
    { Icon: XIcon, label: "X", href: SOCIAL_LINKS.twitter },

    { Icon: ThreadsIcon, label: "Threads", href: SOCIAL_LINKS.threads },
  ];

  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 py-12 pb-8">
      <div className="mx-auto w-full rounded-[3rem] clay-card p-6 sm:p-10 md:p-12 lg:p-16 border-foreground/10 dark:border-foreground/5 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <SoloChiefLogo size={42} className="group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-heading font-bold tracking-tight text-foreground">SoloChief</span>
            </Link>
            <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
              {FOOTER_TEXT.description}
            </p>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} page`}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-foreground shadow-[6px_6px_12px_rgba(0,0,0,0.05),-6px_-6px_12px_rgba(255,255,255,0.8)] transition-all hover:scale-110 hover:shadow-lg dark:shadow-none dark:bg-zinc-900"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-heading text-foreground">Company</h3>
              <ul className="space-y-3">
                {NAVIGATION.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-heading text-foreground">Legal</h3>
              <ul className="space-y-3">
                {NAVIGATION.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-foreground/10 pt-8 text-center text-sm text-muted-foreground">
          {FOOTER_TEXT.copyright.replace("{{year}}", new Date().getFullYear().toString())}
        </div>
      </div>
    </footer>
  );
}
