
import React from 'react';
import { UserStats, Habit } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface DashboardProps {
  stats: UserStats;
  habits: Habit[];
  onAddStep: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, habits, onAddStep }) => {
  const stepData = [
    { name: 'Completed', value: stats.steps },
    { name: 'Remaining', value: Math.max(0, stats.stepGoal - stats.steps) },
  ];

  const COLORS = ['#3b82f6', '#1e293b'];

  const weeklyData = [
    { day: 'Mon', steps: 4200 },
    { day: 'Tue', steps: 6100 },
    { day: 'Wed', steps: 8400 },
    { day: 'Thu', steps: 7200 },
    { day: 'Fri', steps: 9500 },
    { day: 'Sat', steps: 12000 },
    { day: 'Sun', steps: stats.steps },
  ];

  const completedHabits = habits.filter(h => h.completed).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-slate-400 font-medium">Welcome back, Athlete</p>
          <h2 className="text-4xl font-heading font-black tracking-tight mt-1">Level {stats.level} <span className="text-emerald-500">Warrior</span></h2>
        </div>
        <div className="flex gap-2">
           <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Streak</span>
              <span className="text-xl font-heading text-orange-500">{stats.streak} Days</span>
           </div>
           <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">XP</span>
              <span className="text-xl font-heading text-blue-500">{stats.experience}/1000</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step Progress Card */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-between min-h-[400px] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M4 16v-2.382a2 2 0 0 1 1.106-1.789l5.788-2.894a2 2 0 0 1 1.789 0l5.788 2.894A2 2 0 0 1 19.618 14V16"/></svg>
          </div>
          
          <h3 className="font-heading text-xl mb-4 self-start">Step Progress</h3>
          
          <div className="relative w-full aspect-square max-w-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stepData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={450}
                >
                  {stepData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-heading font-black">{stats.steps.toLocaleString()}</span>
              <span className="text-slate-500 text-sm">/ {stats.stepGoal.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={onAddStep}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span> Add 500 Steps
          </button>
        </div>

        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col shadow-xl">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-heading text-xl">Weekly Performance</h3>
              <select className="bg-slate-800 border-none rounded-lg text-sm px-3 py-1 text-slate-300">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
           </div>
           
           <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}} 
                  contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px'}}
                  itemStyle={{color: '#3b82f6'}}
                />
                <Bar 
                  dataKey="steps" 
                  fill="#3b82f6" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <StatItem label="Daily Avg" value="7,412" />
              <StatItem label="Best Day" value="12,000" />
              <StatItem label="Habits" value={`${completedHabits}/${habits.length}`} />
              <StatItem label="Completion" value={`${Math.round((completedHabits/habits.length)*100)}%`} />
           </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{label}</p>
    <p className="text-xl font-heading">{value}</p>
  </div>
);

export default Dashboard;
