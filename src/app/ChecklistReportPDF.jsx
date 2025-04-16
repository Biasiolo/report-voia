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
        color: '#0f172a',
        backgroundColor: '#ffffff',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '36px',
          background: 'linear-gradient(to right, #0d9488, #9333ea)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}>
          Relatório de Checklist de Marketing
        </h1>

        <section style={{
          marginBottom: '36px',
          backgroundColor: '#f1f5f9',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: '5px solid #0d9488',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#1c2a2b',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            🧾 Dados do Cliente
          </h2>
          <p><strong>Nome:</strong> {client.name}</p>
          <p><strong>Empresa:</strong> {client.company}</p>
          <p><strong>Email:</strong> {client.email}</p>

        </section>

        {selectedPlatforms.map((platformId) => {
          const platform = platforms.find(p => p.id === platformId);
          const checklist = progress[platformId];
          const note = observations?.[platformId];

          if (!platform || !checklist) return null;

          return (
            <section key={platformId} style={{
              marginBottom: '30px',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px 24px',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}>
              <h3 style={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#0f172a',
                marginBottom: '14px',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '6px',
                textTransform: 'uppercase',
              }}>
                {platform.name}
              </h3>

              <ul style={{
                paddingLeft: '20px',
                marginBottom: '12px',
                listStyle: 'none',
              }}>
                {checklist.filter(item => item.done).map(item => (
                  <li key={item.id} style={{
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{
                      color: '#10b981',
                      fontWeight: 'bold',
                      fontSize: '13px',
                    }}>✓</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>

              {note && note.trim() !== '' && (
                <div style={{
                  padding: '12px 14px',
                  backgroundColor: '#ecfdf5',
                  borderLeft: '4px solid #14b8a6',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#064e3b',
                }}>
                  <strong>Observações:</strong> {note}
                </div>
              )}
            </section>
          );
        })}

        <footer style={{
          marginTop: '60px',
          fontSize: '11px',
          color: '#64748b',
          textAlign: 'right',
          borderTop: '1px solid #e2e8f0',
          paddingTop: '14px',
        }}>
          Gerado em: {new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
        </footer>
      </div>
    </div>
  );
};

export default ChecklistReportPDF;
