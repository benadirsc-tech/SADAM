
import React, { useState } from 'react';
import { Habit } from '../types';

interface HabitTrackerProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onAdd: (name: string, category: Habit['category']) => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, onToggle, onAdd }) => {
  const [newName, setNewName] = useState('');
  const [category, setCategory] = useState<Habit['category']>('fitness');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName, category);
      setNewName('');
    }
  };

  const categories: Habit['category'][] = ['fitness', 'mindset', 'learning', 'productivity'];

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom duration-500">
      <header className="mb-8">
        <h2 className="text-3xl font-heading font-black">Daily <span className="text-emerald-400">Quests</span></h2>
        <p className="text-slate-400">Complete tasks to earn XP and level up your character.</p>
      </header>

      <form onSubmit={handleSubmit} className="mb-10 flex flex-col md:flex-row gap-3">
        <input 
          type="text" 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New mission objective..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value as Habit['category'])}
          className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
        <button 
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
        >
          Deploy
        </button>
      </form>

      <div className="space-y-4">
        {habits.map((habit) => (
          <div 
            key={habit.id}
            onClick={() => onToggle(habit.id)}
            className={`group cursor-pointer flex items-center p-5 rounded-2xl border transition-all duration-300 ${habit.completed ? 'bg-emerald-900/10 border-emerald-500/30 opacity-70' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
          >
            <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${habit.completed ? 'bg-emerald-500 border-emerald-500 text-slate-900' : 'border-slate-700 group-hover:border-slate-500'}`}>
              {habit.completed && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              )}
            </div>
            <div className="ml-5 flex-1">
              <h4 className={`font-semibold text-lg transition-all ${habit.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{habit.name}</h4>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{habit.category}</span>
            </div>
            <div className="text-slate-700 font-heading font-bold text-sm">
              +150 XP
            </div>
          </div>
        ))}

        {habits.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500 font-medium">No missions active. Create a mission to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitTracker;
