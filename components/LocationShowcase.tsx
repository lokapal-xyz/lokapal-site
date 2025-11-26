'use client';

import { useState } from 'react';
import { LocationSlider } from './LocationSlider';
import { categoryNames, type LocationCategory } from '@/lib/location-data';

export function LocationShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | undefined>(undefined);

  const categories: LocationCategory[] = [
    'lanka-districts',
    'svarga-zones',
    'plexus-entities',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-xl md:text-2xl font-bold text-cyan-400 font-mono">
          Locations
        </h1>
        <p className="text-lg text-slate-400">
          Explore the realms of the lore — from the mortal districts of Lanka Prime to
          the celestial zones of Svarga and the mysterious interdimensional Plexus.
        </p>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-mono text-slate-400">Filter by Realm:</h3>

        {/* Mobile: Horizontal Scroll */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
              selectedCategory === undefined
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            All Locations
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {categoryNames[cat]}
            </button>
          ))}
        </div>

        {/* Desktop: Grid Layout with Line Breaks */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === undefined
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            All<br />Locations
          </button>
          <button
            onClick={() => setSelectedCategory('lanka-districts')}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === 'lanka-districts'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            Lanka Prime<br />Districts
          </button>
          <button
            onClick={() => setSelectedCategory('svarga-zones')}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === 'svarga-zones'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            Svarga<br />Zones
          </button>
          <button
            onClick={() => setSelectedCategory('plexus-entities')}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === 'plexus-entities'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            The<br />Plexus
          </button>
        </div>
      </div>

      {/* Location Slider */}
      <LocationSlider category={selectedCategory} />

      {/* Realm Context */}
      <div className="pt-8 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-slate-700 bg-slate-900/30 rounded-lg">
            <h3 className="text-lg font-bold text-red-400 font-mono mb-3">
              Lanka Prime
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              The mortal metropolis with ten urban districts, each representing a
              different vice. This is where divine policy impacts are felt most directly
              by millions of inhabitants.
            </p>
          </div>

          <div className="p-6 border border-slate-700 bg-slate-900/30 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-400 font-mono mb-3">
              Svarga
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              The celestial realm built from solidified light and advanced technology.
              A breathtaking city of impossible geometries where guardians, oracles, and
              the Continuum maintain cosmic order.
            </p>
          </div>

          <div className="p-6 border border-slate-700 bg-slate-900/30 rounded-lg">
            <h3 className="text-lg font-bold text-purple-400 font-mono mb-3">
              The Plexus
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              The interdimensional neural network connecting mortal and divine realms.
              An endless web of luminous pathways where souls, prayers, and information
              flow between realities at light speed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}