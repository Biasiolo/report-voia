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

  const calculateCompletedItems = () => {
    let completedItems = 0;
    selectedPlatforms.forEach(platformId => {
      const checklist = progress[platformId];
      if (checklist) {
        completedItems += checklist.filter(item => item.done).length;
      }
    });
    return completedItems;
  };

  const totalCompleted = calculateCompletedItems();

  return (
    <div
    ref={printRef}
    style={{
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '12px',
      lineHeight: '1.6',
      color: '#1e293b',
      backgroundColor: '#ffffff',
      padding: '40px',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <header style={{
        padding: '30px 36px',
        backgroundColor: '#0891b2',
        color: 'white',
        borderRadius: '16px',
        marginBottom: '40px',
        boxShadow: '0 10px 25px rgba(8, 145, 178, 0.2)',
        backgroundImage: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.12) 0%, transparent 70%)',
          zIndex: '1',
        }}></div>
        
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '150px',
          height: '150px',
          borderRadius: '75px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          zIndex: '1',
        }}></div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          marginBottom: '14px',
          position: 'relative',
          textAlign: 'center',
          letterSpacing: '0.5px',
          zIndex: '2',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Relatório Checklist de Marketing
        </h1>

        <div style={{
          fontSize: '13px',
          opacity: '0.95',
          position: 'relative',
          textAlign: 'center',
          fontWeight: '500',
          letterSpacing: '0.3px',
          zIndex: '2',
        }}>
          Gerado em: {formattedDate}
        </div>
      </header>

      <div style={{
        display: 'flex',
        gap: '28px',
        marginBottom: '40px',
        flexWrap: 'wrap',
      }}>
        <section style={{
          flex: '1',
          minWidth: '300px',
          backgroundColor: '#fcfcfc',
          padding: '28px',
          borderRadius: '14px',
          borderLeft: '6px solid #0891b2',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#0e7490',
            marginBottom: '18px',
            textTransform: 'uppercase',
            letterSpacing: '0.7px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '10px',
          }}>
            Dados do Cliente
          </h2>
          <p style={{ marginBottom: '10px', fontSize: '13px' }}><strong style={{ color: '#334155', fontWeight: '600' }}>Nome:</strong> {client.name}</p>
          <p style={{ marginBottom: '10px', fontSize: '13px' }}><strong style={{ color: '#334155', fontWeight: '600' }}>Empresa:</strong> {client.company}</p>
          <p style={{ fontSize: '13px' }}><strong style={{ color: '#334155', fontWeight: '600' }}>Email:</strong> {client.email}</p>
        </section>

        <section style={{
          flex: '1',
          minWidth: '300px',
          backgroundColor: '#fcfcfc',
          padding: '28px',
          borderRadius: '14px',
          borderLeft: '6px solid #10b981',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#059669',
            marginBottom: '18px',
            textTransform: 'uppercase',
            letterSpacing: '0.7px',
            borderBottom: '1px solid #d1fae5',
            paddingBottom: '10px',
          }}>
            Resumo do Relatório
          </h2>
          <p style={{ marginBottom: '10px', fontSize: '13px' }}><strong style={{ color: '#334155', fontWeight: '600' }}>Plataformas analisadas:</strong> {selectedPlatforms.length}</p>
          <p style={{ marginBottom: '10px', fontSize: '13px' }}><strong style={{ color: '#334155', fontWeight: '600' }}>Itens concluídos:</strong> {totalCompleted}</p>
          <div style={{ marginTop: '15px', padding: '10px 0' }}>
            
            
          </div>
        </section>
      </div>

      <div style={{
        backgroundColor: '#f8fafc',
        padding: '18px 24px',
        borderRadius: '10px',
        marginBottom: '28px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
        borderLeft: '5px solid #0891b2',
        display: 'flex',
        alignItems: 'center',
      }}>
        
        <h2 style={{
          fontSize: '17px',
          fontWeight: '700',
          color: '#0e7490',
          margin: 0,
          letterSpacing: '0.3px',
        }}>
          Resultados por Plataforma
        </h2>
      </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {selectedPlatforms.map((platformId) => {
            const platform = platforms.find(p => p.id === platformId);
            const checklist = progress[platformId];
            const note = observations?.[platformId];

            if (!platform || !checklist) return null;
            const completedItems = checklist.filter(item => item.done);

            return (
              <section key={platformId} style={{
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  padding: '16px 24px',
                  backgroundColor: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#0f172a',
                    margin: 0,
                  }}>
                    {platform.name}
                  </h3>
                </div>

                <div style={{ padding: '20px 24px' }}>
                  {completedItems.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', fontWeight: 'bold' }}>
                        Itens Realizados
                      </h4>
                      <ul style={{ paddingLeft: '16px', marginBottom: '12px', listStyle: 'none' }}>
                        {completedItems.map(item => (
                          <li key={item.id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px', minWidth: '16px', lineHeight: '1.4' }}>✓</span>
                            <span style={{ fontSize: '13px', color: '#334155' }}>{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {note && note.trim() !== '' && (
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#ecfdf5',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#064e3b',
                      marginTop: '8px',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                      borderLeft: '4px solid #14b8a6',
                    }}>
                      <strong style={{ color: '#047857' }}>Observações:</strong> {note}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        <footer style={{
          marginTop: '60px',
          fontSize: '11px',
          color: '#64748b',
          textAlign: 'center',
          borderTop: '1px solid #e2e8f0',
          paddingTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div>
            © {new Date().getFullYear()} - Relatório Checklist de Marketing - Voia Agency
          </div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>
            Este relatório é confidencial e foi gerado automaticamente.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChecklistReportPDF;