import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleChecklistItem,
  setObservation,
  addCustomItem, // Certifique-se de ter esse reducer no checklistSlice.js
} from '../store/checklistSlice';
import { useNavigate } from 'react-router-dom';

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
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checklist das Plataformas</h1>

        {selectedPlatforms.map((platformId) => {
          const items = progress[platformId];
          if (!items) return null;

          return (
            <div key={platformId} className="mb-12">
              <h2 className="text-2xl font-semibold text-teal-700 mb-4 capitalize">
                {platformId.replace('-', ' ')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {items.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                      item.done
                        ? 'bg-teal-50 border-teal-400'
                        : 'bg-white border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => handleToggle(platformId, item.id)}
                      className="accent-orange-500 w-5 h-5"
                    />
                    <span
                      className={`text-gray-800 ${
                        item.done ? 'line-through text-gray-500' : ''
                      }`}
                    >
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
      onChange={(e) => handleCustomInputChange(platformId, e.target.value)}
      placeholder="Adicionar item personalizado..."
      className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
    <button
      type="button"
      onClick={() => handleAddCustomItem(platformId)}
      className="px-4 py-2 rounded-xl bg-teal-600 text-white text-sm hover:bg-teal-700 transition whitespace-nowrap"
    >
      + Item
    </button>
  </div>
</div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                <textarea
                  rows={3}
                  placeholder="Observações adicionais sobre essa plataforma..."
                  value={observations[platformId] || ''}
                  onChange={(e) => handleObservationChange(platformId, e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          );
        })}

        <div className="text-right mt-10">
          <button
            onClick={handleNext}
            className="rounded-xl px-6 py-3 font-semibold text-white bg-teal-500 hover:bg-orange-500 cursor-pointer transition-all shadow-md"
          >
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>
  );
}
