import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import platforms from '../data/platforms';
import { clearClientData } from '../store/clientSlice';
import { clearChecklist } from '../store/checklistSlice';

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

  return (
    <div className="min-h-screen bg-black px-4 py-10 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Relatório Final</h1>

        <div
          ref={reportRef}
          className="relative z-10 bg-white rounded-2xl border border-gray-200 p-6 shadow-md"
        >
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-teal-700 mb-2">Dados do Cliente</h2>
            <p><strong>Nome:</strong> {client.name}</p>
            <p><strong>Empresa:</strong> {client.company}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Telefone:</strong> {client.phone}</p>
          </section>

          {selectedPlatforms.map((platformId) => {
            const platform = platforms.find(p => p.id === platformId);
            const checklist = progress[platformId];
            const note = observations[platformId];

            if (!platform || !checklist) return null;

            return (
              <section key={platformId} className="mb-8">
                <h2 className="text-xl font-semibold text-orange-600 mb-2">{platform.name}</h2>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  {checklist.filter(item => item.done).map(item => (
                    <li key={item.id} className="text-gray-800">{item.label}</li>
                  ))}
                </ul>

                {note && note.trim() !== '' && (
                  <div className="mt-2 p-4 border-l-4 border-teal-500 bg-teal-50 rounded-md text-gray-700 text-sm">
                    <strong>Observações:</strong> {note}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={handleNewChecklist}
            className="rounded-xl px-6 py-3 font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Novo Checklist
          </button>

          <button
            onClick={handleDownload}
            className="rounded-xl px-6 py-3 font-semibold text-white bg-orange-500 hover:bg-teal-600 transition shadow-md"
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
