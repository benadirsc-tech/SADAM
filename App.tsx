
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import HabitTracker from './components/HabitTracker';
import AICoach from './components/AICoach';
import VisionMirror from './components/VisionMirror';
import { UserStats, Habit } from './types';

const INITIAL_STATS: UserStats = {
  steps: 6842,
  stepGoal: 10000,
  level: 14,
  experience: 450,
  streak: 8,
};

const INITIAL_HABITS: Habit[] = [
  { id: '1', name: 'Morning Visualization', completed: true, category: 'mindset' },
  { id: '2', name: 'High Protein Intake', completed: false, category: 'fitness' },
  { id: '3', name: 'Read 20 Pages', completed: false, category: 'learning' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);

  // Persistence
  useEffect(() => {
    const savedStats = localStorage.getItem('stepup_stats');
    const savedHabits = localStorage.getItem('stepup_habits');
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedHabits) setHabits(JSON.parse(savedHabits));
  }, []);

  useEffect(() => {
    localStorage.setItem('stepup_stats', JSON.stringify(stats));
    localStorage.setItem('stepup_habits', JSON.stringify(habits));
  }, [stats, habits]);

  const handleAddStep = () => {
    setStats(prev => {
      const newSteps = prev.steps + 500;
      let newExp = prev.experience + 50;
      let newLevel = prev.level;
      
      if (newExp >= 1000) {
        newExp -= 1000;
        newLevel += 1;
      }

      return {
        ...prev,
        steps: newSteps,
        experience: newExp,
        level: newLevel
      };
    });
  };

  const handleToggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const nextState = !h.completed;
        if (nextState) {
          // Completed - Add XP
          setStats(s => {
            let newExp = s.experience + 150;
            let newLevel = s.level;
            if (newExp >= 1000) {
              newExp -= 1000;
              newLevel += 1;
            }
            return { ...s, experience: newExp, level: newLevel };
          });
        }
        return { ...h, completed: nextState };
      }
      return h;
    }));
  };

  const handleAddHabit = (name: string, category: Habit['category']) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      completed: false,
      category
    };
    setHabits(prev => [...prev, newHabit]);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <Dashboard stats={stats} habits={habits} onAddStep={handleAddStep} />
      )}
      {activeTab === 'habits' && (
        <HabitTracker habits={habits} onToggle={handleToggleHabit} onAdd={handleAddHabit} />
      )}
      {activeTab === 'coach' && (
        <AICoach stats={stats} habits={habits} />
      )}
      {activeTab === 'vision' && (
        <VisionMirror />
      )}
    </Layout>
  );
};

export default App;
