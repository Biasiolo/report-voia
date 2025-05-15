import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleChecklistItem,
    setObservation,
    addCustomItem, 
    updateChecklistField,
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
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold text-teal-800">
                      {Icon && (
                        <Icon className="w-7 h-7 text-white bg-gradient-to-br from-teal-500 to-purple-300 rounded-lg p-1" />
                      )}
                      {platform?.name || platformId}
                    </h2>
                    
                    {/* Campo para adicionar novo item */}
                    <div className="flex gap-2 items-center max-w-sm">
                      <input
                        type="text"
                        value={customInputs[platformId] || ''}
                        onChange={(e) =>
                          handleCustomInputChange(platformId, e.target.value)
                        }
                        placeholder="Adicionar item personalizado..."
                        className="w-full rounded-xl border bg-white border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddCustomItem(platformId)}
                        className="px-4 py-2 rounded-xl cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm hover:from-teal-600 hover:to-teal-700 transition whitespace-nowrap shadow-sm"
                      >
                        + Item
                      </button>
                    </div>
                  </div>
    
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`relative group rounded-2xl p-5 flex flex-col gap-3 text-sm transition-all duration-300 
                          ${item.done
                            ? 'bg-gradient-to-br from-white to-zinc-50 shadow-sm border border-l-4 border-l-teal-500 border-t-zinc-100 border-r-zinc-100 border-b-zinc-100'
                            : 'bg-white shadow-md hover:shadow-lg border border-zinc-50 hover:border-teal-100'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => handleToggle(platformId, item.id)}
                              className="peer appearance-none h-5 w-5 rounded-md border border-gray-300 
                                checked:bg-teal-500 checked:border-0 transition-all duration-200 cursor-pointer"
                            />
                            <svg
                              className="absolute top-0.5 left-0.5 h-4 w-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span className={`text-gray-800 font-medium ${item.done ? 'line-through text-gray-500' : ''}`}>
                            {item.label}
                          </span>
                        </div>
                
                        <div className="grid grid-cols-2 gap-3 mt-1">
                          <div className="flex flex-col">
                            <label className="text-xs text-gray-500 mb-1">Quantidade</label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantidade}
                              onChange={(e) =>
                                dispatch(updateChecklistField({
                                  platformId,
                                  itemId: item.id,
                                  field: 'quantidade',
                                  value: parseInt(e.target.value)
                                }))
                              }
                              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                          </div>
                
                          <div className="flex flex-col">
                            <label className="text-xs text-gray-500 mb-1">Frequência</label>
                            <select
                              value={item.frequencia}
                              onChange={(e) =>
                                dispatch(updateChecklistField({
                                  platformId,
                                  itemId: item.id,
                                  field: 'frequencia',
                                  value: e.target.value
                                }))
                              }
                              className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                            >
                              <option value="única">Única</option>
                              <option value="mensal">Mensal</option>
                              <option value="trimestral">Trimestral</option>
                              <option value="semestral">Semestral</option>
                              <option value="anual">Anual</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
    
                  {/* Observações */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-50">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Observações adicionais sobre essa plataforma..."
                      value={observations[platformId] || ''}
                      onChange={(e) =>
                        handleObservationChange(platformId, e.target.value)
                      }
                      className="w-full rounded-xl border bg-zinc-50 border-gray-200 px-4 py-3 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              );
            })}
    
            <div className="flex justify-end mt-10">
              <button
                onClick={handleNext}
                className="rounded-xl px-8 py-3 font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600
                  hover:from-teal-400 hover:to-teal-500 cursor-pointer transition-all shadow-lg flex items-center gap-2"
              >
                Gerar Relatório
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      );
}