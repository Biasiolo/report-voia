import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setClientData } from '../store/clientSlice';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);


  // Verifica se o formulário é válido sempre que os campos mudam
  useEffect(() => {
    const { name, company, email, phone } = form;
    const isValid = name.trim() !== '' && 
                   company.trim() !== '' && 
                   email.trim() !== '' && 
                   isValidEmail(email) && 
                   phone.replace(/\D/g, '').length >= 10;
    setIsFormValid(isValid);
  }, [form]);

  // Função para validar email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função melhorada para aplicar máscara de telefone
  const formatPhoneNumber = useCallback((value) => {
    if (!value) return '';
    
    const phoneNumber = value.replace(/\D/g, '');
    
    if (phoneNumber.length <= 2) return phoneNumber;
    if (phoneNumber.length <= 7) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setForm(prev => ({ ...prev, [name]: formattedPhone }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid) {

      
      // Delay the navigation to show the success animation
      setTimeout(() => {
        dispatch(setClientData(form));
        navigate('/select-platforms');
      }, 800);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-xl bg-zinc-100 rounded-3xl shadow-xl p-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-b from-teal-900 to-teal-800 bg-clip-text text-transparent">
            Checklist Generator
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Preencha os dados para iniciar seu checklist personalizado
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Responsável</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border bg-white border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              className="w-full rounded-xl border bg-white border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-white rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full bg-white rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"

            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-xl px-6 py-3 font-semibold text-white bg-teal-500 hover:bg-teal-400 hover:text-teal-800 cursor-pointer transition-all shadow-md"
            >
              Avançar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}