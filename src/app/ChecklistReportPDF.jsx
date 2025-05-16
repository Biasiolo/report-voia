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
        margin: 0.5,
        filename: `Checklist_${client.company || 'cliente'}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: {
          unit: 'cm',
          format: 'a4',
          orientation: 'portrait',
          compress: true,
          hotfixes: ['px_scaling']
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
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

  const totalItems = selectedPlatforms.reduce((total, platformId) => {
    const checklist = progress[platformId] || [];
    return total + checklist.length;
  }, 0);

  const completionPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  return (
    <div
      ref={printRef}
      style={{
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '12px',
        color: '#293145',
        backgroundColor: '#fff',
        padding: '36px',
        maxWidth: '800px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Cabeçalho com Logo e Linha Divisória - não deve quebrar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #0d9488',
        paddingBottom: '15px',
        pageBreakInside: 'avoid',
        breakInside: 'avoid'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '26px', 
            fontWeight: '700', 
            color: '#0d9488', 
            margin: '0',
            letterSpacing: '-0.5px'
          }}>
            Relatório de Checklist
          </h1>
          <p style={{ 
            fontSize: '13px', 
            color: '#64748b',
            margin: '5px 0 0 0'
          }}>
            Voia Agency Marketing
          </p>
        </div>
        <div style={{
          fontSize: '13px',
          color: '#64748b',
          textAlign: 'right'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>#{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
          <p style={{ margin: '4px 0 0 0' }}>{formattedDate}</p>
        </div>
      </div>

      {/* Gráfico de Progresso Circular */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between', 
        marginBottom: '25px', 
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          flex: '1',
          minWidth: '280px',
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: '600', 
            marginTop: '0',
            marginBottom: '15px', 
            color: '#0f172a',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '8px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ 
              display: 'inline-block',
              width: '18px',
              height: '18px',
              backgroundColor: '#0d9488',
              borderRadius: '4px',
              marginRight: '8px'
            }}></span>
            Informações do Cliente
          </h2>
          
          <div style={{ marginBottom: '8px' }}>
            <p style={{ margin: '0', color: '#64748b', fontSize: '11px', fontWeight: '500' }}>NOME DO RESPONSÁVEL</p>
            <p style={{ margin: '3px 0 0 0', fontWeight: '500', fontSize: '13px' }}>{client.name || 'Não informado'}</p>
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <p style={{ margin: '0', color: '#64748b', fontSize: '11px', fontWeight: '500' }}>EMPRESA</p>
            <p style={{ margin: '3px 0 0 0', fontWeight: '500', fontSize: '13px' }}>{client.company || 'Não informado'}</p>
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <p style={{ margin: '0', color: '#64748b', fontSize: '11px', fontWeight: '500' }}>EMAIL PARA CONTATO</p>
            <p style={{ margin: '3px 0 0 0', fontWeight: '500', fontSize: '13px' }}>{client.email || 'Não informado'}</p>
          </div>
          
          <div>
            <p style={{ margin: '0', color: '#64748b', fontSize: '11px', fontWeight: '500' }}>TELEFONE</p>
            <p style={{ margin: '3px 0 0 0', fontWeight: '500', fontSize: '13px' }}>{client.phone || 'Não informado'}</p>
          </div>
        </div>
        
        <div style={{
          flex: '1',
          minWidth: '280px',
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: '600', 
            marginTop: '0',
            marginBottom: '15px', 
            color: '#0f172a',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '8px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ 
              display: 'inline-block',
              width: '18px',
              height: '18px',
              backgroundColor: '#0d9488',
              borderRadius: '4px',
              marginRight: '8px'
            }}></span>
            Resumo do Checklist
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div style={{ textAlign: 'center', position: 'relative', width: '100px', height: '100px' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                background: `conic-gradient(#0d9488 ${completionPercentage}%, #e2e8f0 0)`,
                position: 'relative'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  left: '10px', 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                  <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#0d9488' }}>{completionPercentage}%</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>Concluído</span>
                </div>
              </div>
            </div>
            
            <div style={{ flex: '1', paddingLeft: '15px' }}>
              <div style={{ marginBottom: '10px' }}>
                <p style={{ margin: '0', color: '#64748b', fontSize: '11px', fontWeight: '500' }}>PLATAFORMAS ANALISADAS</p>
                <p style={{ margin: '3px 0 0 0', fontWeight: '500', fontSize: '13px' }}>{selectedPlatforms.length}</p>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <p style={{ margin: '0', color: '#64748b', fontSize: '11px', fontWeight: '500' }}>ITENS VERIFICADOS</p>
                <p style={{ margin: '3px 0 0 0', fontWeight: '500', fontSize: '13px' }}>{totalCompleted} de {totalItems}</p>
              </div>
              
              <div>
                <p style={{ margin: '0', color: '#64748b', fontSize: '11px', fontWeight: '500' }}>TIPO DE CHECKLIST</p>
                <p style={{ margin: '3px 0 0 0', fontWeight: '500', fontSize: '13px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {selectedPlatforms.map(id => platforms.find(p => p.id === id)?.name).filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Título da Seção de Resultados */}
      <div style={{ 
        backgroundColor: '#0d9488', 
        color: 'white', 
        padding: '10px 15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ 
          fontSize: '15px', 
          fontWeight: '600', 
          margin: '0', 
          letterSpacing: '0.5px'
        }}>
          Resultados Detalhados por Plataforma
        </h2>
      </div>

      {/* Resultados por Plataforma */}
      {selectedPlatforms.map((platformId) => {
        const platform = platforms.find(p => p.id === platformId);
        const checklist = progress[platformId];
        const note = observations?.[platformId];
        
        if (!platform || !checklist) return null;
        
        const completedItems = checklist.filter(item => item.done);
        const completionRate = Math.round((completedItems.length / checklist.length) * 100);

        return (
          <div key={platformId} style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '10px', 
            marginBottom: '24px', 
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            {/* Cabeçalho da Plataforma */}
            <div style={{ 
              backgroundColor: '#f1f5f9',
              padding: '12px 20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                color: '#0f172a', 
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {platform.name}
              </h3>
              <div style={{
                fontSize: '13px',
                fontWeight: '600',
                color: completionRate >= 70 ? '#059669' : completionRate >= 40 ? '#ca8a04' : '#dc2626'
              }}>
                {completionRate}% Completo
              </div>
            </div>

            {/* Corpo/Conteúdo da Plataforma */}
            <div style={{ padding: '20px' }}>
              {completedItems.length > 0 ? (
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ 
                    fontSize: '13px', 
                    color: '#475569', 
                    fontWeight: '600', 
                    margin: '0 0 10px 0',
                    borderBottom: '1px dashed #e2e8f0',
                    paddingBottom: '8px'
                  }}>
                    Itens Verificados ({completedItems.length})
                  </h4>
                  <ul style={{ 
                    paddingLeft: '0', 
                    margin: '0', 
                    listStyle: 'none',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '10px'
                  }}>
                    {completedItems.map(item => (
  <li key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '13px', color: '#334155', backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <span style={{ display: 'inline-block', width: '16px', height: '16px', backgroundColor: '#ffffff', border: '1px solid #525252', borderRadius: '3px', flexShrink: 0, marginTop: '2px' }}></span>
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ fontWeight: '600' }}>{item.label}</div>
                          {(item.quantidade || item.frequencia) && (
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                              {item.quantidade && <span><strong>Qtd:</strong> {item.quantidade}</span>}
                              {item.frequencia && (
                                <span style={{ marginLeft: item.quantidade ? '12px' : '0' }}><strong>Freq.:</strong> {item.frequencia}</span>
                              )}
                            </div>
                          )}
                          {item.responsavel && (
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                              <strong>Responsável:</strong> {item.responsavel}
                            </div>
                          )}
                        </div>
                      </li>
))}

                  </ul>
                </div>
              ) : (
                <p style={{ 
                  fontSize: '13px', 
                  color: '#64748b', 
                  fontStyle: 'italic',
                  margin: '0 0 15px 0'
                }}>
                  Nenhum item verificado para esta plataforma.
                </p>
              )}

              {note && note.trim() !== '' && (
                <div style={{ 
                  backgroundColor: '#f0fdfa', 
                  padding: '15px', 
                  borderLeft: '4px solid #0d9488', 
                  borderRadius: '6px', 
                  fontSize: '13px', 
                  color: '#064e3b' 
                }}>
                  <div style={{ 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    marginBottom: '5px', 
                    color: '#0d9488',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Observações
                  </div>
                  {note}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Informações Adicionais */}
      <div style={{ 
        marginTop: '30px', 
        padding: '15px 20px', 
        backgroundColor: '#f8fafc', 
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#0f172a', 
          margin: '0 0 10px 0'
        }}>
          Informações Adicionais
        </h3>
        <p style={{ 
          fontSize: '12px', 
          color: '#64748b', 
          margin: '0',
          lineHeight: '1.6'
        }}>
          Este relatório apresenta os resultados da análise de marketing digital realizada para {client.company || 'o cliente'}. 
          O checklist foi concluído em {formattedDate} por {client.name || 'um representante'} da Voia Agency. 
          Para mais informações ou para agendar uma reunião de consultoria, entre em contato com nossa equipe através 
          do email contato@voiaagency.com.br.
        </p>
      </div>

      {/* Rodapé */}
      <footer style={{ 
        marginTop: '40px',
        borderTop: '2px solid #0d9488',
        paddingTop: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '10px',
        color: '#64748b'
      }}>
        <div>
          <strong style={{ color: '#0d9488' }}>Voia Agency</strong> © {new Date().getFullYear()}
        </div>
        <div>
          Relatório gerado por {client.name || 'usuário'} | www.voiaagency.com.br
        </div>
      </footer>
    </div>
  );
};

export default ChecklistReportPDF;