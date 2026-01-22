
import React, { useState } from 'react';
import { generateVisionImage } from '../services/geminiService';
import { Icons } from '../constants';

const VisionMirror: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    const result = await generateVisionImage(prompt);
    setImage(result);
    setIsLoading(false);
  };

  const presets = [
    "Winning a marathon in the neon city",
    "Peaceful meditation on a mountain peak",
    "Mastering high-end creative coding",
    "Elite physique in a futuristic gym"
  ];

  return (
    <div className="max-w-4xl mx-auto animate-in zoom-in duration-500">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-heading font-black mb-3">Vision <span className="text-blue-500">Mirror</span></h2>
        <p className="text-slate-400">Visualize your future. Gemini will render your success.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-heading text-lg flex items-center gap-2">
              <Icons.Sparkles /> Define Your Reality
            </h3>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your ultimate self..."
              className="w-full h-32 bg-slate-800 border border-slate-700 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-100 resize-none"
            />
            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Rendering Vision...
                </>
              ) : (
                'Manifest Success'
              )}
            </button>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Inspiration Matrix</h3>
            <div className="grid grid-cols-1 gap-2">
              {presets.map(p => (
                <button 
                  key={p}
                  onClick={() => setPrompt(p)}
                  className="text-left text-sm p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="aspect-[16/9] md:aspect-square bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center relative group">
          {image ? (
            <>
              <img src={image} alt="Vision" className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                <p className="font-heading font-bold text-xl drop-shadow-lg">"{prompt}"</p>
              </div>
            </>
          ) : (
            <div className="text-center p-10 space-y-4">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto opacity-50">
                <Icons.Sparkles />
              </div>
              <p className="text-slate-500">The mirror is currently dark. Manifest a vision to see your potential.</p>
            </div>
          )}
          {isLoading && (
             <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                   <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                   <p className="font-heading animate-pulse text-blue-400">Analyzing Potential...</p>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionMirror;
