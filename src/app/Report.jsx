import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import platforms from '../data/platforms';
import { clearClientData } from '../store/clientSlice';
import { clearChecklist, updateChecklistField, setObservation } from '../store/checklistSlice';
import { BsFillClipboard2CheckFill } from "react-icons/bs";

export default function Report() {
  const reportRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);

  const client = useSelector((state) => state.client);
  const { selectedPlatforms, progress, observations } = useSelector((state) => state.checklist);

  useEffect(() => {
    if (!selectedPlatforms.length || !Object.keys(progress).length) {
      navigate('/');
    }
  }, [selectedPlatforms, progress, navigate]);

  useEffect(() => {
    if (location.state?.fromPrint) {
      setShowAlert(true);
      const timeout = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [location.state]);

  const handleDownload = () => {
    navigate('/print-report', { state: { from: 'report' } });
  };

  const handleNewChecklist = () => {
    dispatch(clearClientData());
    dispatch(clearChecklist());
    navigate('/');
  };

  const handleResponsavelChange = (platformId, itemId, value) => {
    dispatch(updateChecklistField({
      platformId,
      itemId,
      field: 'responsavel',
      value
    }));
  };

  const handleBack = () => {
    navigate('/checklist');
  };

  return (
    <div className="min-h-screen bg-black px-4 py-12 relative">
      <div className="max-w-6xl mx-auto bg-zinc-100 rounded-3xl shadow-xl p-10">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-teal-900 to-teal-800 bg-clip-text text-transparent">
            Relatório Final do Checklist
          </h1>
          <p className="text-gray-500 mt-2">Resumo das entregas realizadas por plataforma</p>
        </header>

        <div ref={reportRef} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Dados do Cliente */}
            <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 w-full md:w-1/2">
              <div className='flex flex-row justify-start items-center'>
                <BsFillClipboard2CheckFill className="text-2xl font-semibold bg-gradient-to-br from-teal-200 via-gray-100 to-purple-200 text-teal-500 rounded-lg p-1 mb-2 mr-2" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Dados do Cliente</h2>
              </div>
              <p><strong>Responsável:</strong> {client.name}</p>
              <p><strong>Cliente:</strong> {client.company}</p>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Telefone:</strong> {client.phone}</p>
            </section>

            {/* Resumo do Projeto */}
            <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 w-full md:w-1/2">
              <div className="flex flex-row justify-start items-center">
                <BsFillClipboard2CheckFill className="text-2xl font-semibold bg-gradient-to-br from-green-200 via-teal-100 to-emerald-200 text-teal-600 rounded-lg p-1 mb-2 mr-2" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Resumo do Relatório</h2>
              </div>
              <p className="text-gray-800">
                <strong>Tipo Checklist:</strong>{' '}
                {selectedPlatforms
                  .map((id) => platforms.find((p) => p.id === id)?.name)
                  .filter(Boolean)
                  .join(', ')}
              </p>
              <p className="text-gray-800"><strong>Plataformas analisadas:</strong> {selectedPlatforms.length}</p>

              <p className="text-gray-800">
                <strong>Itens concluídos:</strong>{' '}
                {
                  selectedPlatforms.reduce((total, platformId) => {
                    const checklist = progress[platformId] || [];
                    return total + checklist.filter(item => item.done).length;
                  }, 0)
                }
              </p>
            </section>
          </div>

          {selectedPlatforms.map((platformId) => {
            const platform = platforms.find(p => p.id === platformId);
            const checklist = progress[platformId];
            const note = observations[platformId];
            const Icon = platform?.icon;

            if (!platform || !checklist) return null;

            return (
              <section
                key={platformId}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200"
              >
                <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                  {Icon && (
                    <Icon className="w-6 h-6 text-white bg-gradient-to-br from-teal-600 to-purple-400 rounded-lg p-1" />
                  )}
                  {platform.name}
                </h2>

                <ul className="pl-1 space-y-4 text-gray-800 text-sm">
                  {checklist.filter(item => item.done).map(item => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-2 border-b border-dashed border-gray-200 pb-4"
                    >
                      <div className="font-medium">{item.label}</div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-600 flex-wrap">
                        <div className="flex gap-4 flex-wrap">
                          {item.quantidade && (
                            <span><strong>Qtd:</strong> {item.quantidade}</span>
                          )}
                          {item.frequencia && (
                            <span><strong>Freq.:</strong> {item.frequencia}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 min-w-[200px]">
                          <label className="text-xs text-gray-600 whitespace-nowrap"><strong>Responsável:</strong></label>
                          <input
                            type="text"
                            value={item.responsavel || ''}
                            onChange={(e) => handleResponsavelChange(platformId, item.id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-xs w-full"
                            placeholder="Nome do responsável"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Observações adicionais sobre {platform.name}
                  </label>
                  <textarea
                    value={note || ''}
                    onChange={(e) => dispatch(setObservation({ platformId, text: e.target.value }))}
                    placeholder={`Observações adicionais sobre ${platform.name}`}
                    className="w-full p-3 rounded-md border border-gray-300 shadow-sm text-sm text-gray-800 focus:ring-teal-500 focus:border-teal-500 transition"
                    rows={3}
                  />
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={handleBack}
            className="rounded-xl px-6 py-3 font-semibold cursor-pointer bg-gradient-to-r from-stone-100 to-gray-200 text-gray-800 hover:from-stone-200 hover:to-gray-300 transition"
          >
            ← Voltar
          </button>
          <button
            onClick={handleNewChecklist}
            className="rounded-xl px-6 py-3 font-semibold cursor-pointer bg-gradient-to-r from-stone-200 to-gray-300 text-gray-800 hover:from-stone-300 hover:to-gray-400 transition"
          >
            Novo Checklist
          </button>

          <button
            onClick={handleDownload}
            className="rounded-xl px-6 py-3 font-semibold text-white bg-teal-500 hover:bg-teal-400 hover:text-teal-800 cursor-pointer transition shadow-md"
          >
            Baixar PDF
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-teal-600 text-white px-6 py-4 rounded-2xl shadow-lg text-lg font-medium animate-fade-in-out">
            ✅ PDF gerado com sucesso!
          </div>
        </div>
      )}
    </div>
  );
}
