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

  // Formatação da data atual
  const formattedDate = new Date().toLocaleString('pt-BR', { 
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculando o progresso geral
  const calculateOverallProgress = () => {
    let totalItems = 0;
    let completedItems = 0;

    selectedPlatforms.forEach(platformId => {
      const checklist = progress[platformId];
      if (checklist) {
        totalItems += checklist.length;
        completedItems += checklist.filter(item => item.done).length;
      }
    });

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div
      ref={printRef}
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        lineHeight: '1.6',
        color: '#334155',
        backgroundColor: '#ffffff',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '800px' }}>
        {/* Cabeçalho */}
        <header style={{
          padding: '25px 30px',
          backgroundColor: '#0d9488',
          color: 'white',
          borderRadius: '12px',
          marginBottom: '36px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          backgroundImage: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
          }}></div>
          
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '10px',
            position: 'relative',
            textAlign: 'center'
          }}>
            Relatório de Checklist de Marketing
          </h1>
          
          <div style={{
            fontSize: '12px',
            opacity: '0.9',
            position: 'relative',
          }}>
            Gerado em: {formattedDate}
          </div>
        </header>

        {/* Dados do Cliente e Resumo */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '36px',
          flexWrap: 'wrap',
        }}>
          {/* Dados do Cliente */}
          <section style={{
            flex: '1',
            minWidth: '300px',
            backgroundColor: '#f8fafc',
            padding: '24px',
            borderRadius: '12px',
            borderLeft: '5px solid #0d9488',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#0f766e',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '8px',
            }}>
              📋 Dados do Cliente
            </h2>
            <p style={{ marginBottom: '8px' }}><strong style={{ color: '#334155' }}>Nome:</strong> {client.name}</p>
            <p style={{ marginBottom: '8px' }}><strong style={{ color: '#334155' }}>Empresa:</strong> {client.company}</p>
            <p><strong style={{ color: '#334155' }}>Email:</strong> {client.email}</p>
          </section>

          {/* Resumo do Progresso */}
          <section style={{
            flex: '1',
            minWidth: '300px',
            backgroundColor: '#f0fdfa',
            padding: '24px',
            borderRadius: '12px',
            borderLeft: '5px solid #14b8a6',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#0f766e',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '8px',
            }}>
              📊 Resumo do Checklist
            </h2>
            <p style={{ marginBottom: '8px' }}><strong style={{ color: '#334155' }}>Plataformas analisadas:</strong> {selectedPlatforms.length}</p>
            <p style={{ marginBottom: '12px' }}><strong style={{ color: '#334155' }}>Progresso geral:</strong> {overallProgress}%</p>
            
            {/* Barra de progresso */}
            <div style={{ 
              height: '10px', 
              backgroundColor: '#e2e8f0',
              borderRadius: '5px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${overallProgress}%`,
                backgroundColor: '#14b8a6',
                borderRadius: '5px',
              }}></div>
            </div>
          </section>
        </div>

        {/* Título da Seção de Plataformas */}
        <div style={{
          backgroundColor: '#f1f5f9',
          padding: '15px 20px',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          borderLeft: '4px solid #475569',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#334155',
            margin: 0,
            alignItems: 'center'
          }}>
            Resultados por Plataforma
          </h2>
        </div>

        {/* Plataformas */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {selectedPlatforms.map((platformId) => {
            const platform = platforms.find(p => p.id === platformId);
            const checklist = progress[platformId];
            const note = observations?.[platformId];

            if (!platform || !checklist) return null;

            // Filtrar apenas itens concluídos
            const completedItems = checklist.filter(item => item.done);

            return (
              <section key={platformId} style={{
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.04)',
              }}>
                {/* Cabeçalho da plataforma - sem progresso */}
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

                {/* Corpo da plataforma */}
                <div style={{
                  padding: '20px 24px',
                }}>
                  {/* Apenas itens completos */}
                  {completedItems.length > 0 && (
                    <div style={{
                      marginBottom: '16px',
                    }}>
                      <h4 style={{
                        fontSize: '14px',
                        color: '#475569',
                        marginBottom: '12px',
                        fontWeight: 'bold',
                      }}>
                        Itens Realizados
                      </h4>
                      <ul style={{
                        paddingLeft: '16px',
                        marginBottom: '12px',
                        listStyle: 'none',
                      }}>
                        {completedItems.map(item => (
                          <li key={item.id} style={{
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px'
                          }}>
                            <span style={{
                              color: '#10b981',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              minWidth: '16px',
                              lineHeight: '1.4',
                            }}>✓</span>
                            <span style={{
                              fontSize: '13px',
                              color: '#334155'
                            }}>{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Observações */}
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

        {/* Rodapé */}
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
            © {new Date().getFullYear()} - Relatório de Checklist de Marketing - Voia Agency
          </div>
          <div style={{
            fontSize: '10px',
            color: '#94a3b8',
          }}>
            Este relatório é confidencial e foi gerado automaticamente.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChecklistReportPDF;