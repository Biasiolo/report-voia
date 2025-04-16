import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import platforms from '../data/platforms';
import { clearClientData } from '../store/clientSlice';
import { clearChecklist } from '../store/checklistSlice';
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
          <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 ">
            <div className='flex flex-row  justify-start items-center'>
            <BsFillClipboard2CheckFill className="text-2xl font-semibold bg-gradient-to-br from-teal-200 via-gray-100 to-purple-200 text-teal-500 rounded-lg p-1 mb-2 mr-2"/>
                <h2 className="text-xl font-bold text-gray-900 mb-2"> Dados do Cliente</h2>
            </div>
            <p><strong>Nome:</strong> {client.name}</p>
            <p><strong>Empresa:</strong> {client.company}</p>
            <p><strong>Email:</strong> {client.email}</p>

          </section>

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

                <ul className="list-disc pl-5 space-y-1 text-gray-800 font-medium mb-3">
                  {checklist.filter(item => item.done).map(item => (
                    <li key={item.id}>{item.label}</li>
                  ))}
                </ul>

                {note?.trim() && (
                  <div className="mt-3 p-4 border-l-4 border-teal-500 bg-teal-50 rounded-md text-gray-700 text-sm">
                    <strong>Observações:</strong> {note}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
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
