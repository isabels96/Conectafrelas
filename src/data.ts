export interface Professional {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  avatar: string;
  category: string;
  basePrice: number;
  neighborhood: string;
  city: string;
  phone: string;
  skills: string[];
}

export const SAMPLE_PROFESSIONALS: Professional[] = [
  {
    id: "p1",
    name: "Gabriela Reis",
    title: "Desenvolvedora Frontend React & Mobile",
    rating: 4.9,
    reviews: 42,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    category: "Tecnologia",
    basePrice: 1200,
    neighborhood: "Pinheiros",
    city: "São Paulo",
    phone: "(11) 98721-3948",
    skills: ["React", "React Native", "Tailwind CSS", "UI/UX"]
  },
  {
    id: "p2",
    name: "Marcos Oliveira",
    title: "Eletricista Residencial e Industrial Autorizado",
    rating: 5.0,
    reviews: 78,
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    category: "Serviços Gerais",
    basePrice: 350,
    neighborhood: "Copacabana",
    city: "Rio de Janeiro",
    phone: "(21) 97182-3291",
    skills: ["Instalações", "Manutenção Preventiva", "Padrão Enel", "Quadro de Luz"]
  },
  {
    id: "p3",
    name: "Juliana Andrade",
    title: "Fotógrafa Profissional & Retratos Corporativos",
    rating: 4.8,
    reviews: 29,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    category: "Design & Multimídia",
    basePrice: 850,
    neighborhood: "Savassi",
    city: "Belo Horizonte",
    phone: "(31) 99128-4034",
    skills: ["Ensaios Externos", "Moda", "Eventos", "Tratamento Photoshop"]
  },
  {
    id: "p4",
    name: "Rodrigo Santos",
    title: "Encanador Especializado & Caça-Vazamentos",
    rating: 4.9,
    reviews: 55,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    category: "Serviços Gerais",
    basePrice: 280,
    neighborhood: "Pinheiros",
    city: "São Paulo",
    phone: "(11) 96421-5021",
    skills: ["Vazamento oculto", "Desentupimento", "Tubulação de Cobre", "Emergência"]
  },
  {
    id: "p5",
    name: "Dr. Roberto Mendes",
    title: "Tradutor de Inglês Técnico & Juramentado",
    rating: 5.0,
    reviews: 91,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    category: "Aulas & Tradução",
    basePrice: 450,
    neighborhood: "Batel",
    city: "Curitiba",
    phone: "(41) 98921-2281",
    skills: ["Inglês", "Tradução Técnica", "Revisão Acadêmica", "Legendagem"]
  }
];
