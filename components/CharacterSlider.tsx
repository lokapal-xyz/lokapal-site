'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, AlertTriangle, Shield } from 'lucide-react';
import { characters, categoryNames, type CharacterCategory } from '@/lib/character-data';

interface CharacterSliderProps {
  category?: CharacterCategory;
  showSpoilers?: boolean;
}

export function CharacterSlider({ category, showSpoilers = false }: CharacterSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setDirection] = useState<'left' | 'right'>('right');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Filter characters by category and spoiler settings
  const filteredCharacters = characters.filter((char) => {
    const categoryMatch = !category || char.category === category;
    const spoilerMatch = showSpoilers || !char.spoiler;
    return categoryMatch && spoilerMatch;
  });

  // Reset index when category or spoilers change
  useEffect(() => {
    setCurrentIndex(0);
  }, [category, showSpoilers]);

  // Safety check: ensure currentIndex is valid
  const safeCurrentIndex = Math.min(currentIndex, filteredCharacters.length - 1);
  const currentCharacter = filteredCharacters[safeCurrentIndex >= 0 ? safeCurrentIndex : 0];

  // Enhanced null check
  if (filteredCharacters.length === 0 || !currentCharacter) {
    return (
      <div className="border border-slate-700 bg-slate-900/30 rounded-lg p-8 text-center">
        <p className="text-slate-400 font-mono">No characters available</p>
      </div>
    );
  }

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % filteredCharacters.length);
  };

  const goToPrevious = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + filteredCharacters.length) % filteredCharacters.length);
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const getCategoryColor = (cat: CharacterCategory) => {
    const colors = {
      'old-guardians': 'text-cyan-400 border-cyan-500/30',
      'new-guardians': 'text-purple-400 border-purple-500/30',
      'continuum': 'text-yellow-400 border-yellow-500/30',
      'oracles': 'text-green-400 border-green-500/30',
      'defiants': 'text-red-400 border-red-500/30',
    };
    return colors[cat] || 'text-slate-400 border-slate-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Character Card */}
      <div 
        className="relative border border-slate-700 bg-slate-900/30 rounded-lg overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
      <div className="relative border border-slate-700 bg-slate-900/30 rounded-lg overflow-hidden">
        {/* Character Image and Header */}
        <div className="relative h-80 md:h-[700px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={currentCharacter.imagePath}
              alt={currentCharacter.name}
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/70 to-slate-900" />
          </div>

          {/* Character Info Overlay */}
          <div className="relative h-full flex flex-col justify-end p-6">
            {/* Category Badge 
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-mono border ${getCategoryColor(currentCharacter.category)}`}>
                {categoryNames[currentCharacter.category]}
              </span>
            </div>*/}

            {/* Character Name */}
            <div className="space-y-2">
              <span className={`px-3 py-1 rounded-full text-xs sm:text-md font-mono border ${getCategoryColor(currentCharacter.category)}`}>
                {categoryNames[currentCharacter.category]}
              </span>
              <h2 className="text-xl sm:text-4xl font-bold text-cyan-400 font-mono">
                {currentCharacter.name}
              </h2>
              <p className="text-md sm:text-xl text-slate-300 font-mono">
                {currentCharacter.title}
              </p>
            </div>
          </div>

          {/* Spoiler Warning */}
          {currentCharacter.spoiler && (
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-xs font-mono text-red-400">
                Book 1<br />Spoiler
              </span>
            </div>
          )}
        </div>

        {/* Character Details */}
        <div className="p-6 space-y-6">
          {/* Domain */}
          <div>
            <h3 className="text-sm font-mono text-slate-500 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Domain
            </h3>
            <p className="text-slate-300 leading-relaxed">{currentCharacter.domain}</p>
          </div>

          {/* Archetype */}
          <div>
            <h3 className="text-sm font-mono text-slate-500 mb-2">Archetype</h3>
            <p className="text-slate-300 leading-relaxed italic">
              {currentCharacter.archetype}
            </p>
          </div>

          {/* Backstory */}
          {currentCharacter.backstory && (
            <div>
              <h3 className="text-sm font-mono text-slate-500 mb-2">Human Backstory</h3>
              <p className="text-slate-300 leading-relaxed">
                {currentCharacter.backstory}
              </p>
            </div>
          )}

          {/* Signature Issues */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-mono text-slate-500 mb-2">Signature Issues</h3>
            <p className="text-cyan-400 font-mono text-sm">
              {currentCharacter.signatureIssues}
            </p>
          </div>
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
            {filteredCharacters.map((_, index) => (
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
                aria-label={`Go to character ${index + 1}`}
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
          {filteredCharacters.map((_, index) => (
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
              aria-label={`Go to character ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Character Counter */}
      <div className="text-center">
        <p className="text-sm font-mono text-slate-500">
          Character {currentIndex + 1} of {filteredCharacters.length}
        </p>
      </div>

    </div>
  );
}