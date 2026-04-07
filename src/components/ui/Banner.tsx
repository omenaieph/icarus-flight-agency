"use client";

import { type HTMLAttributes, useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

type BannerVariant = "rainbow" | "normal";

export function Banner({
  id,
  xColor,
  variant = "normal",
  height = "3rem",
  rainbowColors = [
    "rgba(188, 44, 114, 0.56)", /* Magenta */
    "rgba(142, 45, 107, 0.77)", /* Purple */
    "rgba(111, 59, 135, 0.73)", /* Plum */
    "rgba(255, 126, 103, 0.66)", /* Sunset */
  ],
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  height?: string;
  xColor?: string;
  variant?: BannerVariant;
  rainbowColors?: string[];
}) {
  const [open, setOpen] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      document.documentElement.style.setProperty('--banner-height', '0px');
      return;
    }
    const updateHeight = () => {
      if (bannerRef.current) {
        document.documentElement.style.setProperty('--banner-height', `${bannerRef.current.offsetHeight}px`);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={bannerRef}
      id={id}
      {...props}
      className={`glass ${props.className || ""}`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 2000, /* Ensure it's above the navbar which has 1000 */
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 40px 12px 20px", /* More padding on right for X button */
        textAlign: "center",
        fontSize: "0.85rem",
        fontWeight: 600, /* Bold text for readability */
        lineHeight: 1.4,
        minHeight: height,
        background: variant === "normal" ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.85)", /* More opaque for readability */
        borderBottom: "1px solid rgba(255,255,255,0.4)",
        color: "#1d0920",
        backdropFilter: "blur(24px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
      }}
    >
      {variant === "rainbow" ? flow({ colors: rainbowColors }) : null}
      
      <div style={{ position: "relative", zIndex: 1, textShadow: "0 1px 1px rgba(255,255,255,0.8)" }}>
        {props.children}
      </div>

      {id ? (
        <button
          type="button"
          aria-label="Close Banner"
          onClick={() => {
            setOpen(false);
          }}
          style={{
            position: "absolute",
            cursor: "pointer",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            color: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
            zIndex: 2,
          }}
        >
          <X color={xColor || "currentColor"} size={18} />
        </button>
      ) : null}
    </div>
  );
}

const maskImage =
  "linear-gradient(to bottom,white,transparent), radial-gradient(circle at top center, white, transparent)";

function flow({ colors }: { colors: string[] }) {
  return (
    <>
      <div
        style={
          {
            position: "absolute",
            top: 0, right: 0, bottom: 0, left: 0,
            zIndex: 0,
            maskImage,
            WebkitMaskImage: maskImage,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            animation: "fd-moving-banner 20s linear infinite",
            backgroundImage: `repeating-linear-gradient(70deg, ${[...colors, colors[0]].map((color, i) => `${color} ${(i * 50) / colors.length}%`).join(", ")})`,
            backgroundSize: "200% 100%",
            filter: "saturate(2)",
          } as object
        }
      />
      <style>
        {`@keyframes fd-moving-banner {
            from { background-position: 0% 0;  }
            to { background-position: 100% 0;  }
         }`}
      </style>
    </>
  );
}
