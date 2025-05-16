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

    const [searchTerm, setSearchTerm] = useState('');

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

                <div className="mb-8">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Buscar item do checklist..."
    className="w-full md:w-1/2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
  />
</div>

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
                                {items
  .filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
  .map((item) => (
                                    <label
                                        key={item.id}
                                        className={`relative overflow-hidden group rounded-2xl p-3 cursor-pointer flex flex-col justify-between text-sm transition-all duration-300 ease-in-out border h-36
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

                                        <div className="flex items-start gap-2 mb-2">
                                            <input
                                                type="checkbox"
                                                checked={item.done}
                                                onChange={() => handleToggle(platformId, item.id)}
                                                className="accent-teal-500 w-4 h-4 mt-1"
                                            />
                                            <span className={`text-gray-800 ${item.done ? 'line-through text-gray-500' : ''}`}>
                                                {item.label}
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-2 mt-auto">
                                            <div className="flex flex-col w-1/2">
                                                <label className="text-xs text-gray-500">Qtd.</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantidade || ''}
                                                    onChange={(e) => dispatch(updateChecklistField({
                                                        platformId,
                                                        itemId: item.id,
                                                        field: 'quantidade',
                                                        value: e.target.value
                                                    }))}
                                                    className="w-full px-2 py-1 border bg-white border-gray-200 rounded-md text-sm"
                                                />
                                            </div>
                                            <div className="flex flex-col w-1/2">
                                                <label className="text-xs text-gray-500">Freq.</label>
                                                <select
                                                    value={item.frequencia || ''}
                                                    onChange={(e) => dispatch(updateChecklistField({
                                                        platformId,
                                                        itemId: item.id,
                                                        field: 'frequencia',
                                                        value: e.target.value
                                                    }))}
                                                    className="w-full px-2 py-1 border bg-white border-gray-200 rounded-md text-sm"
                                                >
                                                    <option value="">-</option>
                                                    <option value="única">Única</option>
                                                    <option value="mensal">Mensal</option>
                                                    <option value="trimestral">Trimestral</option>
                                                    <option value="semestral">Semestral</option>
                                                    <option value="anual">Anual</option>
                                                </select>
                                            </div>
                                        </div>
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
                                    placeholder={`Observações adicionais sobre ${platform?.name || 'essa plataforma'}`}
                                    value={observations[platformId] || ''}
                                    onChange={(e) => handleObservationChange(platformId, e.target.value)}
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
