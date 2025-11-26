'use client';

import { useState } from 'react';
import { CharacterSlider } from './CharacterSlider';
import { categoryNames, type CharacterCategory } from '@/lib/character-data';
import { AlertTriangle } from 'lucide-react';

export function CharacterShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory | undefined>(undefined);
  const [showSpoilers, setShowSpoilers] = useState(false);

  const categories: CharacterCategory[] = [
    'old-guardians',
    'new-guardians',
    'continuum',
    'oracles',
    'defiants',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-xl md:text-2xl font-bold text-cyan-400 font-mono">
          Character Profiles
        </h1>
        <p className="text-lg text-slate-400">
          Meet the cosmic forces that shape the lore — from ancient guardians
          to eternal advisors and defiant challengers.
        </p>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono text-slate-400">Filter by Category:</h3>
          
          {/* Spoiler Toggle */}
          <button
            onClick={() => setShowSpoilers(!showSpoilers)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-colors border ${
              showSpoilers
                ? 'bg-red-500/20 text-red-400 border-red-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            {showSpoilers ? 'Hide Spoilers' : 'Show Spoilers'}
          </button>
        </div>

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
            All Characters
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
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === undefined
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            All<br />Characters
          </button>
          <button
            onClick={() => setSelectedCategory('old-guardians')}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === 'old-guardians'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            The Old<br />Guardians
          </button>
          <button
            onClick={() => setSelectedCategory('new-guardians')}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === 'new-guardians'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            The New<br />Guardians
          </button>
          <button
            onClick={() => setSelectedCategory('continuum')}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === 'continuum'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            The<br />Continuum
          </button>
          <button
            onClick={() => setSelectedCategory('oracles')}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === 'oracles'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            <br />Oracles
          </button>
          <button
            onClick={() => setSelectedCategory('defiants')}
            className={`px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
              selectedCategory === 'defiants'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            The<br />Defiants
          </button>
        </div>
      </div>

      {/* Spoiler Warning Banner */}
      {!showSpoilers && (
        <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-mono text-yellow-400 mb-1">Spoiler Protection Active</p>
              <p className="text-xs text-slate-400">
                Some characters contain Book 1 spoilers and are currently hidden. Toggle
                &quot;Show Spoilers&quot; above to reveal all characters.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Character Slider */}
      <CharacterSlider category={selectedCategory} showSpoilers={showSpoilers} />

      {/* Lore Context */}
      <div className="pt-8 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-700 bg-slate-900/30 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-400 font-mono mb-3">
              About the Guardians
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              The eight guardians maintain cosmic balance across all directions. The four
              Old Guardians (cardinal directions) established the original power structure,
              while the four New Guardians (intermediate directions) bring fresh perspectives
              to divine governance.
            </p>
          </div>

          <div className="p-6 border border-slate-700 bg-slate-900/30 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-400 font-mono mb-3">
              Governance Structure
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Above the guardians sits the Continuum - the supreme trinity of Creation,
              Preservation, and Destruction. Three Oracles provide temporal wisdom, while
              the Defiants challenge the established order from outside.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}