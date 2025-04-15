import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectPlatforms } from '../store/checklistSlice';
import platforms from '../data/platforms';
import { useNavigate } from 'react-router-dom';

export default function SelectPlatforms() {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePlatform = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) return;
    dispatch(selectPlatforms(selected));
    navigate('/checklist');
  };

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-teal-900 to-teal-800 bg-clip-text text-transparent">
            Selecione as Plataformas Contratadas
          </h1>
          <p className="text-gray-500 mt-2">
            Escolha as plataformas para incluir no seu relatório personalizado
          </p>
        </header>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selected.includes(platform.id);
  
            return (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`
                  relative overflow-hidden group rounded-2xl p-6 text-left cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${isSelected 
                    ? 'bg-gradient-to-r from-zinc-100 to-zinc-200 shadow-md shadow-stone-300' 
                    : 'bg-stone-100 shadow-md hover:shadow-md shadow-stone-500'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-teal-500 text-white rounded-full p-1 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <div className={`
                  absolute left-0 top-0 h-full w-1 
                  ${isSelected ? 'bg-gradient-to-b from-teal-600 to-purple-500' : 'bg-transparent'}
                  transition-all duration-300
                `}></div>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className={`
                    p-3 rounded-xl 
                    ${isSelected 
                      ? 'bg-gradient-to-br from-teal-500 to-purple-300 text-white' 
                      : 'bg-gray-100 text-teal-600 group-hover:bg-teal-50'
                    } 
                    transition-colors duration-300
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className={`
                    text-lg font-semibold 
                    ${isSelected ? 'text-teal-800' : 'text-gray-800'}
                    transition-colors duration-300
                  `}>
                    {platform.name}
                  </h2>
                </div>
                
                <div className="flex items-center mt-4">
                  <span className={`
                    inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                    ${isSelected 
                      ? 'bg-teal-200 text-teal-800' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-teal-50 group-hover:text-teal-700'
                    }
                    transition-colors duration-300
                  `}>
                    {platform.checklist.length} itens no checklist
                  </span>
                </div>
              </button>
            );
          })}
        </div>
  
        <div className="mt-12 flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            {selected.length > 0 
              ? `${selected.length} plataforma${selected.length > 1 ? 's' : ''} selecionada${selected.length > 1 ? 's' : ''}` 
              : 'Nenhuma plataforma selecionada'}
          </p>
          
          <button
            onClick={handleContinue}
            disabled={selected.length === 0}
            className={`
              relative overflow-hidden rounded-xl px-8 py-3 font-semibold text-white 
              shadow-lg transition-all duration-300 ease-in-out
              ${selected.length === 0
                ? 'bg-gray-300 cursor-not-allowed opacity-70'
                : 'bg-teal-500 hover:bg-orange-500 cursor-pointer'
              }
            `}
          >
            {selected.length === 0 ? (
              'Selecione pelo menos uma plataforma'
            ) : (
              <>
                <span className="relative z-10">Continuar</span>
                <span className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
