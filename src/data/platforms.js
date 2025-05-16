import { FaClipboardList, FaBullhorn, FaGlobe, FaChartLine, FaGoogle, FaCameraRetro } from 'react-icons/fa';


const platforms = [
    {
  id: "marketing",
  name: "Marketing",
  icon: FaBullhorn,
  checklist: [
    {
      "id": "marketing_grupo_cliente",
      "label": "Criar grupo cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_reuniao_briefing",
      "label": "Agendar|Realizar reunião de briefing cliente",
      "quantidade": "1",
      "done": false
    },
    {
      "id": "marketing_ata",
      "label": "Enviar ATA de reunião para cliente",
      "quantidade": "1",
      "done": false
    },
    {
      "id": "marketing_pasta_drive",
      "label": "Criar pasta do cliente no Drive",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_solicitar_conteudos",
      "label": "Solicitar conteúdos para o cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_inserir_conteudos",
      "label": "Conteúdos + ATA e link da reunião no Drive",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_card_operand",
      "label": "Card no Operand de revisão ou criação de redes do cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_verificar_redes",
      "label": "Verificar se tem todas as redes",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_senha_atualizada",
      "label": "Verificar se a senha está atualizada",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_email_telefone",
      "label": "Verificar e-mail e telefone de recuperação de todas as redes",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_planilha_acessos",
      "label": "Criar planilha com as senhas e e-mails atualizados",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_enviar_planilha",
      "label": "Enviar planilha no particular do cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_card_planejamento",
      "label": "Criar card para o planejamento do cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_planejamento_estrategico",
      "label": "Criar o Planejamento de campanhas Marketing Estratégico Mensal",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_atualizar_foto",
      "label": "Atualizar Foto de perfil das redes",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_bio_destaques",
      "label": "Atualizar Bio e Destaques do cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_planejamento_promocional",
      "label": "Criar planejamento de campanhas promocionais únicas",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_posts_estaticos",
      "label": "Produzir posts estáticos",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_carrosseis",
      "label": "Produzir carrosséis",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_stories",
      "label": "Produzir stories",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_enviar_planejamento",
      "label": "Enviar planejamento pronto pro cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_agendar_conteudos",
      "label": "Agendar conteúdos mensais",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_pecas_offline",
      "label": "Criar peças de material gráfico off-line",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_replicar_redes",
      "label": "Replicar nas redes sociais",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_roteiros_reels",
      "label": "Criar roteiros para Reels com temas",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_tema_eusou",
      "label": "Temas: Eu sou",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_tema_boasvindas",
      "label": "Temas: Boas Vindas",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_tema_servicos",
      "label": "Temas: Produtos e Serviços",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_tema_cases",
      "label": "Temas: Cases de Sucesso",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_tema_endosso",
      "label": "Temas: Endosso Social",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_tema_app",
      "label": "Temas: Aplicativo",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_tema_didaticos",
      "label": "Temas: Vídeos didáticos",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_tema_interna",
      "label": "Temas: Campanha interna",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_gravacao_cliente",
      "label": "Agendar gravação de conteúdos com cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_acompanhamento",
      "label": "Acompanhar presencialmente as gravações (se solicitado)",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "marketing_relatorio_mensal",
      "label": "Enviar relatório mensal de desempenho",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    }
  ]
},


      {
  id: "web",
  name: "Web",
  icon: FaGlobe,
  checklist: [
    {
      "id": "web_1",
      "label": "Criar grupo cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_2",
      "label": "Agendar e realizar reunião de briefing com cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_3",
      "label": "Enviar ATA de reunião para cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_4",
      "label": "Criar pasta do cliente no Drive",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_5",
      "label": "Solicitar conteudos para o cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_6",
      "label": "Inserir conteudos + ATA e link da reunião no Drive",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_7",
      "label": "Criar estrategia e copy do site",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_8",
      "label": "Enviar copy pra aprovação do cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_9",
      "label": "Criar design pelo figma",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_10",
      "label": "Envia o design do figma pra aprovação do cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_11",
      "label": "Produção do site pelo Bricks",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_12",
      "label": "Testes de funcionamento dos botões",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_13",
      "label": "Verificação do titulo do site se esta com palavra chave",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_14",
      "label": "Verificação de favicon",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_15",
      "label": "Verificação de logo se esta sendo redirecionada pra home",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_16",
      "label": "Link de politica de privacidade no rodapé",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_17",
      "label": "Pop up de politica de privacidade",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_18",
      "label": "Verificação dos titulos das paginas se estão corretos",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_19",
      "label": "Verificação de pagina 404",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_20",
      "label": "Existe botão de whatsapp",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_21",
      "label": "Teste de responsividade",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_22",
      "label": "Teste de formulario",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_23",
      "label": "Criação e avaliação do SEO",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_24",
      "label": "Verificação com cliente sobre dominio e hospedagem",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_25",
      "label": "Envio do site pronto pra aprovação do cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_26",
      "label": "Envio de codigo fonte pro cliente via e-mail e whats",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_27",
      "label": "Hospedagem com a NED, alterar grupo para hospedagem",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "web_28",
      "label": "Caso não se hospede com a NED, finalizar grupo de cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    }
  ]
},

    {
  id: "trafego",
  name: "Tráfego",
  icon: FaChartLine,
  checklist: [
    {
      "id": "trafego_agendar_e_realizar_reuniao_de_briefing_com_cliente",
      "label": "Agendar e realizar reunião de briefing com cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_enviar_ata_de_reuniao_para_cliente",
      "label": "Enviar ATA de reunião para cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_criar_pasta_do_cliente_no_drive",
      "label": "Criar pasta do cliente no Drive",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_criar_planilha_de_acessos_do_cliente_e_inserir_no_drive",
      "label": "Criar planilha de acessos do cliente e inserir no drive",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_solicitar_conteudos_para_o_cliente",
      "label": "Solicitar conteudos para o cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_inserir_conteudos_+_ata_e_link_da_reuniao_no_drive",
      "label": "Inserir conteudos + ATA e link da reunião no Drive",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_implementacao_do_cliente_no_funil_no_operand_e_no_trello",
      "label": "Implementação cliente no funil no Operand e Trello",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_fazer_onboarding",
      "label": "Fazer onboarding",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_analise_das_contas",
      "label": "Analise das contas",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_configurar_contas_no_business_manager_(meta_ads)",
      "label": "Configurar contas no Business Manager (Meta Ads)",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_criar_conta_no_google_ads",
      "label": "Criar conta no Google Ads",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_implementacao_das_estrategias",
      "label": "Implementação das estrategias",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_criar_campanhas_meta_ads",
      "label": "Criar campanhas Meta Ads",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_criar_campanhas_google_ads",
      "label": "Criar campanhas Google Ads",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_validar_criativos,_copies_e_públicos-alvo_com_cliente",
      "label": "Validar criativos, copies e públicos-alvo com cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_escala_de_orcamento",
      "label": "Escala de orçamento",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "trafego_enviar_relatórios_semanais_com_comparativos_e_roi",
      "label": "Enviar relatórios semanais com comparativos e ROI",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    }
  ]
},
    {
  id: "gmn",
  name: "Google Meu Negócio",
  icon: FaGoogle,
  checklist: [
    {
      "id": "gmn_grupo",
      "label": "Criar grupo cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_formulario",
      "label": "Envio de documento pro cliente preencher as informações",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_fotos",
      "label": "Solicitar fotos para cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_criar_conta",
      "label": "Criar conta no Google",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_descricao_seo",
      "label": "Criar descrição com SEO",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_catalogo",
      "label": "Inserir fotos com catálogo",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_atualizacao",
      "label": "Atualização de informações",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_redes",
      "label": "Inserir redes do cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_comentarios",
      "label": "Responder comentários do GMN",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_apresentacao",
      "label": "Reunião de apresentação do GMN e ensinar como funciona",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_acesso",
      "label": "Envio do acesso da plataforma pro cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_arte_avaliacao",
      "label": "Envio da arte de avaliação do GMN",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_manutencao",
      "label": "Caso o cliente tenha MKT conosco, muda o nome do grupo pra manutenção de GMN",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "gmn_finalizacao",
      "label": "Finalização de grupo",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    }
  ]
},
      
      
    {
  id: "audiovisual",
  name: "Treinamento Audiovisual",
  icon: FaCameraRetro,
  checklist: [
    {
      "id": "av_treinamento_personalizado",
      "label": "Treinamento personalizado sobrer práticas para criação de conteúdos",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "av_status_execucao",
      "label": "Atualizar status de execução em painel visual",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "av_marcar_entregue",
      "label": "Marcar como 'entregue' após aprovação, registro e arquivamento",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "av_conferir_pendencias",
      "label": "Conferir pendências antes de iniciar nova etapa",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    }
  ]
},

    {
  id: "geral",
  name: "Geral",
  icon: FaClipboardList,
  checklist: [
    {
      "id": "geral_pasta_compartilhada",
      "label": "Criar pasta compartilhada com todos os arquivos do cliente",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "geral_status_painel",
      "label": "Atualizar status de execução em painel visual",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "geral_marcar_entregue",
      "label": "Marcar como 'entregue' após aprovação, registro e arquivamento",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    },
    {
      "id": "geral_conferir_pendencias",
      "label": "Conferir pendências antes de iniciar nova etapa",
      "done": false,
      "quantidade": "1",
      "frequencia": ""
    }
  ]
},

    

];

export default platforms;
