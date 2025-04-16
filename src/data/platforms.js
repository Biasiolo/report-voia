import { FaInstagram, FaFacebookF, FaTiktok, FaLinkedinIn, FaLink, FaPalette } from 'react-icons/fa';
import { SiGooglestreetview, SiGoogleads } from 'react-icons/si';
import { MdWeb } from 'react-icons/md';

const platforms = [
    {
        id: 'instagram',
        name: 'Instagram',
        icon: FaInstagram,
        checklist: [

            { id: 'insta_login', label: 'Login/Senha Atualizado', done: false },
            { id: 'insta_conta_comercial', label: 'Conta configurada como Comercial ou Criador', done: false },
            { id: 'insta_facebook_integrado', label: 'Instagram vinculado ao Facebook Business', done: false },
            { id: 'insta_foto_perfil', label: 'Foto de Perfil otimizada', done: false },
            { id: 'insta_bio', label: 'Bio com proposta clara', done: false },
            { id: 'insta_link_bio', label: 'Link na Bio (ex: Linktree ou página personalizada)', done: false },
            { id: 'insta_destaques', label: 'Destaques organizados com capa personalizada', done: false },

            { id: 'insta_paleta', label: 'Identidade visual definida e aplicada', done: false },
            { id: 'insta_templates', label: 'Templates de posts e stories criados', done: false },

            { id: 'insta_posts_criados', label: 'Posts criados com texto e design aprovado', done: false },
            { id: 'insta_posts_agendados', label: 'Posts agendados conforme calendário', done: false },
            { id: 'insta_stories_criados', label: 'Stories criados com interações (enquete, quiz, etc)', done: false },
            { id: 'insta_stories_agendados', label: 'Stories agendados e programados', done: false },
            { id: 'insta_reels_criados', label: 'Reels produzidos com corte, legenda e áudio', done: false },
            { id: 'insta_reels_agendados', label: 'Reels agendados conforme planejamento', done: false },

            { id: 'insta_impulsionamento', label: 'Impulsionamentos configurados (com público e objetivo)', done: false },
            { id: 'insta_ab_test', label: 'Testes A/B com criativos diferentes', done: false },

            { id: 'insta_analise_mensal', label: 'Relatório mensal enviado com métricas e insights', done: false },
            { id: 'insta_otimizacoes', label: 'Ajustes realizados com base nos dados', done: false },

            { id: 'insta_captacao', label: 'Captação', done: false },
        ],
    },

    {
        id: 'facebook',
        name: 'Facebook',
        icon: FaFacebookF,
        checklist: [

            { id: 'fb_login', label: 'Login/Senha Atualizado', done: false },
            { id: 'fb_conta_comercial', label: 'Página configurada como Empresa', done: false },
            { id: 'fb_vinculo_instagram', label: 'Vinculada ao Instagram no Business Suite', done: false },

            { id: 'fb_profile_pic', label: 'Foto de Perfil', done: false },
            { id: 'fb_cover', label: 'Imagem de Capa personalizada', done: false },
            { id: 'fb_bio', label: 'Descrição/Bio com posicionamento', done: false },
            { id: 'fb_cta', label: 'Botão de chamada para ação configurado (WhatsApp, Site, etc)', done: false },

            { id: 'fb_posts', label: 'Publicações recentes relevantes no feed', done: false },
            { id: 'fb_schedule', label: 'Agendamento de conteúdo no Business Suite', done: false },

        ],
    },

    {
        id: 'gmb',
        name: 'Google Meu Negócio',
        icon: SiGooglestreetview,
        checklist: [

            { id: 'gmb_login', label: 'Login/Senha da Conta Google', done: false },
            { id: 'gmb_verificacao', label: 'Verificação da empresa concluída (código ou vídeo)', done: false },

            { id: 'gmb_nome', label: 'Nome comercial correto e padronizado', done: false },
            { id: 'gmb_address', label: 'Endereço completo e sem abreviações', done: false },
            { id: 'gmb_phone', label: 'Telefone atualizado e testado', done: false },
            { id: 'gmb_email', label: 'Email institucional configurado', done: false },
            { id: 'gmb_site', label: 'Site ou página de destino inserido corretamente', done: false },
            { id: 'gmb_horario', label: 'Horários de funcionamento completos', done: false },
            { id: 'gmb_servicos', label: 'Lista de serviços cadastrada', done: false },
            { id: 'gmb_area_atendimento', label: 'Área de atendimento definida (se aplicável)', done: false },

            { id: 'gmb_logo', label: 'Logo da empresa adicionada', done: false },
            { id: 'gmb_capa', label: 'Foto de capa (imagem principal)', done: false },
            { id: 'gmb_fotos', label: 'Fotos de equipe, ambiente e produtos adicionadas', done: false },
            { id: 'gmb_videos', label: 'Vídeos institucionais (se disponíveis)', done: false },

            { id: 'gmb_posts', label: 'Posts criados e programados (promoções, atualizações)', done: false },
            { id: 'gmb_respostas', label: 'Respostas a perguntas frequentes (Q&A)', done: false },

            { id: 'gmb_review', label: 'Avaliações respondidas com cordialidade', done: false },
            { id: 'gmb_pedidos_avaliacao', label: 'Pedido de avaliação enviado a clientes recentes', done: false },
            { id: 'gmb_monitoramento', label: 'Monitoramento de novas avaliações e comentários', done: false },

            { id: 'gmb_metricas', label: 'Verificação de métricas de pesquisa e chamadas', done: false },
            { id: 'gmb_relatorio', label: 'Relatório mensal com ações e resultados', done: false },
        ],
    },

    {
        id: 'tiktok',
        name: 'TikTok',
        icon: FaTiktok,
        checklist: [

            { id: 'tiktok_login', label: 'Login/Senha atualizado', done: false },
            { id: 'tiktok_config_perfil', label: 'Perfil público e otimizado (nome, arroba, tipo de conta)', done: false },

            { id: 'tiktok_bio', label: 'Bio com proposta clara', done: false },
            { id: 'tiktok_link', label: 'Link na bio ativo (Linktree ou site)', done: false },

            { id: 'tiktok_videos_postados', label: 'Vídeos postados recentemente', done: false },
            { id: 'tiktok_agendados', label: 'Vídeos agendados (ou organizados para postagem)', done: false },

            { id: 'tiktok_thumbnail', label: 'Capas personalizadas nos vídeos principais', done: false },
            { id: 'tiktok_hashtags', label: 'Hashtags estratégicas utilizadas', done: false },

            { id: 'tiktok_metricas', label: 'Métricas básicas verificadas (visualizações, curtidas)', done: false },
        ],
    },

    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: FaLinkedinIn,
        checklist: [

            { id: 'linkedin_login', label: 'Login/Senha atualizado', done: false },
            { id: 'linkedin_perfil_pessoal', label: 'Perfil pessoal vinculado à empresa (admin)', done: false },
            { id: 'linkedin_pagina_empresa', label: 'Página da empresa criada e configurada', done: false },

            { id: 'linkedin_foto_perfil', label: 'Foto de Perfil (logo da empresa)', done: false },
            { id: 'linkedin_capa', label: 'Imagem de capa institucional', done: false },
            { id: 'linkedin_descricao', label: 'Descrição da empresa com palavras-chave', done: false },
            { id: 'linkedin_localizacao', label: 'Localização atualizada', done: false },
            { id: 'linkedin_website', label: 'Website vinculado', done: false },
            { id: 'linkedin_contato', label: 'Dados de contato atualizados', done: false },

            { id: 'linkedin_posts', label: 'Publicações recentes no feed da empresa', done: false },
            { id: 'linkedin_agendados', label: 'Posts agendados (ou planejados)', done: false },

            { id: 'linkedin_vagas', label: 'Sessão de vagas atualizada (se aplicável)', done: false },
        ],
    },

    {
        id: 'linktree',
        name: 'Linktree',
        icon: FaLink,
        checklist: [

            { id: 'linktree_login', label: 'Login/Senha atualizado', done: false },
            { id: 'linktree_custom_url', label: 'URL personalizada e fácil de lembrar', done: false },
            { id: 'linktree_tema', label: 'Tema visual definido (cores e layout)', done: false },

            { id: 'linktree_site', label: 'Link para Site ou Blog', done: false },
            { id: 'linktree_whatsapp', label: 'WhatsApp com link direto', done: false },
            { id: 'linktree_facebook', label: 'Facebook', done: false },
            { id: 'linktree_instagram', label: 'Instagram', done: false },
            { id: 'linktree_tiktok', label: 'TikTok', done: false },
            { id: 'linktree_youtube', label: 'YouTube', done: false },
            { id: 'linktree_linkedin', label: 'LinkedIn', done: false },
            { id: 'linktree_x', label: 'X (Twitter)', done: false },
            { id: 'linktree_pinterest', label: 'Pinterest', done: false },
            { id: 'linktree_spotify', label: 'Spotify', done: false },
            { id: 'linktree_ebooks', label: 'E-books ou materiais gratuitos', done: false },

            { id: 'linktree_testado', label: 'Todos os links testados e funcionando', done: false },
            { id: 'linktree_google_index', label: 'Linktree indexado no perfil Google/Instagram', done: false },
        ],
    },

    {
        id: 'trafego',
        name: 'Tráfego',
        icon: SiGoogleads,
        checklist: [

            { id: 'ads_login', label: 'Acesso às contas concedido (Google Ads / Meta Ads)', done: false },
            { id: 'ads_tag_instalada', label: 'Tags e pixels instalados corretamente no site', done: false },
            { id: 'ads_gtm', label: 'Google Tag Manager instalado e validado', done: false },
            { id: 'ads_conversoes', label: 'Eventos de conversão definidos e funcionando', done: false },

            { id: 'ads_conta_verificada', label: 'Contas verificadas e com formas de pagamento ativas', done: false },
            { id: 'ads_fuso_moeda', label: 'Fuso horário e moeda ajustados corretamente', done: false },
            { id: 'ads_estrutura', label: 'Estrutura de campanhas padronizada (campanhas, grupos, anúncios)', done: false },

            { id: 'ads_públicos_criados', label: 'Públicos salvos (interesses, lookalike, personalizados)', done: false },
            { id: 'ads_audiencias_revisadas', label: 'Audiências revisadas por etapa do funil', done: false },
            { id: 'ads_remarketing', label: 'Listas de remarketing ativas e validadas', done: false },

            { id: 'ads_objetivo_definido', label: 'Objetivos de campanha bem definidos (tráfego, conversão, leads, etc)', done: false },
            { id: 'ads_oferta', label: 'Oferta clara e validada com o cliente', done: false },
            { id: 'ads_copy_design', label: 'Anúncios criados com copy + criativo aprovado', done: false },
            { id: 'ads_veiculando', label: 'Campanhas ativas e em veiculação', done: false },
            { id: 'ads_testes_ab', label: 'Testes A/B estruturados (criativo, copy, CTA ou público)', done: false },

            { id: 'ads_ajustes_semanais', label: 'Ajustes semanais baseados em desempenho', done: false },
            { id: 'ads_roas_monitorado', label: 'ROAS / CPA monitorado por campanha', done: false },
            { id: 'ads_orcamento_otimizado', label: 'Otimização de orçamento e alocação de verba', done: false },

            { id: 'ads_relatorio', label: 'Relatório mensal enviado com indicadores e gráficos', done: false },
            { id: 'ads_feedback_cliente', label: 'Reunião de feedback com o cliente (mensal ou bimestral)', done: false },
        ],
    },

    {
        id: 'web',
        name: 'Web',
        icon: MdWeb,
        checklist: [
            // 🌐 Infraestrutura
            { id: 'web_domain', label: 'Domínio registrado e configurado corretamente', done: false },
            { id: 'web_hosting', label: 'Hospedagem contratada e funcional', done: false },
            { id: 'web_ssl', label: 'Certificado SSL instalado e forçando HTTPS', done: false },
            { id: 'web_dns', label: 'DNS configurado corretamente', done: false },

            // 🧱 Estrutura e Funcionalidades
            { id: 'web_plataforma', label: 'Tecnologia definida (WordPress, React, etc)', done: false },
            { id: 'web_layout_responsivo', label: 'Layout responsivo em todos os dispositivos', done: false },
            { id: 'web_uxui', label: 'Padrões de UX/UI aplicados (navegação, legibilidade, botões)', done: false },
            { id: 'web_paginas_essenciais', label: 'Páginas obrigatórias criadas (Home, Sobre, Contato, Política)', done: false },
            { id: 'web_forms', label: 'Formulários funcionando (contato, orçamento, etc)', done: false },
            { id: 'web_redirecionamentos', label: 'Redirecionamentos e URLs amigáveis', done: false },

            // 🛒 E-commerce (se aplicável)
            { id: 'web_ecommerce', label: 'Loja com produtos e categorias criadas', done: false },
            { id: 'web_pagamentos', label: 'Pagamentos integrados (Pix, Cartão, etc)', done: false },
            { id: 'web_entregas', label: 'Frete configurado (correios, tabela fixa ou integração)', done: false },

            // ✍️ Conteúdo e Identidade
            { id: 'web_logo', label: 'Logo aplicada em todas as páginas', done: false },
            { id: 'web_favicon', label: 'Favicon configurado', done: false },
            { id: 'web_conteudo', label: 'Textos institucionais, serviços, blog, etc.', done: false },
            { id: 'web_imagens', label: 'Imagens otimizadas (peso, tamanho, qualidade)', done: false },

            // 🔍 SEO e Performance
            { id: 'web_seo_title', label: 'Titles e descriptions otimizados', done: false },
            { id: 'web_seo_tags', label: 'Uso adequado de headings (H1, H2...)', done: false },
            { id: 'web_google_search_console', label: 'Google Search Console configurado', done: false },
            { id: 'web_google_analytics', label: 'Google Analytics ou GA4 ativo', done: false },
            { id: 'web_performance', label: 'Site testado no PageSpeed (Desktop e Mobile)', done: false },

            // ✅ Finalização e Validação
            { id: 'web_testes_navegacao', label: 'Testes de navegação e links em todas as páginas', done: false },
            { id: 'web_publicado', label: 'Site publicado com sucesso', done: false },
            { id: 'web_backup', label: 'Backup automático configurado (se aplicável)', done: false },
        ],
    },
    {
        id: 'branding',
        name: 'Branding',
        icon: FaPalette,
        checklist: [

            { id: 'branding_logo_alta', label: 'Logo em alta resolução (PNG/SVG)', done: false },
            { id: 'branding_logo_h', label: 'Versão horizontal do logo', done: false },
            { id: 'branding_logo_v', label: 'Versão vertical do logo', done: false },
            { id: 'branding_variacoes', label: 'Variações em branco, preto e colorido', done: false },
            { id: 'branding_paleta', label: 'Paleta de cores definida', done: false },
            { id: 'branding_tipografia', label: 'Tipografia principal e secundária definida', done: false },

            { id: 'branding_manual', label: 'Manual de marca desenvolvido', done: false },
            { id: 'branding_aplicacoes', label: 'Exemplos de aplicação (social, impressos, etc)', done: false },

            { id: 'branding_social_aplicada', label: 'Identidade aplicada em redes sociais', done: false },
            { id: 'branding_modelos', label: 'Mockups ou modelos visuais entregues', done: false },
            { id: 'branding_pasta_organizada', label: 'Arquivos organizados para entrega ao cliente', done: false },
        ],
    },


];

export default platforms;
