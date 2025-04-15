import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';
import platforms from '../data/platforms';

const ChecklistReportPDF = () => {
  const printRef = useRef();
  const navigate = useNavigate();

  const client = useSelector((state) => state.client);
  const { selectedPlatforms, progress, observations } = useSelector((state) => state.checklist);

  useEffect(() => {
    if (!selectedPlatforms.length || !Object.keys(progress).length) {
      navigate('/');
      return;
    }

    setTimeout(() => {
      const element = printRef.current;

      const opt = {
        margin: 1,
        filename: `Checklist_${client.name || 'cliente'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' },
      };

      html2pdf().set(opt).from(element).save().then(() => {
        navigate('/report', { state: { fromPrint: true } });
      });
    }, 100);
  }, [client, selectedPlatforms, progress, navigate]);

  return (
    <div
      ref={printRef}
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        lineHeight: '1.6',
        color: '#000',
        backgroundColor: '#fff',
        padding: '40px',
        minHeight: '29.7cm',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
        Relatório de Checklist de Marketing
      </h1>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0d9488' }}>Dados do Cliente</h2>
        <p><strong>Nome:</strong> {client.name}</p>
        <p><strong>Empresa:</strong> {client.company}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Telefone:</strong> {client.phone}</p>
      </section>

      {selectedPlatforms.map((platformId) => {
        const platform = platforms.find(p => p.id === platformId);
        const checklist = progress[platformId];
        const note = observations?.[platformId];

        if (!platform || !checklist) return null;

        return (
          <section key={platformId} style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ea580c', marginBottom: '6px' }}>
              {platform.name}
            </h3>

            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              {checklist.filter(item => item.done).map(item => (
                <li key={item.id} style={{ marginBottom: '4px' }}>{item.label}</li>
              ))}
            </ul>

            {note && note.trim() !== '' && (
              <div
                style={{
                  marginTop: '8px',
                  padding: '10px 12px',
                  backgroundColor: '#f0fdfa',
                  borderLeft: '4px solid #0d9488',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#0f172a',
                }}
              >
                <strong>Observações:</strong> {note}
              </div>
            )}
          </section>
        );
      })}

      <p style={{ marginTop: '40px', fontSize: '11px', color: '#666' }}>
        Gerado em: {new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
      </p>
    </div>
  );
};

export default ChecklistReportPDF;
