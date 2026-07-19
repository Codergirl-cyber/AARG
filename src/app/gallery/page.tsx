"use client";

import React, { useState } from "react";
import Image from "next/image";
import { galleryItems } from "@/content/gallery";
import Lightbox from "@/components/Lightbox";
import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";

// Masonry pattern: index-based cell types
// 0 = wide (col-span-2), 4 = tall (row-span-2), others = default
function getCellClass(index: number): string {
  // Every 6th item (0, 6, 12...) becomes wide
  if (index % 6 === 0 && index > 0) return "cell-wide";
  // Every 4th item (4, 10, 16...) becomes tall
  if (index % 4 === 0 && index > 0) return "cell-tall";
  return "";
}

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full flex flex-col min-h-screen py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      <PageBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12">
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            {"FIELD_IMAGE_ARCHIVES // IMAGING"}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            GALLERY
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            {"MEDIA CAPTURES // FLIGHTS, BUILDS & ARENAS"}
          </p>
        </div>

        {/* Gallery — masonry grid with varied aspect ratios */}
        <div className="gallery-masonry">
          {galleryItems.map((item, index) => {
            const cellClass = getCellClass(index);
            return (
              <ScrollReveal key={item.id} delay={Math.min(0.04 * index, 0.3)}>
                <button
                  onClick={() => openLightbox(index)}
                  aria-label={`Open zoom view for AARG photo ${item.title}`}
                  className={`group relative w-full h-full border border-secondary-accent/15 bg-surface/50 overflow-hidden focus-hud cursor-pointer flex flex-col justify-end text-left rounded-none ${cellClass}`}
                >
                  {/* Viewfinder indicators */}
                  <div className="hud-corner hud-corner-tl group-hover:!border-primary-accent transition-all" />
                  <div className="hud-corner hud-corner-tr group-hover:!border-primary-accent transition-all" />
                  <div className="hud-corner hud-corner-bl" />
                  <div className="hud-corner hud-corner-br" />

                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className={`${item.id === "competition-3" ? "object-contain bg-black" : "object-cover"} p-1 transition-transform duration-500 group-hover:scale-105`}
                  />

                  {/* Hover overlay text panel */}
                  <div className="absolute inset-x-1 bottom-1 bg-bg-base/90 backdrop-blur-sm p-3 border-t border-secondary-accent/15 flex justify-between items-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 z-10">
                    <div className="font-mono">
                      <h3 className="font-display font-bold uppercase text-[10px] text-secondary-accent tracking-widest">
                        {item.title}
                      </h3>
                      <span className="text-[8px] text-primary-accent/80 block mt-0.5 uppercase">
                        {"TAG //"} {item.category}
                      </span>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Accessible image modal */}
      <Lightbox
        items={galleryItems}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
