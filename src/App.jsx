import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Waves, Bike } from 'lucide-react';
import SEO from './components/SEO';

const App = () => {
  const [activeTab, setActiveTab] = useState('swim');
  const [swimPace, setSwimPace] = useState('');
  const [bikeSpeed, setBikeSpeed] = useState('');
  const [runPace, setRunPace] = useState('');

  const handlePaceInput = (value, setter) => {
    const cleaned = value.replace(/[^0-9:]/g, '');
    setter(cleaned);
  };

  const paceToSeconds = (pace) => {
    const parts = pace.split(':');
    if (parts.length !== 2) return 0;
    const mins = parseInt(parts[0]) || 0;
    const secs = parseInt(parts[1]) || 0;
    return mins * 60 + secs;
  };

  const secondsToTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    let result = '';
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m `;
    if (seconds > 0) result += `${seconds}s`;
    
    return result.trim() || '0s';
  };

  const adjustPace = (currentPace, increment) => {
    const seconds = paceToSeconds(currentPace);
    if (seconds === 0) return increment > 0 ? '0:01' : '0:00';
    
    const newSeconds = Math.max(1, seconds + increment);
    const mins = Math.floor(newSeconds / 60);
    const secs = newSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const adjustBikeSpeed = (currentSpeed, increment) => {
    const speed = parseFloat(currentSpeed) || 0;
    const newSpeed = Math.max(0.1, speed + increment);
    return newSpeed.toFixed(1);
  };

  const calculateSwimTimes = () => {
    const paceSeconds = paceToSeconds(swimPace);
    if (paceSeconds === 0) return null;
    
    return {
      '300m': secondsToTime((paceSeconds / 100) * 300),
      '750m': secondsToTime((paceSeconds / 100) * 750),
      '1500m': secondsToTime((paceSeconds / 100) * 1500),
      '1900m': secondsToTime((paceSeconds / 100) * 1900),
      '3800m': secondsToTime((paceSeconds / 100) * 3800)
    };
  };

  const calculateBikeTimes = () => {
    const speed = parseFloat(bikeSpeed);
    if (!speed || speed === 0) return null;
    
    return {
      '20km': secondsToTime((20 / speed) * 3600),
      '80km': secondsToTime((80 / speed) * 3600),
      '100km': secondsToTime((100 / speed) * 3600),
      '140km': secondsToTime((140 / speed) * 3600),
      '180km': secondsToTime((180 / speed) * 3600)
    };
  };

  const calculateRunTimes = () => {
    const paceSeconds = paceToSeconds(runPace);
    if (paceSeconds === 0) return null;
    
    const speedKmH = (3600 / paceSeconds).toFixed(2);
    
    return {
      speed: `${speedKmH} km/h`,
      '5km': secondsToTime(paceSeconds * 5),
      '10km': secondsToTime(paceSeconds * 10),
      '21km': secondsToTime(paceSeconds * 21),
      '42km': secondsToTime(paceSeconds * 42)
    };
  };

  const swimTimes = calculateSwimTimes();
  const bikeTimes = calculateBikeTimes();
  const runTimes = calculateRunTimes();

  return (
    <HelmetProvider>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
            Triathlon Time Calculator
          </h1>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('swim')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'swim'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Waves size={20} />
              Swimming
            </button>
            <button
              onClick={() => setActiveTab('bike')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'bike'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bike size={20} />
              Bike
            </button>
            <button
              onClick={() => setActiveTab('run')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'run'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
              </svg>
              Run
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            {activeTab === 'swim' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Swimming</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Average pace per 100m (min:sec)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 2:15"
                      value={swimPace}
                      onChange={(e) => handlePaceInput(e.target.value, setSwimPace)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setSwimPace(adjustPace(swimPace, 1));
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setSwimPace(adjustPace(swimPace, -1));
                        }
                      }}
                      className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setSwimPace(adjustPace(swimPace, 1))}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => setSwimPace(adjustPace(swimPace, -1))}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>

                {swimTimes && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-700 mb-3">Estimated times:</h3>
                    {Object.entries(swimTimes).map(([distance, time]) => (
                      <div key={distance} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-slate-700">{distance}</span>
                        <span className="text-xl font-bold text-blue-600">{time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bike' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-orange-600">Bike</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Average speed (km/h)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="e.g. 30"
                      value={bikeSpeed}
                      onChange={(e) => setBikeSpeed(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setBikeSpeed(adjustBikeSpeed(bikeSpeed, 0.5));
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setBikeSpeed(adjustBikeSpeed(bikeSpeed, -0.5));
                        }
                      }}
                      className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setBikeSpeed(adjustBikeSpeed(bikeSpeed, 0.5))}
                        className="px-4 py-1.5 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => setBikeSpeed(adjustBikeSpeed(bikeSpeed, -0.5))}
                        className="px-4 py-1.5 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>

                {bikeTimes && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-700 mb-3">Estimated times:</h3>
                    {Object.entries(bikeTimes).map(([distance, time]) => (
                      <div key={distance} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium text-slate-700">{distance}</span>
                        <span className="text-xl font-bold text-orange-600">{time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'run' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Run</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pace per km (min:sec)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 5:30"
                      value={runPace}
                      onChange={(e) => handlePaceInput(e.target.value, setRunPace)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setRunPace(adjustPace(runPace, 1));
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setRunPace(adjustPace(runPace, -1));
                        }
                      }}
                      className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:outline-none text-lg"
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setRunPace(adjustPace(runPace, 1))}
                        className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => setRunPace(adjustPace(runPace, -1))}
                        className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>

                {runTimes && (
                  <div className="space-y-3">
                    <div className="p-4 bg-green-100 rounded-lg mb-4">
                      <span className="text-sm font-medium text-slate-700">Speed: </span>
                      <span className="text-xl font-bold text-green-600">{runTimes.speed}</span>
                    </div>
                    
                    <h3 className="font-semibold text-slate-700 mb-3">Estimated times:</h3>
                    {Object.entries(runTimes).filter(([key]) => key !== 'speed').map(([distance, time]) => (
                      <div key={distance} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-slate-700">{distance}</span>
                        <span className="text-xl font-bold text-green-600">{time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default App;
