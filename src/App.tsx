import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Calculator, 
  MessageSquare, 
  PhoneCall, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  ChevronRight, 
  Info, 
  Lock, 
  Plus, 
  Star, 
  Percent, 
  Zap, 
  Menu, 
  X, 
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { SAMPLE_PROFESSIONALS, Professional } from "./data";

export default function App() {
  // Navigation / Lead Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    profession: "",
    neighborhood: "Pinheiros",
    price: ""
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Filter state for Demo/Dashboard visual search
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchNeighborhood, setSearchNeighborhood] = useState<string>("");
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});

  // Calculator state
  const [calcValue, setCalcValue] = useState<number>(1500);
  const [customInputValue, setCustomInputValue] = useState<string>("1500");

  // Chat simulator state
  const [chatStep, setChatStep] = useState<number>(0);

  // Profile Customizer Simulation state (User plays with building their real card live)
  const [simName, setSimName] = useState<string>("");
  const [simCategory, setSimCategory] = useState<string>("Tecnologia");
  const [simTitle, setSimTitle] = useState<string>("");
  const [simPrice, setSimPrice] = useState<number>(500);
  const [simNeighborhood, setSimNeighborhood] = useState<string>("");
  const [simPhone, setSimPhone] = useState<string>("");
  const [simSkills, setSimSkills] = useState<string>("");

  // FAQ states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Categories list
  const categories = ["Todos", "Tecnologia", "Design & Multimídia", "Serviços Gerais", "Aulas & Tradução"];

  // Handle calculator number input
  const handleCalcInputChange = (val: string) => {
    setCustomInputValue(val);
    const num = parseFloat(val.replace(/\D/g, ""));
    if (!isNaN(num)) {
      setCalcValue(num);
    } else {
      setCalcValue(0);
    }
  };

  // Sync calculator slider to input value
  const handleSliderChange = (val: number) => {
    setCalcValue(val);
    setCustomInputValue(val.toString());
  };

  // Calculate earnings memo
  const earnings = useMemo(() => {
    const platformFee = calcValue * 0.10;
    const netEarnings = calcValue * 0.90;
    
    // Standard platforms take an average of 20% flat commission + ~2% payout/processing costs
    const standardFee = calcValue * 0.22;
    const standardNet = calcValue * 0.78;
    const additionalSavings = netEarnings - standardNet;

    return {
      platformFee,
      netEarnings,
      standardFee,
      standardNet,
      additionalSavings
    };
  }, [calcValue]);

  // List of Chat messages to iterate through for the simulator
  const chatMessages = [
    {
      id: 1,
      sender: "client",
      name: "Mariana Souza (Cliente)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      message: "Olá! Vi seu anúncio na plataforma e adorei seu portfólio. Preciso de um serviço sob medida e gostaria de fechar contigo. Consegue me enviar a proposta por aqui?",
      time: "10:14"
    },
    {
      id: 2,
      sender: "professional",
      name: "Gustavo Rocha (Profissional)",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      message: "Olá Mariana! Claro que sim. Já analisei os detalhes que enviou. Consigo realizar tudo no prazo de 4 dias por R$ 1.500,00 fechados. O que acha?",
      time: "10:16"
    },
    {
      id: 3,
      sender: "client",
      name: "Mariana Souza (Cliente)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      message: "Excelente! Proposta aceita. O orçamento ficou perfeito e o prazo é ótimo. Acabei de aprovar o pagamento para iniciarmos com segurança!",
      time: "10:18"
    },
    {
      id: 4,
      sender: "platform",
      name: "Segurança ConectaFreela",
      avatar: "",
      message: "🎉 Projeto fechado com sucesso! Segurança ConectaFreela ativa. Ao final do projeto Mariana receberá o serviço completo, e Gustavo receberá R$ 1.350,00 líquidos. Taxa da plataforma de apenas R$ 150,00 (10%). Sem taxas de saque extras ou cobranças recorrentes!",
      time: "10:18"
    }
  ];

  // Filtering legitimate profiles
  const filteredProfessionals = useMemo(() => {
    return SAMPLE_PROFESSIONALS.filter(p => {
      const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
      const matchesNeighborhood = searchNeighborhood.trim() === "" || 
        p.neighborhood.toLowerCase().includes(searchNeighborhood.toLowerCase()) ||
        p.city.toLowerCase().includes(searchNeighborhood.toLowerCase());
      return matchesCategory && matchesNeighborhood;
    });
  }, [selectedCategory, searchNeighborhood]);

  const handleRevealPhone = (id: string) => {
    setRevealedPhones(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.profession) return;
    setLeadSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setLeadSubmitted(false);
      // Autofill the simulator with their lead data so they see their card updated live!
      setSimName(leadForm.name);
      setSimTitle(leadForm.profession);
      setSimNeighborhood(leadForm.neighborhood);
      setSimPrice(leadForm.price ? parseFloat(leadForm.price) : 500);
      setSimPhone("(11) 99341-2940");
      setSimSkills("Serviço Garantido, Atendimento Ágil, Qualificação");
      // Scroll smoothly to simulator section
      const simSec = document.getElementById("simulador-anuncio");
      if (simSec) {
        simSec.scrollIntoView({ behavior: "smooth" });
      }
    }, 1800);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLeadSubmitted(false);
  };

  const formatBRL = (num: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  };

  // FAQ MockData
  const faqs = [
    {
      q: "Como o profissional recebe o pagamento?",
      a: "O pagamento é processado com total segurança pela plataforma ConectaFreela via PIX ou Cartão de Crédito. O valor fica retido na nossa carteira segura e é liberado na conta do profissional assim que o serviço contratado for concluído."
    },
    {
      q: "O cliente também paga taxa sobre o serviço?",
      a: "Não. O cliente não paga nenhuma taxa de plataforma! Ele paga exatamente o valor orçado diretamente com o profissional autônomo, o que torna nossa plataforma a mais atrativa do mercado."
    },
    {
      q: "Como funciona a taxa de 10%?",
      a: "Temos a taxa mais transparente do Brasil. Quando o projeto é concluído e o valor é faturado, descontamos estritamente 10% fixos para cobrir custos de transação e segurança do chat/prazos. Você fica com 90% líquidos de tudo o que cobrou."
    },
    {
      q: "O site possui fidelidade ou mensalidade?",
      a: "Absolutamente nenhuma! O cadastro é 100% gratuito. Você não paga planos mensais, mensalidade de anúncios ou taxas de adesão. Se você não fechar nenhum serviço em um mês, seu custo será zero."
    },
    {
      q: "O número de telefone é exposto publicamente?",
      a: "Não. Para sua total privacidade e controle contra spams de robôs, o número de telefone só é disponibilizado para clientes com cadastro válido e telefone verificado que demonstrem interesse legítimo em contratá-lo no seu bairro."
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden antialiased">
      
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 px-4 py-3 md:py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="h-5 w-5 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight">Conecta<span className="text-emerald-400">Freela</span></span>
              <span className="block text-[9px] text-slate-500 tracking-wider uppercase font-mono leading-none">Taxa Única 10%</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#como-funciona" className="hover:text-emerald-400 transition-colors">Como Funciona</a>
            <a href="#calculadora" className="hover:text-emerald-400 transition-colors">Calculadora de Ganhos</a>
            <a href="#demonstracao" className="hover:text-emerald-400 transition-colors">Ver Painel</a>
            <a href="#simulador" className="hover:text-emerald-400 transition-colors">Criar Meu Anúncio</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">Dúvidas</a>
          </nav>

          {/* Main CTA on header */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 text-slate-200 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 text-xs md:text-sm font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer"
            >
              Entrar
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-bold text-xs md:text-sm py-2 px-4 rounded-xl shadow-lg shadow-emerald-400/10 hover:shadow-emerald-400/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Cadastrar Meu Serviço
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Value Prop Badge */}
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 animate-pulse">
          <Percent className="h-3.5 w-3.5" />
          <span>Apenas 10% de Taxa Fixa — Esqueça taxas abusivas de 20%</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.1] mb-6">
          Ofereça qualquer serviço, combine direto com o cliente e fique com <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">90% do seu lucro</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light">
          Anuncie seus serviços como autônomo. Negocie valores, prazos e detalhes sem intermediários. Custa zero começar e pague <strong className="text-white font-semibold">apenas uma taxa única de 10%</strong> por projeto fechado com sucesso!
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-extrabold text-base py-4 px-8 rounded-2xl shadow-xl shadow-emerald-400/15 duration-200 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Começar Agora Grátis
            <ArrowRight className="h-5 w-5" />
          </button>
          <a
            href="#calculadora"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-base py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Calculator className="h-5 w-5 text-emerald-400" />
            Calcular Meus Ganhos
          </a>
        </div>

        {/* Trust proofs / stats bars */}
        <div className="mt-16 pt-8 border-t border-slate-900 w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-5xl">
          <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-900">
            <div className="text-2xl md:text-3xl font-extrabold text-white">90% Líquido</div>
            <div className="text-xs text-slate-500 mt-1 font-medium select-none">Você no controle total do seu ganho</div>
          </div>
          <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-900">
            <div className="text-2xl md:text-3xl font-extrabold text-white">Sem Mensalidade</div>
            <div className="text-xs text-slate-500 mt-1 font-medium select-none">Só pague quando fechar projetos</div>
          </div>
          <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-900">
            <div className="text-2xl md:text-3xl font-extrabold text-white">Chat Seguro</div>
            <div className="text-xs text-slate-500 mt-1 font-medium select-none">Negociação protegida ponta-a-ponta</div>
          </div>
          <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-900">
            <div className="text-2xl md:text-3xl font-extrabold text-white">Contato Direto</div>
            <div className="text-xs text-slate-500 mt-1 font-medium select-none">Feche parcerias de longo prazo</div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 bg-slate-900/30 border-t border-b border-rose-950/0 border-slate-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Sem burocracia ou letras miúdas. Veja como funciona:
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-light">
              Desenhamos o fluxo mais simples e transparente possível tanto para quem busca quanto para quem presta serviços legítimos de qualquer área de atuação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative p-6 bg-slate-900/60 rounded-3xl border border-slate-850/80 hover:border-emerald-500/20 transition-all duration-300">
              <div className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-600">01</div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cadastre seus Serviços</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Crie seu portfólio de forma rápida, defina suas especialidades, bairros onde atende e determine seus preços aproximados. É 100% grátis.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 bg-slate-900/60 rounded-3xl border border-slate-850/80 hover:border-emerald-500/20 transition-all duration-300">
              <div className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-600">02</div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Negocie à sua Maneira</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Receba chamados de clientes interessados no seu bairro. Converse através do chat interno ou ligue diretamente para alinhar as expectativas do cliente.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 bg-slate-900/60 rounded-3xl border border-slate-850/80 hover:border-emerald-500/20 transition-all duration-300">
              <div className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-600">03</div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Segurança Garantida</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                O pagamento do orçamento acordado fica seguro na plataforma enquanto você realiza o trabalho. Fique protegido contra calotes de forma definitiva.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 bg-slate-900/60 rounded-3xl border border-slate-850/80 hover:border-emerald-500/20 transition-all duration-300">
              <div className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-600">04</div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-slate-950 flex items-center justify-center font-bold mb-6">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Receba 90% Líquido</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Após terminar o serviço, o valor total é liberado direto no seu PIX cadastrado, descontado apenas os 10% fixos de taxa da plataforma. Sem taxas de retirada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora de Ganhos Interativa */}
      <section id="calculadora" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Col 1: Text Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1 bg-emerald-400/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
              <Calculator className="h-3 w-3" />
              Simulador Financeiro
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Faça as contas: quanto você economiza hoje?
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
              Plataformas tradicionais cobram comissões de até 20%, além de taxas para saque, taxas de processamento de cartão e até mensalidades ocultas de assinatura.
            </p>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
              No <span className="text-emerald-400 font-semibold">ConectaFreela</span> você sabe exatamente quanto vai receber no bolso. Use o painel ao lado e compare em tempo real.
            </p>

            {/* Guarantee Box */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-850 flex items-start gap-3">
              <Info className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-sm font-semibold text-white">Nenhum custo oculto na conta</span>
                <span className="block text-xs text-slate-500 mt-1">Nossa taxa única de 10% cobre todo o processamento financeiro, emissão de chaves PIX e segurança jurídica da transação.</span>
              </div>
            </div>
          </div>

          {/* Col 2: The Interactive Tool Container */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-[2.5rem] border border-slate-850 p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Soft decorative background green blur */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-8">
              {/* Value Input */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <label className="text-sm font-semibold text-slate-300">Qual o valor do seu serviço?</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Digite o valor (R$):</span>
                    <input 
                      type="text" 
                      value={customInputValue}
                      onChange={(e) => handleCalcInputChange(e.target.value)}
                      className="bg-slate-950 border border-slate-800 focus:border-emerald-400 text-right px-3 py-1 text-sm font-bold text-white rounded-lg w-28 font-mono outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Slider */}
                <input 
                  type="range"
                  min="200"
                  max="10000"
                  step="50"
                  value={calcValue}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-hidden"
                />
                
                {/* Min-Max Labels */}
                <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                  <span>R$ 200</span>
                  <span>R$ 5.000</span>
                  <span>R$ 10.000</span>
                </div>
              </div>

              {/* Outputs grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* ConectaFreela Net Card */}
                <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/20 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide font-mono">Na Nossa Plataforma</span>
                    <div className="bg-emerald-400 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-sm">10% FIXO</div>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs">Você recebe:</span>
                    <span className="block text-2xl md:text-3xl font-black text-white font-mono mt-1">
                      {formatBRL(earnings.netEarnings)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 border-t border-emerald-500/10 pt-2 flex justify-between">
                    <span>Taxa cobrada (10%)</span>
                    <span className="font-mono text-emerald-400 font-semibold">-{formatBRL(earnings.platformFee)}</span>
                  </div>
                </div>

                {/* Competitors Net Card */}
                <div className="bg-slate-950 rounded-2xl border border-slate-850 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide font-mono">Outras Plataformas</span>
                    <span className="text-[10px] text-red-400 bg-red-400/10 font-medium px-2 py-0.5 rounded-sm">MÉDIA ~22%</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs">Você recebe:</span>
                    <span className="block text-2xl md:text-2xl font-black text-slate-500 font-mono mt-1">
                      {formatBRL(earnings.standardNet)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 border-t border-slate-900 pt-2 flex justify-between">
                    <span>Taxas médias cobradas</span>
                    <span className="font-mono text-red-400">-{formatBRL(earnings.standardFee)}</span>
                  </div>
                </div>

              </div>

              {/* Big Savings glowing banner */}
              <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div className="text-center md:text-left">
                    <span className="block text-xs text-slate-500">Sua economia extra de lucro:</span>
                    <span className="block text-sm font-bold text-white">Mais dinheiro diretamente na sua carteira</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <span className="block text-sm text-slate-400">Lucro Extra de:</span>
                  <span className="inline-block text-xl md:text-2xl font-black text-amber-400 font-mono">
                    +{formatBRL(earnings.additionalSavings)}
                  </span>
                </div>
              </div>

              {/* Call to action inside calc */}
              <div className="text-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-black tracking-tight text-sm py-3.5 px-8 rounded-xl active:scale-95 transition-all w-full cursor-pointer shadow-lg shadow-emerald-400/5"
                >
                  Quero Cadastrar Meu Serviço Com Taxa Fina de 10%
                </button>
                <span className="block text-[10px] text-slate-500 mt-2">Sem custo de cadastro. Sem necessidade de cartão de crédito.</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Demonstração do Painel / Funcionalidades */}
      <section id="demonstracao" className="py-20 bg-slate-900/20 border-t border-b border-slate-900 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase">Experiência do Painel</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-4 mb-4">
              Explore as funcionalidades exclusivas da plataforma
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-light">
              Nossa interface foi projetada especificamente para conversão. Simplificamos as barreiras entre clientes qualificados e profissionais competentes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* LADO ESQUERDO: Chat Seguro e Telefone Controlado (Simulação Visual) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8 h-full">
              
              {/* Card 1: Chat Interno Simulado */}
              <div className="bg-slate-900/60 rounded-3xl border border-slate-850 p-6 flex flex-col justify-between relative overflow-hidden flex-1 min-h-[420px]">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <span className="block text-sm font-bold text-white">Chat Seguro Integrado</span>
                        <span className="block text-xs text-slate-500">Simule uma proposta com segurança</span>
                      </div>
                    </div>
                    {/* Direct reset indicator */}
                    <button 
                      onClick={() => setChatStep(0)}
                      className="text-[10px] text-slate-500 hover:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Reiniciar Simulação
                    </button>
                  </div>

                  {/* Bubble Space */}
                  <div className="space-y-4 my-2">
                    <AnimatePresence mode="popLayout">
                      {chatMessages.slice(0, chatStep + 1).map((msg, idx) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-start gap-3 ${msg.sender === "professional" ? "flex-row-reverse" : ""}`}
                        >
                          {msg.sender !== "platform" ? (
                            <img 
                              src={msg.avatar} 
                              alt={msg.name}
                              referrerPolicy="no-referrer"
                              className="w-8 h-8 rounded-full border border-slate-800 object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                              <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                            </div>
                          )}

                          <div className="space-y-1 max-w-[80%]">
                            <div className={`flex items-center gap-2 ${msg.sender === "professional" ? "justify-end" : ""}`}>
                              <span className="text-[11px] font-bold text-slate-400">{msg.name}</span>
                              <span className="text-[9px] text-slate-600 font-mono">{msg.time}</span>
                            </div>
                            
                            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                              msg.sender === "platform" 
                              ? "bg-slate-950 border border-emerald-500/30 text-emerald-300"
                              : msg.sender === "professional"
                              ? "bg-indigo-600 text-white rounded-tr-none"
                              : "bg-slate-950 border border-slate-800 text-slate-300 rounded-tl-none"
                            }`}>
                              {msg.message}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Control Action for simulation */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <span className="text-xs text-slate-500 font-mono">
                      Etapa {chatStep + 1} de {chatMessages.length}
                    </span>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    {chatStep < chatMessages.length - 1 ? (
                      <button
                        onClick={() => setChatStep(prev => prev + 1)}
                        className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs py-2 px-4 rounded-xl active:scale-95 transition-all flex items-center gap-1 w-full justify-center md:w-auto cursor-pointer"
                      >
                        Avançar Mensagem
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setChatStep(0)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-2 px-4 rounded-xl active:scale-95 transition-all w-full justify-center md:w-auto cursor-pointer"
                      >
                        Resetar Simulador
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Telefone Inteligente e Seguro */}
              <div className="bg-slate-900/60 rounded-3xl border border-slate-850 p-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                      <PhoneCall className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        Exibição Segura de Telefone
                        <span className="text-[9px] bg-teal-400/15 text-teal-300 px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono">Anti-Spam</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-md font-light">
                        Chega de ligações indesejadas de robôs ou telemarketing. Seu número só é exibido aos seus clientes pós-verificação de segurança.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center bg-slate-950 p-4 rounded-2xl border border-slate-850 w-full sm:w-48 text-center shrink-0">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-semibold">Anúncio da Ana</span>
                    <span className="block text-xs font-mono text-slate-400 mt-1.5 home-p">
                      {revealedPhones["ana"] ? "(11) 98711-2091" : "(11) 987••-••••"}
                    </span>
                    <button
                      onClick={() => handleRevealPhone("ana")}
                      className={`mt-3 w-full text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${
                        revealedPhones["ana"] 
                        ? "bg-slate-800 hover:bg-slate-755 text-slate-300"
                        : "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                      }`}
                    >
                      {revealedPhones["ana"] ? "Ocultar Telefone" : "Mostrar Telefone"}
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* LADO DIREITO: Filtro de Bairro & Busca de Profissionais */}
            <div className="lg:col-span-5 bg-slate-900/60 rounded-3xl border border-slate-850 p-6 flex flex-col h-full justify-between">
              
              <div className="space-y-6">
                <div className="border-b border-slate-800/80 pb-4">
                  <span className="block text-sm font-bold text-white">Demonstração: Filtro de Região e Área</span>
                  <span className="block text-xs text-slate-500 mt-1">Veja seus clientes filtrando serviços no seu bairro em tempo real!</span>
                </div>

                {/* Simulated filters on client UI */}
                <div className="space-y-4">
                  {/* Category Buttons list */}
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold mb-2">Categoria de Serviço:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                            selectedCategory === cat
                            ? "bg-emerald-400 text-slate-950 font-bold"
                            : "bg-slate-950 text-slate-400 border border-slate-850 hover:border-slate-800 hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Neighborhood Input filter */}
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold mb-2">Filtrar por Bairro ou Cidade:</span>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                      <input 
                        type="text" 
                        placeholder="Ex: Pinheiros, Copacabana, Savassi..."
                        value={searchNeighborhood}
                        onChange={(e) => setSearchNeighborhood(e.target.value)}
                        className="bg-slate-950 border border-slate-800 focus:border-emerald-400 pl-10 pr-4 py-2.5 text-xs text-slate-200 rounded-xl w-full outline-hidden transition-all placeholder:text-slate-600"
                      />
                      {searchNeighborhood && (
                        <button 
                          onClick={() => setSearchNeighborhood("")}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Results Listing Area */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  <span className="block text-[11px] text-slate-500 font-mono uppercase tracking-widest">Profissionais Encontrados ({filteredProfessionals.length})</span>
                  
                  {filteredProfessionals.length > 0 ? (
                    filteredProfessionals.map((prof) => (
                      <div 
                        key={prof.id} 
                        className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3 hover:border-slate-800 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <img 
                            src={prof.avatar} 
                            alt={prof.name} 
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-slate-800"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="block text-xs font-bold text-white truncate">{prof.name}</span>
                              <div className="flex items-center gap-0.5 text-teal-400 text-xs font-bold leading-none">
                                <Star className="h-3 w-3 fill-teal-400" />
                                <span>{prof.rating.toFixed(1)}</span>
                              </div>
                            </div>
                            <span className="block text-[11px] text-slate-400 mt-0.5 truncate">{prof.title}</span>
                          </div>
                        </div>

                        {/* Middle metadata block */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 bg-slate-900/40 px-2 py-1.5 rounded-lg">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-emerald-400 text-[10px]" />
                            {prof.neighborhood}, {prof.city}
                          </span>
                          <span className="font-semibold text-slate-300">
                            Orçamento Médio: <strong className="text-white font-mono">{formatBRL(prof.basePrice)}</strong>
                          </span>
                        </div>

                        {/* Interactive direct actions on demonstration cards */}
                        <div className="flex gap-2 text-[11px] pt-1">
                          <button
                            onClick={() => handleRevealPhone(prof.id)}
                            className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold py-1.5 rounded-lg text-center transition-all cursor-pointer"
                          >
                            {revealedPhones[prof.id] ? prof.phone : "📞 Ver Telefone"}
                          </button>
                          <button
                            onClick={() => {
                              // Simulate typing details automatically
                              setChatStep(0);
                              const chatSec = document.getElementById("demonstracao");
                              if (chatSec) {
                                chatSec.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                            className="flex-1 bg-emerald-400 text-slate-950 font-bold py-1.5 rounded-lg text-center hover:bg-emerald-300 transition-all cursor-pointer"
                          >
                            💬 Chamar Chat
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-slate-950/60 rounded-2xl border border-dashed border-slate-850 py-8 text-center text-xs text-slate-500">
                      Nenhum profissional encontrado para este bairro ou categoria. Tente apagar os termos ou selecionar outra categoria.
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom converter anchor */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
                <span className="block text-xs text-slate-400 mb-2">Quer aparecer nesta lista para clientes de Pinheiros ou Copacabana?</span>
                <a 
                  href="#simulador"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                >
                  Criar demonstração do meu anúncio grátis
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Interactive Profile Simulator: "Crie Seu Anúncio Live de Teste" */}
      <section id="simulador" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-10">
        <div id="simulador-anuncio" className="bg-gradient-to-br from-slate-900 to-indigo-950/20 rounded-[3rem] border border-slate-850 p-6 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Form Left */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1 bg-indigo-400/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
                <Sparkles className="h-3 w-3" />
                Faça um Teste Rápido
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                Crie a simulação do seu anúncio agora mesmo
              </h2>
              <p className="text-slate-450 text-sm md:text-base font-light leading-relaxed">
                Digite suas informações básicas ao lado. Veja instantaneamente como seu perfil de profissional autônomo se apresentará para milhares de clientes na nossa plataforma de autônomos.
              </p>

              {/* Input Fields block */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 font-mono">Seu Nome Comercial</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Carlos M. Marcenaria Avançada" 
                    value={simName}
                    onChange={(e) => setSimName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 focus:border-indigo-400 pl-4 pr-4 py-3 text-sm text-slate-200 rounded-xl w-full outline-hidden transition-all placeholder:text-slate-750"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 font-mono">Preço Estimado (R$)</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 400" 
                      value={simPrice || ""}
                      onChange={(e) => setSimPrice(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-400 pl-4 pr-4 py-3 text-sm text-white font-mono rounded-xl w-full outline-hidden transition-all placeholder:text-slate-755"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 font-mono">Seu Bairro / Cidade</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Pinheiros / SP" 
                      value={simNeighborhood}
                      onChange={(e) => setSimNeighborhood(e.target.value)}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-400 pl-4 pr-4 py-3 text-sm text-slate-200 rounded-xl w-full outline-hidden transition-all placeholder:text-slate-750"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 font-mono">Especialidade Principal</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Eletricista de Emergência" 
                      value={simTitle}
                      onChange={(e) => setSimTitle(e.target.value)}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-400 pl-4 pr-4 py-3 text-sm text-slate-200 rounded-xl w-full outline-hidden transition-all placeholder:text-slate-750"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 font-mono">Categoria</label>
                    <select
                      value={simCategory}
                      onChange={(e) => setSimCategory(e.target.value)}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-400 pl-4 pr-4 py-3 text-sm text-slate-400 rounded-xl w-full outline-hidden cursor-pointer transition-all"
                    >
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Design & Multimídia">Design & Multimídia</option>
                      <option value="Serviços Gerais">Serviços Gerais</option>
                      <option value="Aulas & Tradução">Aulas & Tradução</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 font-mono">Suas Habilidades (Tags separadas por vírgula)</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Instalações, Iluminação LED, Manutenção" 
                    value={simSkills}
                    onChange={(e) => setSimSkills(e.target.value)}
                    className="bg-slate-950 border border-slate-800 focus:border-indigo-400 pl-4 pr-4 py-3 text-sm text-slate-200 rounded-xl w-full outline-hidden transition-all placeholder:text-slate-750"
                  />
                </div>

              </div>

            </div>

            {/* Simulated Live Preview Card Right */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="w-full max-w-lg bg-slate-950 rounded-3xl p-6 md:p-8 border-2 border-dashed border-indigo-500/30 relative">
                
                {/* Live Preview badge */}
                <div className="absolute -top-3 left-6 bg-indigo-600 text-white font-bold text-[10px] tracking-wider font-mono uppercase px-3 py-1 rounded-sm shadow-md">
                  Visualização em Tempo Real (Simulador)
                </div>

                {/* Profile Card Mock */}
                <div className="space-y-6">
                  {/* Top user header */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-lg select-none">
                      {simName ? simName.charAt(0).toUpperCase() : "P"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-white leading-none">
                          {simName || "Seu Nome ou Razão Social"}
                        </h4>
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-mono">
                          90% Líquido
                        </span>
                      </div>
                      <span className="block text-slate-400 text-xs mt-1.5">
                        {simTitle || "Sua profissão ou especialidade..."}
                      </span>
                    </div>
                  </div>

                  {/* Skills tags list */}
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium mb-1.5">Competências Cadastradas</span>
                    <div className="flex flex-wrap gap-1.5">
                      {simSkills ? simSkills.split(",").map((sk, idx) => (
                        <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded-full font-medium">
                          {sk.trim()}
                        </span>
                      )) : (
                        <>
                          <span className="bg-slate-900 border border-slate-800 text-slate-500 text-[10px] px-2.5 py-1 rounded-full font-medium">Habilidade 1</span>
                          <span className="bg-slate-900 border border-slate-800 text-slate-500 text-[10px] px-2.5 py-1 rounded-full font-medium">Habilidade 2</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Location rows */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-900/80">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Área de Atendimento</span>
                      <span className="block text-xs font-semibold text-white mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-400" />
                        {simNeighborhood || "Seu Bairro, Cidade"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Orçamento Esperado</span>
                      <span className="block text-xs font-semibold text-white mt-1">
                        A partir de <strong className="text-emerald-400 font-mono text-sm">{formatBRL(simPrice || 0)}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Payout Breakdown Preview */}
                  <div className="bg-slate-900/90 border border-slate-850 p-3.5 rounded-xl space-y-2">
                    <span className="block text-[10px] text-indigo-400 font-bold font-mono uppercase tracking-wider">Como funciona no projeto:</span>
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                      <span>Seu orçamento fechado de:</span>
                      <span className="font-mono font-semibold text-white">{formatBRL(simPrice || 0)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 flex items-center gap-1">
                        Taxa Única ConectaFreela (10%):
                      </span>
                      <span className="font-mono text-red-400 font-medium">-{formatBRL((simPrice || 0) * 0.1)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80 select-none">
                      <span className="font-bold text-white">Você recebe líquido direto no PIX:</span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">{formatBRL((simPrice || 0) * 0.9)}</span>
                    </div>
                  </div>

                  {/* Direct Negotiation buttons */}
                  <div className="flex gap-3 text-xs">
                    <button className="flex-1 bg-slate-900 border border-slate-800 text-slate-400 py-3 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-1.5">
                      <PhoneCall className="h-3.5 w-3.5 text-slate-500" />
                      Telefone Controlado
                    </button>
                    <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold cursor-not-allowed">
                      Iniciar Chat Seguro
                    </button>
                  </div>

                </div>

              </div>

              {/* conversion helper button */}
              <button
                onClick={() => {
                  // Autofill modal lead
                  setLeadForm(prev => ({
                    ...prev,
                    name: simName,
                    profession: simTitle,
                    neighborhood: simNeighborhood,
                    price: simPrice.toString()
                  }));
                  setIsModalOpen(true);
                }}
                className="mt-8 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm py-3.5 px-8 rounded-2xl shadow-xl shadow-emerald-400/5 duration-150 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
              >
                Ativar Meu Cadastro Oficial
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Safety & Compliance Section / Trust elements */}
      <section className="py-16 bg-slate-950 border-t border-slate-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-900/60 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Segurança na Transação</h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed font-light">
                  Seus fundos e negociações estão cobertos sob os termos mais rígidos de segurança. Protegemos ambas as pontas contra fraudes.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-900/60 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm font-sans">Sem Custos de Assinatura</h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed font-light">
                  Apenas 10% cobrados na transação finalizada. Nada de cobranças recorrentes surpresas na sua fatura do cartão.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-900/60 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Controle de Spams</h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed font-light">
                  Privacidade total ao anunciar. Protegemos seus telefones e emails contra rastreadores web agressores e listas robóticas.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-20 bg-slate-900/30 border-t border-slate-900 px-4 scroll-mt-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Perguntas Frequentes
            </h2>
            <p className="text-slate-400 text-sm mt-3 font-light">
              Ficou com dúvidas sobre o funcionamento, as diretrizes de taxas ou a simulação? Alinhamos as respostas rápidas para você.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-900/50 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-bold text-white text-sm md:text-base hover:bg-slate-900/80 transition-all cursor-pointer select-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-emerald-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-6 md:px-6 md:pb-6 text-xs md:text-sm text-slate-400 leading-relaxed font-light border-t border-slate-850 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Logo Brand grid */}
          <div className="space-y-4 md:col-span-1.5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Zap className="h-4 w-4 text-slate-950 fill-slate-950" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">Conecta<span className="text-emerald-400">Freela</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
              A mais inovadora plataforma de conexão direta entre profissionais e clientes do Brasil. Desenhada para gerar conversão com o máximo de privacidade e o menor custo do mercado autônomo.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-mono">Plataforma</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li><a href="#como-funciona" className="hover:text-emerald-400 transition-colors">Como Funciona</a></li>
              <li><a href="#calculadora" className="hover:text-emerald-400 transition-colors">Calculadora de Ganhos</a></li>
              <li><a href="#demonstracao" className="hover:text-emerald-400 transition-colors">Painel Interativo</a></li>
              <li><a href="#simulador" className="hover:text-emerald-405 transition-colors">Simulador de Perfil</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-mono font-sans text-left">Institucional</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light text-left">
              <li><span className="hover:text-emerald-400 cursor-pointer transition-colors block">Termos de Uso</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer transition-colors block">Políticas de Privacidade</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer transition-colors block">Código de Conduta Ética</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer transition-colors block">Canal de Ajuda e Suporte</span></li>
            </ul>
          </div>

          {/* Trust badges footer link */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-mono">Segurança e Ética</h4>
            <div className="flex items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-850">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <div className="leading-none">
                <span className="block text-[10px] font-bold text-white uppercase tracking-wide">Dados Protegidos</span>
                <span className="block text-[9px] text-slate-500 mt-1">Legitimidade profissional total</span>
              </div>
            </div>
            <span className="block text-[11px] text-slate-550 leading-relaxed">
              *A simulação é baseada em termos profissionais idôneos de prestação de serviços legítimos de acordo com as diretrizes de termos de uso vigentes.
            </span>
          </div>

        </div>

        {/* Outer bottom copyright container */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <span>© 2026 ConectaFreela Plataforma de Autônomos Ltda. CNPJ 00.000.000/0001-00.</span>
            <span className="block sm:inline sm:ml-2">Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">Parcerias Idôneas</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-600">Suporte 24/7</span>
          </div>
        </div>
      </footer>

      {/* LEAD CONVERSION DIALOG MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl z-10 overflow-hidden"
            >
              {/* Glowing header lines */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-indigo-600" />
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {!leadSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 justify-center md:justify-start">
                      Fazer Meu Cadastro Grátis
                      <span className="text-xs bg-emerald-400/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm">Taxa 10%</span>
                    </h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                      Junte-se à maior comunidade de profissionais autônomos que cobram justo e conversam diretamente sem fricção técnica.
                    </p>
                  </div>

                  {/* Input stack */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 font-mono">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Carlos M. Mendes" 
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                        className="bg-slate-950 border border-slate-800 focus:border-emerald-400 pl-4 py-2.5 text-sm text-slate-200 rounded-xl w-full outline-hidden transition-all placeholder:text-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 font-mono">E-mail Corporativo</label>
                      <input 
                        type="email" 
                        required
                        placeholder="carlos@seudominio.com" 
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                        className="bg-slate-950 border border-slate-800 focus:border-emerald-400 pl-4 py-2.5 text-sm text-slate-200 rounded-xl w-full outline-hidden transition-all placeholder:text-slate-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 font-mono font-sans text-left">Especialidade / Serviço</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Marceneiro Premium" 
                          value={leadForm.profession}
                          onChange={(e) => setLeadForm({...leadForm, profession: e.target.value})}
                          className="bg-slate-950 border border-slate-800 focus:border-emerald-400 pl-4 py-2.5 text-sm text-slate-200 rounded-xl w-full outline-hidden transition-all placeholder:text-slate-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 font-mono font-sans text-left">Bairro de Atuação</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Pinheiros" 
                          value={leadForm.neighborhood}
                          onChange={(e) => setLeadForm({...leadForm, neighborhood: e.target.value})}
                          className="bg-slate-950 border border-slate-800 focus:border-emerald-400 pl-4 py-2.5 text-sm text-slate-200 rounded-xl w-full outline-hidden transition-all placeholder:text-slate-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 font-mono">Preço Base do Portfólio (Opcional - R$)</label>
                      <input 
                        type="number" 
                        placeholder="Ex: 500" 
                        value={leadForm.price}
                        onChange={(e) => setLeadForm({...leadForm, price: e.target.value})}
                        className="bg-slate-950 border border-slate-800 focus:border-emerald-400 pl-4 py-2.5 text-sm text-white font-mono rounded-xl w-full outline-hidden transition-all placeholder:text-slate-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-extrabold text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-emerald-400/10 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Confirmar Envio e Ver meu Perfil
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="text-[10px] text-slate-500 text-center leading-relaxed">
                    🔒 Seus dados estão 100% seguros de acordo com a LGPD. Não enviamos spam ou materiais de publicidade indesejados. O cadastro de serviços cumpre as normas brasileiras idôneas aplicáveis.
                  </div>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                    <CheckCircle2 className="h-10 w-10 animate-scale-up" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inscrição Enviada com Sucesso!</h3>
                  <p className="text-slate-400 text-sm max-w-sm font-light">
                    Sensacional! Seus dados foram validados de forma segura pelo nosso sistema. 
                    Redirecionando você para o <strong className="text-white font-semibold">Simulador de Perfil</strong> onde carregamos as suas informações diretamente no seu card de teste!
                  </p>
                  <div className="w-16 h-1.5 bg-slate-950 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-emerald-400 rounded-full animate-[loading-bar_1.6s_ease-out_forwards]" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
