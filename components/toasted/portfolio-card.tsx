"use client";

import React, { useState } from "react";

const PortfolioCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto p-4">
      <div
        className="relative w-full perspective-1000 cursor-pointer"
        style={{ perspective: "1000px", height: "570px" }}
        onClick={handleFlip}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front of card */}
          <div
            className="absolute w-full h-full"
            style={{ backfaceVisibility: "hidden" }}
          >
            <PortfolioFront />
          </div>

          {/* Back of card */}
          <div
            className="absolute w-full h-full"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <PortfolioBack />
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Tap the card to {isFlipped ? "view summary" : "view details"}
      </p>
    </div>
  );
};

const PortfolioFront = () => {
  return (
    <div className="h-full rounded-xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col">
      {/* Header Section */}
      <div className="bg-blue-600 p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold">Zoltan Fodor</h1>
        <p className="mt-1 text-lg font-medium">
          Designer • Developer • Entrepreneur
        </p>
      </div>
      {/* Brief Bio & Social Links */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <p className="text-center text-sm">
          Hi, I'm Zoltan – passionate about crafting digital experiences,
          building SaaS products, and leading my design/development agency{" "}
          <a
            href="https://toasted.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            toasted.studio
          </a>
          . I share my journey on Medium, and soon on YouTube.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <SocialLink
            href="https://github.com/ritmillio"
            ariaLabel="GitHub"
            icon={<GitHubIcon />}
          />
          <SocialLink
            href="https://www.linkedin.com/in/zoltan-fodor-007/"
            ariaLabel="LinkedIn"
            icon={<LinkedInIcon />}
          />
          <SocialLink
            href="https://medium.com/@zoltanfodor_"
            ariaLabel="Medium"
            icon={<MediumIcon />}
          />
          <SocialLink href="#" ariaLabel="X Social" icon={<TwitterIcon />} />
          <SocialLink href="#" ariaLabel="Bluesky" icon={<BlueskyIcon />} />
        </div>
      </div>
      <div className="p-2 text-center text-xs bg-blue-600">
        Tap for more details
      </div>
    </div>
  );
};

const PortfolioBack = () => {
  return (
    <div className="h-full rounded-xl overflow-hidden bg-white shadow-lg text-gray-800 flex flex-col">
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold mb-2">About Me</h2>
        <p className="text-sm mb-4">
          I'm Zoltan Fodor, a designer and developer who thrives on turning
          ideas into innovative digital solutions. I’m currently exploring new
          SaaS ideas, running a boutique design & development agency (
          <a
            href="https://toasted.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            toasted.studio
          </a>
          ), and sharing my insights on Medium. Stay tuned for my upcoming
          YouTube videos!
        </p>
        <div>
          <h3 className="text-lg font-semibold mb-1">Connect with Me</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="https://github.com/ritmillio"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/zoltan-fodor-007/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@zoltanfodor_"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Medium
              </a>
            </li>
            <li>
              <a href="#" className="underline">
                X Social
              </a>
            </li>
            <li>
              <a href="#" className="underline">
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4 text-center text-xs bg-gray-100">
        Tap to flip back to summary
      </div>
    </div>
  );
};

const SocialLink = ({
  href,
  ariaLabel,
  icon,
}: {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="transition transform hover:scale-110"
    >
      {icon}
    </a>
  );
};

const GitHubIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0C5.37258 0 0 5.37258 0 12C0 17.302 3.438 21.8 8.205 23.385C8.805 23.5 9.025 23.175 9.025 22.9C9.025 22.65 9.015 21.85 9.01 20.75C5.672 21.45 4.967 19.32 4.967 19.32C4.422 17.97 3.633 17.6 3.633 17.6C2.546 16.87 3.718 16.89 3.718 16.89C4.922 16.97 5.555 18.12 5.555 18.12C6.63 20.02 8.465 19.5 9.15 19.23C9.265 18.45 9.57 17.95 9.91 17.65C7.225 17.35 4.445 16.3 4.445 11.64C4.445 10.3 4.89 9.2 5.63 8.35C5.515 8.05 5.115 6.82 5.75 5.15C5.75 5.15 6.73 4.82 9.005 6.42C9.945 6.17 10.935 6.04 11.925 6.04C12.915 6.04 13.905 6.17 14.845 6.42C17.12 4.82 18.1 5.15 18.1 5.15C18.735 6.82 18.335 8.05 18.22 8.35C18.965 9.2 19.41 10.3 19.41 11.64C19.41 16.31 16.625 17.345 13.935 17.635C14.355 17.975 14.735 18.65 14.735 19.76C14.735 21.38 14.72 22.64 14.72 22.9C14.72 23.18 14.935 23.51 15.54 23.385C20.31 21.8 23.745 17.302 23.745 12C23.745 5.37258 18.3724 0 11.745 0H12Z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.851-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.372-1.85 3.604 0 4.27 2.371 4.27 5.455v6.286zM5.337 7.433c-1.144 0-2.072-.928-2.072-2.072 0-1.143.928-2.072 2.072-2.072 1.143 0 2.072.929 2.072 2.072 0 1.144-.93 2.072-2.072 2.072zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.554C0 23.229.792 24 1.771 24h20.451C23.208 24 24 23.229 24 22.277V1.723C24 .771 23.208 0 22.225 0z" />
  </svg>
);

const MediumIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M2.003 3.89c-.007.055-.01.11-.01.166 0 1.822 1.33 3.3 3.003 3.3 1.657 0 2.997-1.478 3-3.3 0-.056-.003-.11-.01-.166H2.003zm0 3.944v10.222h3.006V7.834H2.003zm4.332 0v10.222h3.006v-5.446c0-.966.59-1.45 1.212-1.45.622 0 1.214.484 1.214 1.45v5.446h3.006V9.318c0-2.62-1.477-3.825-3.434-3.825-1.573 0-2.28.856-2.692 1.45l-.052.106-.052-.106c-.412-.594-1.119-1.45-2.692-1.45-1.957 0-3.434 1.205-3.434 3.825z" />
  </svg>
);

const TwitterIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.95.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.723 0-4.93 2.207-4.93 4.93 0 .39.045.765.127 1.124C7.728 8.087 4.1 6.13 1.671 3.149c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.229-.616v.062c0 2.385 1.693 4.374 3.946 4.828-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.318-3.809 2.104-6.102 2.104-.396 0-.79-.023-1.17-.067 2.179 1.397 4.768 2.211 7.557 2.211 9.054 0 14.001-7.496 14.001-13.986 0-.21 0-.423-.015-.635.961-.695 1.8-1.562 2.46-2.549z" />
  </svg>
);

const BlueskyIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" />
    <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white">
      BS
    </text>
  </svg>
);

export default PortfolioCard;
