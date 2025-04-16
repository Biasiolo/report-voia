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

  const formattedDate = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const totalCompleted = selectedPlatforms.reduce((total, platformId) => {
    const checklist = progress[platformId] || [];
    return total + checklist.filter(item => item.done).length;
  }, 0);

  return (
    <div
      ref={printRef}
      style={{
        fontFamily: '"Segoe UI", Roboto, sans-serif',
        fontSize: '12px',
        color: '#1e293b',
        backgroundColor: '#ffffff',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Cabeçalho */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '4px'
        }}>
          Relatório Final do Checklist
        </h1>
        <p style={{ fontSize: '13px', color: '#475569' }}>
          Gerado em: {formattedDate}
        </p>
      </div>

      {/* Cliente + Resumo */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '36px', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1,
          minWidth: '300px',
          backgroundColor: '#f9fafb',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '10px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '6px',
            color: '#0f766e',
          }}>
            📋 Dados do Cliente
          </h2>
          <p><strong>Nome:</strong> {client.name}</p>
          <p><strong>Empresa:</strong> {client.company}</p>
          <p><strong>Email:</strong> {client.email}</p>
        </div>

        <div style={{
          flex: 1,
          minWidth: '300px',
          backgroundColor: '#f9fafb',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '10px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '6px',
            color: '#0f766e',
          }}>
            📌 Resumo do Relatório
          </h2>
          <p><strong>Plataformas analisadas:</strong> {selectedPlatforms.length}</p>
          <p><strong>Itens concluídos:</strong> {totalCompleted}</p>
        </div>
      </div>

      {/* Resultados por Plataforma */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#0f172a',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '6px',
        }}>
          Resultados por Plataforma
        </h2>
      </div>

      {selectedPlatforms.map((platformId) => {
        const platform = platforms.find(p => p.id === platformId);
        const checklist = progress[platformId];
        const note = observations?.[platformId];
        if (!platform || !checklist) return null;
        const completedItems = checklist.filter(item => item.done);

        return (
          <div key={platformId} style={{
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            marginBottom: '24px',
            padding: '20px',
            backgroundColor: '#ffffff'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
            }}>
              {platform.name}
            </h3>

            {completedItems.length > 0 && (
              <ul style={{ paddingLeft: '18px', marginBottom: '12px' }}>
                {completedItems.map(item => (
                  <li key={item.id} style={{
                    marginBottom: '6px',
                    fontSize: '13px',
                    color: '#334155'
                  }}>
                    {item.label}
                    <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px', minWidth: '16px', lineHeight: '1.4', marginLeft: '12px' }}>✓</span>
                  </li>
                ))}
              </ul>
            )}

            {note && note.trim() !== '' && (
              <div style={{
                backgroundColor: '#f0fdfa',
                padding: '12px',
                borderLeft: '4px solid #0d9488',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#064e3b'
              }}>
                <strong>Observações:</strong> {note}
              </div>
            )}
          </div>
        );
      })}

      <footer style={{
        fontSize: '10px',
        color: '#808894',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '20px',
        marginTop: '40px'
      }}>
        <div>
            © {new Date().getFullYear()} - Relatório Checklist de Marketing - Voia Agency
          </div>
          <div style={{ fontSize: '10px', color: '#808894' }}>
            Este relatório é confidencial e foi gerado automaticamente.
          </div>
      </footer>
    </div>
  );
};

export default ChecklistReportPDF;
