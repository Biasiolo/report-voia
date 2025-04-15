import { FaInstagram, FaFacebookF, FaTiktok, FaLinkedinIn, FaLink } from 'react-icons/fa';
import { SiGooglestreetview, SiGoogleads } from 'react-icons/si';
import { MdWeb } from 'react-icons/md';

const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: FaInstagram,
    checklist: [
      { id: 'insta_profile_pic', label: 'Foto de Perfil', done: false },
      { id: 'insta_bio', label: 'Bio', done: false },
      { id: 'insta_linktree', label: 'LinkTree', done: false },
      { id: 'insta_highlights', label: 'Destaques', done: false },
      { id: 'insta_feed', label: 'Feed', done: false },
      { id: 'insta_stories', label: 'Stories', done: false },
      { id: 'insta_boost', label: 'Impulsionamento', done: false },
      { id: 'insta_schedule', label: 'Agendamento', done: false },
      { id: 'insta_login', label: 'Login/Senha', done: false },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FaFacebookF,
    checklist: [
      { id: 'fb_login_mb', label: 'Login/Senha MB', done: false },
      { id: 'fb_profile_pic', label: 'Foto de Perfil', done: false },
      { id: 'fb_cover', label: 'Capa', done: false },
      { id: 'fb_bio', label: 'Descrição/Bio', done: false },
      { id: 'fb_schedule', label: 'Agendamento', done: false },
    ],
  },
  {
    id: 'gmb',
    name: 'Google Meu Negócio',
    icon: SiGooglestreetview,
    checklist: [
      { id: 'gmb_login', label: 'Login/Senha', done: false },
      { id: 'gmb_address', label: 'Endereço', done: false },
      { id: 'gmb_site', label: 'Site', done: false },
      { id: 'gmb_phone', label: 'Telefone', done: false },
      { id: 'gmb_photos', label: 'Fotos', done: false },
      { id: 'gmb_email', label: 'Email', done: false },
      { id: 'gmb_review', label: 'Revisão', done: false },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: FaTiktok,
    checklist: [
      { id: 'tiktok_login', label: 'Login/Senha', done: false },
      { id: 'tiktok_bio', label: 'Bio', done: false },
      { id: 'tiktok_videos', label: 'Vídeos', done: false },
      { id: 'tiktok_feed', label: 'Feed', done: false },
      { id: 'tiktok_stories', label: 'Stories', done: false },
      { id: 'tiktok_schedule', label: 'Agendamento', done: false },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: FaLinkedinIn,
    checklist: [
      { id: 'linkedin_login', label: 'Login/Senha', done: false },
      { id: 'linkedin_personal', label: 'Pessoal', done: false },
      { id: 'linkedin_page', label: 'Página', done: false },
      { id: 'linkedin_profile_pic', label: 'Foto de Perfil', done: false },
      { id: 'linkedin_description', label: 'Descrição', done: false },
      { id: 'linkedin_location', label: 'Localização', done: false },
      { id: 'linkedin_contact', label: 'Contato', done: false },
      { id: 'linkedin_posts', label: 'Publicações', done: false },
      { id: 'linkedin_jobs', label: 'Vagas', done: false },
      { id: 'linkedin_schedule', label: 'Agendamento', done: false },
    ],
  },
  {
    id: 'linktree',
    name: 'Linktree',
    icon: FaLink,
    checklist: [
      { id: 'linktree_site', label: 'Site/Blog', done: false },
      { id: 'linktree_facebook', label: 'Facebook', done: false },
      { id: 'linktree_x', label: 'X (Twitter)', done: false },
      { id: 'linktree_pinterest', label: 'Pinterest', done: false },
      { id: 'linktree_tiktok', label: 'TikTok', done: false },
      { id: 'linktree_spotify', label: 'Spotify', done: false },
      { id: 'linktree_youtube', label: 'YouTube', done: false },
      { id: 'linktree_linkedin', label: 'LinkedIn', done: false },
      { id: 'linktree_whatsapp', label: 'WhatsApp', done: false },
      { id: 'linktree_ebooks', label: 'Ebooks', done: false },
    ],
  },
  {
    id: 'trafego',
    name: 'Tráfego',
    icon: SiGoogleads,
    checklist: [
      { id: 'ads_campaigns', label: 'Campanhas', done: false },
      { id: 'ads_remarketing', label: 'Remarketing', done: false },
    ],
  },
  {
    id: 'web',
    name: 'Web',
    icon: MdWeb,
    checklist: [
      { id: 'web_domain', label: 'Domínio', done: false },
      { id: 'web_hosting', label: 'Hospedagem', done: false },
      { id: 'web_content', label: 'Conteúdo', done: false },
      { id: 'web_seo', label: 'SEO', done: false },
      { id: 'web_ecommerce', label: 'E-commerce', done: false },
      { id: 'web_uxui', label: 'UX/UI', done: false },
      { id: 'web_ssl', label: 'SSL', done: false },
    ],
  },
];

export default platforms;
