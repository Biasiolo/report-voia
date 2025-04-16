import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleChecklistItem,
    setObservation,
    addCustomItem, 
} from '../store/checklistSlice';
import { useNavigate } from 'react-router-dom';
import platforms from '../data/platforms';

export default function Checklist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [customInputs, setCustomInputs] = useState({});
    const { selectedPlatforms, progress, observations } = useSelector((state) => state.checklist);

    const handleToggle = (platformId, itemId) => {
        dispatch(toggleChecklistItem({ platformId, itemId }));
    };

    const handleObservationChange = (platformId, text) => {
        dispatch(setObservation({ platformId, text }));
    };

    const handleCustomInputChange = (platformId, value) => {
        setCustomInputs(prev => ({ ...prev, [platformId]: value }));
    };

    const handleAddCustomItem = (platformId) => {
        const label = customInputs[platformId]?.trim();
        if (!label) return;
        dispatch(addCustomItem({ platformId, label }));
        setCustomInputs(prev => ({ ...prev, [platformId]: '' }));
    };

    const handleNext = () => {
        navigate('/report');
    };
    

    return (
        <div className="min-h-screen bg-black px-4 py-10">
          <div className="max-w-6xl mx-auto bg-zinc-100 rounded-3xl shadow-xl p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-b from-teal-900 to-teal-800 bg-clip-text text-transparent mb-8">
              Checklist das Plataformas
            </h1>
    
            {selectedPlatforms.map((platformId) => {
              const items = progress[platformId];
              const platform = platforms.find((p) => p.id === platformId);
              const Icon = platform?.icon;
              if (!items) return null;
    
              return (
                <div key={platformId} className="mb-12">
                  <h2 className="flex items-center gap-2 text-2xl font-semibold text-teal-800 mb-6">
                    {Icon && (
                      <Icon className="w-7 h-7 text-white bg-gradient-to-br from-teal-500 to-purple-300 rounded-lg p-1" />
                    )}
                    {platform?.name || platformId}
                  </h2>
    
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">

                    {items.map((item) => (
                      <label
                      key={item.id}
                      className={`relative overflow-hidden group rounded-2xl p-3 cursor-pointer flex items-start gap-2 text-sm text-semibold transition-all duration-300 ease-in-out border
                        ${item.done
                          ? 'bg-gradient-to-r from-zinc-100 via-stone-100 to-gray-200 shadow-sm border-0'
                          : 'bg-neutral-50 border-0 hover:border-teal-400 shadow-md shadow-stone-300'}
                      `}
                    >
                      <div
                        className={`absolute left-0 top-0 h-full w-1
                          ${item.done
                            ? 'bg-gradient-to-b from-orange-600 via-teal-500 to-purple-500'
                            : 'bg-transparent'}
                        transition-all duration-300`}
                      ></div>
                    
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => handleToggle(platformId, item.id)}
                        className="accent-teal-500 w-4 h-4 mt-1"
                      />
                    
                      <span className={`text-gray-800 ${item.done ? 'line-through text-gray-500' : ''}`}>
                        {item.label}
                      </span>
                    </label>
                    ))}
                  </div>
    
                  {/* Campo para adicionar novo item */}
                  <div className="mb-6">
                    <div className="flex gap-2 items-center ml-auto max-w-md w-full">
                      <input
                        type="text"
                        value={customInputs[platformId] || ''}
                        onChange={(e) =>
                          handleCustomInputChange(platformId, e.target.value)
                        }
                        placeholder="Adicionar item personalizado..."
                        className="w-full rounded-xl border bg-neutral-50 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddCustomItem(platformId)}
                        className="px-4 py-2 rounded-xl cursor-pointer bg-teal-600 text-white text-sm hover:bg-teal-700 transition whitespace-nowrap"
                      >
                        + Item
                      </button>
                    </div>
                  </div>
    
                  {/* Observações */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Observações
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Observações adicionais sobre essa plataforma..."
                      value={observations[platformId] || ''}
                      onChange={(e) =>
                        handleObservationChange(platformId, e.target.value)
                      }
                      className="w-full rounded-xl border bg-neutral-50 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              );
            })}
    
            <div className="text-right mt-10">
              <button
                onClick={handleNext}
                className="rounded-xl px-8 py-3 font-semibold text-white bg-teal-500 hover:bg-teal-400 hover:text-teal-800 cursor-pointer transition-all shadow-lg"
              >
                Gerar Relatório
              </button>
            </div>
          </div>
        </div>
      );
}
