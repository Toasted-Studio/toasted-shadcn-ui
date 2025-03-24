"use client";

import React, { useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const BoardingPass = () => {
  const [isGoogleWallet, setIsGoogleWallet] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  // Pointer tilt effect state and refs (from UniversalPass)
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: { x: 50, y: 50 },
    background: { x: 50, y: 50 },
    rotate: { x: 0, y: 0 },
  });

  // Custom CSS properties for interactive movement
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

  // Update CSS properties based on pointer movement
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
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto p-4">
      <div className="flex items-center space-x-2 self-start mb-2">
        <Switch
          id="wallet-toggle"
          checked={isGoogleWallet}
          onCheckedChange={setIsGoogleWallet}
        />
        <Label htmlFor="wallet-toggle">
          {isGoogleWallet ? "Google Wallet" : "Apple Wallet"}
        </Label>
      </div>

      {/* Outer container with perspective */}
      <div
        className="relative w-full perspective-1000 cursor-pointer"
        style={{ perspective: "1000px", height: "570px" }}
        onClick={handleFlip}
      >
        {/* Wrapper for pointer tilt effect */}
        <div
          ref={refElement}
          style={containerStyle}
          className="w-full h-full transition-transform duration-[var(--duration)] ease-[var(--easing)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))]"
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
          {/* Flip container for front/back sides */}
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
              {isGoogleWallet ? <GoogleWalletFront /> : <AppleWalletFront />}
            </div>

            {/* Back of card */}
            <div
              className="absolute w-full h-full"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {isGoogleWallet ? <GoogleWalletBack /> : <AppleWalletBack />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Apple Wallet Front Design with side notches
const AppleWalletFront = () => {
  return (
    <div
      className="relative h-full rounded-xl overflow-hidden border-none"
      style={{ backgroundColor: "#1976D2" }}
    >
      {/* Left semicircle cutout */}
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-4 bg-white border border-white"
        style={{
          borderTopRightRadius: "100%",
          borderBottomRightRadius: "100%",
        }}
      ></div>

      {/* Right semicircle cutout */}
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2.5 h-4 bg-white border border-white"
        style={{
          borderTopLeftRadius: "100%",
          borderBottomLeftRadius: "100%",
        }}
      ></div>

      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 8.5L12 3L22 8.5V15.5L12 21L2 15.5V8.5Z" />
                <path d="M12 3L2 8.5L12 14L22 8.5L12 3Z" />
              </svg>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">DELTA</span>
              <svg
                className="w-6 h-6 ml-2"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <path d="M6 12H18M12 6V18" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white">FLIGHT</p>
            <p className="text-2xl font-bold text-white">DL701</p>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div>
            <p className="text-xs text-white">NYC-KENNEDY</p>
            <p className="text-5xl font-bold text-white">JFK</p>
          </div>
          <div className="flex items-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <div className="text-right">
            <p className="text-xs text-white">LOS ANGELES</p>
            <p className="text-5xl font-bold text-white">LAX</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-white">BOARDING</p>
            <p className="text-xl font-bold text-white">11:20AM</p>
          </div>
          <div>
            <p className="text-xs text-white">GATE</p>
            <p className="text-xl font-bold text-white">B26</p>
          </div>
          <div>
            <p className="text-xs text-white">ZONE</p>
            <p className="text-xl font-bold text-white">3</p>
          </div>
          <div>
            <p className="text-xs text-white">SEAT</p>
            <p className="text-xl font-bold text-white">20B</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs text-white">PASSENGER</p>
          <p className="text-xl font-bold text-white">AILEEN ZEIGEN</p>
        </div>

        <div className="mt-auto flex justify-center">
          <div className="bg-white rounded-lg p-2 w-48 h-48">
            <img
              src="/api/placeholder/180/180"
              alt="QR Code"
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="mt-2 flex justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Apple Wallet Back
const AppleWalletBack = () => {
  return (
    <div
      className="relative h-full rounded-xl overflow-hidden"
      style={{ backgroundColor: "#1976D2" }}
    >
      {/* Left semicircle cutout */}
      <div
        className="absolute left-0 transform -translate-y-1/2 w-3 h-6 bg-white"
        style={{
          borderTopRightRadius: "100%",
          borderBottomRightRadius: "100%",
        }}
      ></div>

      {/* Right semicircle cutout */}
      <div
        className="absolute right-0 transform -translate-y-1/2 w-3 h-6 bg-white"
        style={{
          borderTopLeftRadius: "100%",
          borderBottomLeftRadius: "100%",
        }}
      ></div>

      <div className="p-6 h-full flex flex-col text-white">
        <h3 className="text-lg font-semibold">Flight Details</h3>
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Flight:</span> DL701
          </p>
          <p>
            <span className="font-semibold">Date:</span> March 24, 2025
          </p>
          <p>
            <span className="font-semibold">Departure:</span> JFK 11:20 AM
          </p>
          <p>
            <span className="font-semibold">Arrival:</span> LAX 2:15 PM
            (estimated)
          </p>
          <p>
            <span className="font-semibold">Terminal:</span> 4
          </p>
          <p>
            <span className="font-semibold">Duration:</span> 5h 55m
          </p>
        </div>
        <div className="mt-auto">
          <p className="text-sm">Tap to flip back to boarding pass</p>
        </div>
      </div>
    </div>
  );
};

// Google Wallet Front Design with top notch
const GoogleWalletFront = () => {
  return (
    <div className="relative h-full rounded-xl overflow-hidden bg-white">
      {/* Top semicircle cutout */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gray-100"
        style={{
          borderBottomLeftRadius: "100%",
          borderBottomRightRadius: "100%",
        }}
      ></div>

      <div className="h-full flex flex-col">
        <div className="bg-blue-600 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 mr-2"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 8.5L12 3L22 8.5V15.5L12 21L2 15.5V8.5Z" />
              <path d="M12 3L2 8.5L12 14L22 8.5L12 3Z" />
            </svg>
            <span className="text-white font-semibold">Delta Air Lines</span>
          </div>
          <div>
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
        </div>

        <div className="p-4 flex-grow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-xs">FLIGHT</p>
              <p className="font-bold">DL701</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-xs">DATE</p>
              <p className="font-bold">Mar 24, 2025</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-xs">FROM</p>
              <p className="text-2xl font-bold">JFK</p>
              <p className="text-sm">New York</p>
            </div>
            <div className="flex-1 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-xs">TO</p>
              <p className="text-2xl font-bold">LAX</p>
              <p className="text-sm">Los Angeles</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-xs">BOARDING TIME</p>
                <p className="font-bold">11:20 AM</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs">GATE</p>
                <p className="font-bold">B26</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs">SEAT</p>
                <p className="font-bold">20B</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs">ZONE</p>
                <p className="font-bold">3</p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-xs">PASSENGER</p>
            <p className="font-bold">AILEEN ZEIGEN</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 flex justify-center">
          <div className="w-48 h-48">
            <img
              src="/api/placeholder/180/180"
              alt="QR Code"
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="bg-blue-600 py-2 text-center text-white text-sm">
          <p>Tap to view details</p>
        </div>
      </div>
    </div>
  );
};

// Google Wallet Back
const GoogleWalletBack = () => {
  return (
    <div className="relative h-full rounded-xl overflow-hidden bg-white">
      {/* Top semicircle cutout */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gray-100"
        style={{
          borderBottomLeftRadius: "100%",
          borderBottomRightRadius: "100%",
        }}
      ></div>

      <div className="p-6 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">Flight Details</h3>
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Flight:</span> DL701
          </p>
          <p>
            <span className="font-semibold">Date:</span> March 24, 2025
          </p>
          <p>
            <span className="font-semibold">Departure:</span> JFK 11:20 AM
          </p>
          <p>
            <span className="font-semibold">Arrival:</span> LAX 2:15 PM
            (estimated)
          </p>
          <p>
            <span className="font-semibold">Terminal:</span> 4
          </p>
          <p>
            <span className="font-semibold">Duration:</span> 5h 55m
          </p>
        </div>
        <div className="mt-auto">
          <p className="text-sm text-gray-600">
            Tap to flip back to boarding pass
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoardingPass;
