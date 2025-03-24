"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";

interface BoardingPassProps {
  flight: string;
  departure: {
    city: string;
    code: string;
    time: string;
  };
  arrival: {
    city: string;
    code: string;
  };
  passenger: string;
  gate: string;
  zone: string;
  seat: string;
}

// Delta logo SVG
const DeltaLogo = () => (
  <svg
    width="80"
    height="30"
    viewBox="0 0 80 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <path d="M18 5L5 25h25L18 5z" fill="currentColor" />
    <path
      d="M35 10h5v15h-5zM42 10h5l8 9v-9h5v15h-5l-8-9v9h-5zM62 10h14v3h-9v3h8v3h-8v3h9v3h-14z"
      fill="currentColor"
    />
    <circle
      cx="70"
      cy="15"
      r="10"
      fill="transparent"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const QRCode = () => {
  const [cells, setCells] = useState<string[]>([]);

  useEffect(() => {
    const newCells = Array.from({ length: 144 }).map((_, i) =>
      Math.random() > 0.5 ? "bg-black" : "bg-white"
    );
    setCells(newCells);
  }, []);

  return (
    <div className="bg-white p-4 rounded-md w-full max-w-[220px] h-[220px] mx-auto">
      <div className="w-full h-full grid grid-cols-12 grid-rows-12 gap-[2px]">
        {cells.map((className, i) => (
          <div key={i} className={className} />
        ))}
      </div>
    </div>
  );
};

// The UniversalPass component combines the boarding pass style and info with interactive card movement.
export const UniversalPass: React.FC<BoardingPassProps> = ({
  flight,
  departure,
  arrival,
  passenger,
  gate,
  zone,
  seat,
}) => {
  // Refs for interactive movement
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: { x: 50, y: 50 },
    background: { x: 50, y: 50 },
    rotate: { x: 0, y: 0 },
  });

  // Container CSS custom properties
  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0",
    "--radius": "48px",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  } as React.CSSProperties;

  // Background style for the interactive overlay
  const backgroundStyle = {
    "--step": "5%",
    "--foil-svg": `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E")`,
    "--pattern": "var(--foil-svg) center/100% no-repeat",
    "--rainbow":
      "repeating-linear-gradient(0deg, rgb(255,119,115) calc(var(--step) * 1), rgba(255,237,95,1) calc(var(--step) * 2), rgba(168,255,95,1) calc(var(--step) * 3), rgba(131,255,247,1) calc(var(--step) * 4), rgba(120,148,255,1) calc(var(--step) * 5), rgb(216,117,255) calc(var(--step) * 6), rgb(255,119,115) calc(var(--step) * 7)) 0% var(--bg-y)/200% 700% no-repeat",
    "--diagonal":
      "repeating-linear-gradient(128deg, #0e152e 0%, hsl(180,10%,60%) 3.8%, hsl(180,10%,60%) 4.5%, hsl(180,10%,60%) 5.2%, #0e152e 10%, #0e152e 12%) var(--bg-x) var(--bg-y)/300% no-repeat",
    "--shade":
      "radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(255,255,255,0.1) 12%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.25) 120%) var(--bg-x) var(--bg-y)/300% no-repeat",
    backgroundBlendMode: "hue, hue, hue, overlay",
  } as React.CSSProperties;

  // Update CSS variables based on pointer movement
  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current;
      refElement.current.style.setProperty("--m-x", `${glare.x}%`);
      refElement.current.style.setProperty("--m-y", `${glare.y}%`);
      refElement.current.style.setProperty("--r-x", `${rotate.x}deg`);
      refElement.current.style.setProperty("--r-y", `${rotate.y}deg`);
      refElement.current.style.setProperty("--bg-x", `${background.x}%`);
      refElement.current.style.setProperty("--bg-y", `${background.y}%`);
    }
  };

  return (
    <div
      style={containerStyle}
      className="relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] w-full max-w-md mx-auto [aspect-ratio:13/21]"
      ref={refElement}
      onPointerMove={(event) => {
        const rotateFactor = 0.4;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        };
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        };

        state.current.background.x = 50 + percentage.x / 4 - 12.5;
        state.current.background.y = 50 + percentage.y / 3 - 16.67;
        state.current.rotate.x = -(delta.x / 3.5) * rotateFactor;
        state.current.rotate.y = (delta.y / 2) * rotateFactor;
        state.current.glare.x = percentage.x;
        state.current.glare.y = percentage.y;

        updateStyles();
      }}
      onPointerEnter={() => {
        isPointerInside.current = true;
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current!.style.setProperty("--duration", "0s");
            }
          }, 300);
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
          refElement.current.style.setProperty("--r-x", "0deg");
          refElement.current.style.setProperty("--r-y", "0deg");
        }
      }}
    >
      <div className="h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] overflow-hidden">
        {/* Boarding pass content */}
        <div className="relative w-full h-full bg-blue-600 dark:bg-blue-900 text-white  shadow-xl overflow-hidden">
          {/* Cutout circles */}
          <div className="absolute left-0 top-1/2 w-6 h-6 bg-white rounded-full -ml-3 transform -translate-y-1/2" />
          <div className="absolute right-0 top-1/2 w-6 h-6 bg-white rounded-full -mr-3 transform -translate-y-1/2" />

          {/* Header */}
          <div className="p-6 pb-2 flex justify-between items-center">
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <DeltaLogo />
            </div>
            <div
              className="text-right animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-sm font-light opacity-90">FLIGHT</div>
              <div className="text-3xl font-bold">{flight}</div>
            </div>
          </div>

          {/* Airport Codes */}
          <div className="px-6 pt-4 flex justify-between items-center">
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-sm font-light opacity-90">
                {departure.city}
              </div>
              <div className="text-6xl font-bold leading-none">
                {departure.code}
              </div>
            </div>

            <div className="animate-pulse-gentle mx-6">
              <Plane size={36} className="rotate-90" />
            </div>

            <div
              className="text-right animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-sm font-light opacity-90">
                {arrival.city}
              </div>
              <div className="text-6xl font-bold leading-none">
                {arrival.code}
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="px-6 py-6 grid grid-cols-4 gap-4">
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-sm font-light opacity-90">BOARDING</div>
              <div className="text-2xl font-bold">{departure.time}</div>
            </div>
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-sm font-light opacity-90">GATE</div>
              <div className="text-2xl font-bold">{gate}</div>
            </div>
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="text-sm font-light opacity-90">ZONE</div>
              <div className="text-2xl font-bold">{zone}</div>
            </div>
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="text-sm font-light opacity-90">SEAT</div>
              <div className="text-2xl font-bold">{seat}</div>
            </div>
          </div>

          {/* Passenger */}
          <div
            className="px-6 pb-4 animate-slide-up"
            style={{ animationDelay: "0.9s" }}
          >
            <div className="text-sm font-light opacity-90">PASSENGER</div>
            <div className="text-3xl font-bold">{passenger}</div>
          </div>

          {/* QR Code */}
          <div
            className="px-6 pt-2 pb-8 animate-slide-up"
            style={{ animationDelay: "1s" }}
          >
            <QRCode />
          </div>
        </div>
        {/* Interactive overlay layers */}
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity duration-[var(--duration)] ease-[var(--easing)]" />
        <div
          className="w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))]"
          style={backgroundStyle}
        />
      </div>
    </div>
  );
};
