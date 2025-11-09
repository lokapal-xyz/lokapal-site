'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Skull } from 'lucide-react';
import { locations, categoryNames, type LocationCategory } from '@/lib/location-data';

interface LocationSliderProps {
  category?: LocationCategory;
}

export function LocationSlider({ category }: LocationSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setDirection] = useState<'left' | 'right'>('right');

  // Filter locations by category
  const filteredLocations = locations.filter((loc) => {
    return !category || loc.category === category;
  });

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [category]);

  // Safety check: ensure currentIndex is valid
  const safeCurrentIndex = Math.min(currentIndex, filteredLocations.length - 1);
  const currentLocation = filteredLocations[safeCurrentIndex >= 0 ? safeCurrentIndex : 0];

  if (filteredLocations.length === 0 || !currentLocation) {
    return (
      <div className="border border-slate-700 bg-slate-900/30 rounded-lg p-8 text-center">
        <p className="text-slate-400 font-mono">No locations available</p>
      </div>
    );
  }

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % filteredLocations.length);
  };

  const goToPrevious = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + filteredLocations.length) % filteredLocations.length);
  };

  const getCategoryColor = (cat: LocationCategory) => {
    const colors = {
      'lanka-districts': 'text-red-400 border-red-500/30',
      'svarga-zones': 'text-yellow-400 border-yellow-500/30',
      'plexus-entities': 'text-purple-400 border-purple-500/30',
    };
    return colors[cat] || 'text-slate-400 border-slate-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Location Card */}
      <div className="relative border border-slate-700 bg-slate-900/30 rounded-lg overflow-hidden">
        {/* Location Image and Header */}
        <div className="relative h-80 md:h-[700px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={currentLocation.imagePath}
              alt={currentLocation.name}
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/70 to-slate-900" />
          </div>

          {/* Location Info Overlay */}
          <div className="relative h-full flex flex-col justify-end p-6">
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-mono border ${getCategoryColor(currentLocation.category)}`}>
                {categoryNames[currentLocation.category]}
              </span>
            </div>

            {/* Location Name */}
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-cyan-400 font-mono">
                {currentLocation.name}
              </h2>
              {currentLocation.subtitle && (
                <p className="text-xl text-slate-300 font-mono">
                  {currentLocation.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="p-6 space-y-6">
          {/* Type and Vice (for Lanka Districts) */}
          {currentLocation.type && (
            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-mono text-slate-500 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  District Type
                </h3>
                <p className="text-cyan-400 font-mono">{currentLocation.type}</p>
              </div>
              {currentLocation.vice && (
                <div className="flex-1">
                  <h3 className="text-sm font-mono text-slate-500 mb-2 flex items-center gap-2">
                    <Skull className="w-4 h-4" />
                    Vice
                  </h3>
                  <p className="text-red-400 font-mono">{currentLocation.vice}</p>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-sm font-mono text-slate-500 mb-2">Description</h3>
            <p className="text-slate-300 leading-relaxed">
              {currentLocation.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full">
          <button
            onClick={goToPrevious}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors font-mono border border-slate-700 hover:border-slate-600"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {filteredLocations.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 'right' : 'left');
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-cyan-400'
                    : 'w-2 bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to location ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors font-mono border border-slate-700 hover:border-slate-600"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation - Dots Only */}
        <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-full px-4">
          {filteredLocations.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'right' : 'left');
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all flex-shrink-0 ${
                index === currentIndex
                  ? 'w-8 bg-cyan-400'
                  : 'w-2 bg-slate-600'
              }`}
              aria-label={`Go to location ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Location Counter */}
      <div className="text-center">
        <p className="text-sm font-mono text-slate-500">
          Location {currentIndex + 1} of {filteredLocations.length}
        </p>
      </div>
    </div>
  );
}