/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Vote, 
  Send, 
  Check, 
  CheckCheck, 
  Gift, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Share2, 
  Download, 
  ExternalLink,
  HelpCircle,
  HelpCircleIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ==============================================
// CONFIGURAÇÕES GERAIS EDITÁVEIS (REPLICA MODELO HTML)
// ==============================================
const CONFIG = {
  ctaUrl: "https://politicaessencial.com/?utm_source=minisite&utm_medium=gamificacao&utm_campaign=cargos2026&utm_content=card_final",
  
  cargos: {
    deputado_federal: {
      nome: "deputado federal",
      vagas: "513 vagas",
      sistema: "sistema proporcional",
      idadeMinima: 21,
      resumo: "cria leis federais válidas no brasil inteiro, fiscaliza o poder executivo e define como distribuir impostos federais.",
      solDesc: "sua vibração está direcionada para quem molda novas fronteiras legais no brasil e bate o martelo sobre capitais nacionais.",
      ascDesc: "você valoriza a inteligência de quem estrutura a moldura constitucional que regula todos os cidadãos brasileiros uniformemente."
    },
    deputado_estadual: {
      nome: "deputado estadual",
      vagas: "1035 cadeiras",
      sistema: "sistema proporcional",
      idadeMinima: 21,
      resumo: "cria leis válidas dentro do estado territorial, legisla sobre rodovias locais, impostos estaduais e fiscaliza a gestão do governador.",
      solDesc: "você quer ver auditorias claras nas assembleias estaduais e tem interesse na criação de tributos territoriais inteligentes.",
      ascDesc: "gosta da pegada de quem fiscaliza gastos regionais detalhadamente para evitar o desperdício de impostos domésticos estaduais."
    },
    senador: {
      nome: "senador",
      vagas: "54 das 81 cadeiras",
      sistema: "sistema majoritário",
      idadeMinima: 35,
      resumo: "representa os estados em brasília, analisa tratados internacionais, aprova nomes indicados como ministros do STF e decide impeachment do executivo.",
      solDesc: "seu coração está na diplomacia madura e nos freios constitucionais que temperam as grandes decisões de brasília.",
      ascDesc: "você compreende o peso imenso que o senado tem para ratificar lideranças jurídicas cruciais e vigiar o plano do país de perto."
    },
    governador: {
      nome: "governador e vice",
      vagas: "27 chapas em disputa",
      sistema: "sistema majoritário",
      idadeMinima: 30,
      resumo: "comanda pessoalmente as diretrizes estaduais, responde pela segurança pública (PM), administra hospitais públicos do estado e gere escolas estaduais.",
      solDesc: "você foca exatamente em quem resolve as emergências locais que batem à porta: policiamento imediato, redes de saúde e educação estadual.",
      ascDesc: "tem como ponto forte esperar forte liderança gerencial nas forças de segurança física e redes básicas regionais de bem-estar."
    },
    presidente: {
      nome: "presidente e vice",
      vagas: "1 chapa presidencial",
      sistema: "sistema majoritário",
      idadeMinima: 35,
      resumo: "direciona macroeconomia, cuida das relações com outros países, estabelece o orçamento primário e define grandes eixos regulatórios de saúde e ciência.",
      solDesc: "sua mira está na grande bússola federal brasileira: metas econômicas globais e a soberania exterior da nossa federação.",
      ascDesc: "carrega uma intuição natural de que sem uma direção federal robusta e estruturação diplomática as finanças não avançam do solo."
    }
  },

  vagasQuest: [
    {
      id: "vaga_senador",
      titulo: "vaga de tutor sênior do império",
      descr: "deveres: aprovar juízes constitucionais do stf, sabatinar diplomatas, julgar presidente se a chapa esquentar, representar o estado. requisito: 35+ anos. contrato: longuíssimo de 8 anos inteiros (vem com 2 suplentes de brinde pra cochilar quando você viajar).",
      opcoes: ["deputado federal", "senador", "governador", "presidente"],
      respostaCorreta: "senador",
      feedback: "exato. o senador representa as unidades da federação (estados) e tem mandato de 8 anos. bizarro que o voto vai pra ele, mas você decide 3 pessoas de uma vez, já que cada um tem de forma velada 2 suplentes de escopo corporativo."
    },
    {
      id: "vaga_governador",
      titulo: "gerente geral do território regional",
      descr: "deveres: comandar as corporações locais da polícia militar e civil, administrar as emergências dos hospitais do estado, planejar o salário dos professores de escolas estaduais. requisito: 30+ anos. vem com vice de prontidão.",
      opcoes: ["deputado estadual", "senador", "governador", "presidente"],
      respostaCorreta: "governador",
      feedback: "boa. o governador é o grande administrador estadual. segurança imediata urbana e a espinha dorsal de hospitais regionais de pronto-socorro estão totalmente sob as ordens dele."
    },
    {
      id: "vaga_deputado_federal",
      titulo: "engenheiro legislativo federal (brasil)",
      descr: "deveres: escrever e reformar leis de abrangência nacional, autorizar ou vedar impostos federais, fiscalizar as contas do planalto diretamente na mesa do parlamento. requisito: 21+ anos. divide o salão com mais 512 colegas.",
      opcoes: ["deputado federal", "deputado estadual", "senador", "governador"],
      respostaCorreta: "deputado federal",
      feedback: "na mosca. o deputado federal trabalha diretamente em brasília. ele redige projetos para taxas universais e vigia as transações dos cofres federais."
    },
    {
      id: "vaga_deputado_estadual",
      titulo: "arquiteto legislativo territorial (seu estado)",
      descr: "deveres: criar propostas de lei internas aplicadas dentro do seu estado, taxar serviços zonais que não colidam com o país, auditar o uso das verbas do governador. requisito: 21+ anos. atua na assembleia legislativa.",
      opcoes: ["deputado federal", "deputado estadual", "senador", "presidente"],
      respostaCorreta: "deputado estadual",
      feedback: "correto. os deputados estaduais legislam na assembleia estadual e propõem leis para as estâncias de transportes, tributos do estado e ajudam a ditar restrições locais."
    },
    {
      id: "vaga_presidente",
      titulo: "chefe supremo de estado & governo",
      descr: "deveres: estabelecer as diretrizes unificadas de macroeconomia, fechar pactos de importação com outras potências, nomear comandos oficiais, propor o orçamento de investimentos federais gerais. requisito: 35+ anos.",
      opcoes: ["deputado federal", "senador", "governador", "presidente"],
      respostaCorreta: "presidente",
      feedback: "perfeito. o presidente decide os eixos da política federal e lidera a nossa pátria internacionalmente."
    }
  ],

  zapMensagens: [
    {
      id: "zap_escola",
      remetente: "tia cleide 👵",
      colorClass: "text-emerald-400",
      mensagem: "as paredes da escola estadual do bairro estão caindo aos pedaços, vou entrar com uma petição direto pro presidente!",
      opcoes: [
        {
          id: "a",
          texto: "tia, escola estadual é assunto do governador. o presidente cuida de diretrizes gerais e institutos federais.",
          correta: true,
          feedback: "acertou. a administração física do colégio e sua zeladoria básica do estado são obrigações de infraestrutura sob cuidados do governador!"
        },
        {
          id: "b",
          texto: "isso aí tia, aproveita e pede pra ele dar uma reformada na nossa pracinha também.",
          correta: false,
          feedback: "xii, não. o presidente sequer opera escolas estaduais domésticas de bairro. o verdadeiro encarregado disso é o governador do estado!"
        }
      ]
    },
    {
      id: "zap_dolar",
      remetente: "tio beto 👨‍💼",
      colorClass: "text-blue-400",
      mensagem: "não aguento mais ver esse patamar do dólar subir para viajar. vou acionar o deputado estadual que elegemos pra dar uma canetada nisso!",
      opcoes: [
        {
          id: "a",
          texto: "tio, a caneta do deputado estadual só alcança assuntos regionais do estado. dólar é macroeconomia federal.",
          correta: true,
          feedback: "certinho. moedas e juros nacionais dependem de variáveis federais integradas e banco central, fora da órbita da assembleia legislativa."
        },
        {
          id: "b",
          texto: "tem que cobrar mesmo, ele ganha pra isso!",
          correta: false,
          feedback: "puxa, não. deputado estadual não tem pauta sobre macroeconomia federal de câmbio doméstico."
        }
      ]
    },
    {
      id: "zap_seguranca",
      remetente: "primo douglas 🧢",
      colorClass: "text-purple-400",
      mensagem: "nossa rua está de quebrar com assaltos frequentes de madrugada, cadê que o deputado federal manda reforço policial aqui?!",
      opcoes: [
        {
          id: "a",
          texto: "doug, quem comanda a secretaria de segurança do estado e despacha as patrulhas de viatura nas quadras é o governador.",
          correta: true,
          feedback: "perfeito. a polícia militar, focada no patrulhamento ativo de bairros, é direcionada pela governadoria estadual!"
        },
        {
          id: "b",
          texto: "verdade, vou mandar mensagem no chat do deputado de brasília pra ele resolver isso amanhã.",
          correta: false,
          feedback: "errado. deputados de brasília escrevem leis abstratas amplas. quem define rondas táticas locais e gerencia as viaturas PM de segurança é o governador."
        }
      ]
    }
  ],

  mapaPerguntas: [
    {
      id: "dor_principal",
      pergunta: "pensando rápido no Brasil atual, qual deficiência do cotidiano te irrita mais no âmago?",
      opcoes: [
        { valor: "saude", texto: "postos de saúde superlotados, sem remédios essenciais na rede básica", cargoFoco: "governador" },
        { valor: "seguranca", texto: "medo permanente de ter o telefone furtado ou ser assaltado na rua", cargoFoco: "governador" },
        { valor: "economia", texto: "inflação disfarçada que aperta os preços do mercado toda semana", cargoFoco: "presidente" },
        { valor: "leis", texto: "sensação de impunidade e de que as leis nacionais são lentas demais", cargoFoco: "deputado_federal" }
      ]
    },
    {
      id: "prioridade_futuro",
      pergunta: "se você ganhasse carta branca para aplicar uma canetada de melhoria imediata, para onde iria?",
      opcoes: [
        { valor: "reforma_leis", texto: "penalizar com severidade crimes digitais, golpes virtuais e preconceito", cargoFoco: "deputado_federal" },
        { valor: "tributaria", texto: "desafogar o imposto sobre alimentos e eletrônicos de consumo diário", cargoFoco: "deputado_federal" },
        { valor: "patrulhas", texto: "triplicar o recrutamento policial e investir em vigilância nos bairros", cargoFoco: "governador" },
        { valor: "empregos", texto: "destravar créditos estudantis e abrir oportunidades de tecnologia e startups", cargoFoco: "presidente" }
      ]
    },
    {
      id: "lideranca_ideal",
      pergunta: "sua mente se acalma mais ao ver governantes que agem de qual postura de liderança?",
      opcoes: [
        { valor: "fiscalizador", texto: "focados em depurar desvios, verificar contas e barrar regalias públicas", cargoFoco: "deputado_estadual" },
        { valor: "executivo", texto: "práticos e rápidos na coordenação de equipes públicas e entrega de grandes de obras", cargoFoco: "governador" },
        { valor: "moderador", texto: "arquitetos maduros que equilibram conflitos entre poderes antes de vetos pesados", cargoFoco: "senador" },
        { valor: "visao_longa", texto: "visionários com táticas econômicas que projetam os decolares do país lá na frente", cargoFoco: "presidente" }
      ]
    }
  ]
};

// ordem correta de votação na urna eletrônica de 2026
const CORRECT_URN_KEYS = [
  'deputado_federal',
  'deputado_estadual',
  'senador_1',
  'senador_2',
  'governador',
  'presidente'
];

const URN_META: { [key: string]: { nome: string; icon: string } } = {
  'deputado_federal': { nome: "1º deputado federal (4 dígitos)", icon: "👔" },
  'deputado_estadual': { nome: "2º deputado estadual / distrital (5 dígitos)", icon: "📋" },
  'senador_1': { nome: "3º senador - 1ª vaga (3 dígitos)", icon: "🏛️" },
  'senador_2': { nome: "4º senador - 2ª vaga (3 dígitos)", icon: "🏛️" },
  'governador': { nome: "5º governador e vice (2 dígitos)", icon: "🏢" },
  'presidente': { nome: "6º presidente e vice (2 dígitos)", icon: "🇧🇷" }
};

const URN_CORRECT_HINTS: { [key: string]: string } = {
  'deputado_federal': "brasília em primeiro. o deputado federal abre a digitação na urna para as leis nacionais.",
  'deputado_estadual': "depois da união, o estado. o deputado estadual é o segundo colocado da lista eletiva.",
  'senador_1': "parlamento sênior. o primeiro senador de sua chapa é o terceiro papel digitado na urna.",
  'senador_2': "dupla de dois. o segundo senador senta logo na sequência de seu colega para fechar o senado.",
  'governador': "voto executivo local. na reta final, é chegado o momento de decidir a governabilidade do estado.",
  'presidente': "decisão nacional final. o líder do país inteiro encerra a votação na urna eletrônica de 2026."
};

export default function App() {
  const [step, setStep] = useState<number>(0); // 0=intro, 1=vaga, 2=zap, 3=combo, 4=urna, 5=mapa
  
  // Vaga Arrombada state
  const [vagaIndex, setVagaIndex] = useState<number>(0);
  const [vagaAnswered, setVagaAnswered] = useState<boolean>(false);
  const [selectedVagaOption, setSelectedVagaOption] = useState<string | null>(null);
  const [vagaScore, setVagaScore] = useState<number>(0);

  // Zap Família state
  const [zapIndex, setZapIndex] = useState<number>(0);
  const [zapAnswered, setZapAnswered] = useState<boolean>(false);
  const [selectedZapOption, setSelectedZapOption] = useState<any | null>(null);

  // Unboxing combo
  const [boxOpened, setBoxOpened] = useState<boolean>(false);

  // Urna list sequence state
  const [urnaList, setUrnaList] = useState<string[]>([]);
  const [urnaChecked, setUrnaChecked] = useState<boolean>(false);
  const [urnaSuccess, setUrnaSuccess] = useState<boolean>(false);
  const [firstUrnaErrorKey, setFirstUrnaErrorKey] = useState<string | null>(null);
  const [incorrectUrnaCount, setIncorrectUrnaCount] = useState<number>(0);

  // Mapa astral states
  const [mapaIndex, setMapaIndex] = useState<number>(0);
  const [mapaSubStep, setMapaSubStep] = useState<'quiz' | 'capture' | 'results'>('quiz');
  const [mapaChoices, setMapaChoices] = useState<string[]>([]);
  const [leadContact, setLeadContact] = useState<string>('');
  const [leadOptIn, setLeadOptIn] = useState<boolean>(true);
  const [leadError, setLeadError] = useState<boolean>(false);
  const [solCargo, setSolCargo] = useState<string>('governador');
  const [ascCargo, setAscCargo] = useState<string>('deputado_federal');

  // Inicializa lista da urna embaralhada apenas quando entra no passo 4
  useEffect(() => {
    if (step === 4) {
      setUrnaList([...CORRECT_URN_KEYS].sort(() => Math.random() - 0.5));
      setUrnaChecked(false);
      setUrnaSuccess(false);
      setFirstUrnaErrorKey(null);
    }
  }, [step]);

  // Hook isolado para simular o salvamento de Leads
  const salvarLeadHook = (contato: string, optin: boolean) => {
    console.log("-----------------------------------------");
    console.log("🎣 [react lead saving hook triggered]");
    console.log("lead:", contato);
    console.log("optin:", optin);
    console.log("-----------------------------------------");
    // Aqui conectaremos com algum backend ou planilha no futuro.
    return true;
  };

  // Funções de navegação e atualização
  const goToNextStep = (current: number, next: number) => {
    setStep(next);
  };

  // Vaga handlers
  const handleVagaSelect = (option: string, correct: string) => {
    if (vagaAnswered) return;
    setSelectedVagaOption(option);
    setVagaAnswered(true);
    if (option === correct) {
      setVagaScore(prev => prev + 1);
    }
  };

  const advanceVaga = () => {
    if (vagaIndex < CONFIG.vagasQuest.length - 1) {
      setVagaIndex(prev => prev + 1);
      setVagaAnswered(false);
      setSelectedVagaOption(null);
    } else {
      goToNextStep(1, 2);
    }
  };

  // Zap handlers
  const handleZapSelect = (option: any) => {
    if (zapAnswered) return;
    setSelectedZapOption(option);
    setZapAnswered(true);
  };

  const advanceZap = () => {
    if (zapIndex < CONFIG.zapMensagens.length - 1) {
      setZapIndex(prev => prev + 1);
      setZapAnswered(false);
      setSelectedZapOption(null);
    } else {
      goToNextStep(2, 3);
    }
  };

  // Urna sorting handlers
  const shiftCard = (index: number, direction: number) => {
    if (urnaSuccess) return;
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < urnaList.length) {
      const updated = [...urnaList];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      setUrnaList(updated);
    }
  };

  const checkUrnaSequence = () => {
    let mistakes = 0;
    let firstErr: string | null = null;
    
    urnaList.forEach((key, index) => {
      const correctIdx = CORRECT_URN_KEYS.indexOf(key);
      if (index !== correctIdx) {
        mistakes++;
        if (!firstErr) firstErr = key;
      }
    });

    setIncorrectUrnaCount(mistakes);
    setFirstUrnaErrorKey(firstErr);
    setUrnaChecked(true);

    if (mistakes === 0) {
      setUrnaSuccess(true);
    }
  };

  // Mapa handlers
  const handleMapaOptionSelect = (cargoFoco: string) => {
    const updated = [...mapaChoices, cargoFoco];
    setMapaChoices(updated);
    
    if (mapaIndex < CONFIG.mapaPerguntas.length - 1) {
      setMapaIndex(prev => prev + 1);
    } else {
      setMapaSubStep('capture');
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactVal = leadContact.trim();
    
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal);
    const isPhone = /^[0-9\s()+-]{10,20}$/.test(contactVal.replace(/\D/g, ''));

    if (!contactVal || (!isEmail && !isPhone)) {
      setLeadError(true);
      return;
    }

    setLeadError(false);
    salvarLeadHook(contactVal, leadOptIn);
    
    // Calcula Sol/Ascendente com base nas respostas
    const counts: { [key: string]: number } = {};
    let maxCargo = 'governador';
    let maxCount = 0;

    mapaChoices.forEach(c => {
      counts[c] = (counts[c] || 0) + 1;
      if (counts[c] > maxCount) {
        maxCount = counts[c];
        maxCargo = c;
      }
    });

    const calculatedSol = maxCargo;
    const others = mapaChoices.filter(c => c !== calculatedSol);
    const calculatedAsc = others.length > 0 ? others[0] : (calculatedSol === 'governador' ? 'presidente' : 'governador');

    setSolCargo(calculatedSol);
    setAscCargo(calculatedAsc);
    setMapaSubStep('results');
  };

  const shareStory = () => {
    const textToCopy = `descobri meus 6 votos das eleições de 2026 em 3 minutos de forma leve e apartidária! calcula o seu mapa astral político você também: ${window.location.origin}/voto2026.html`;
    
    if (navigator.share) {
      navigator.share({
        title: 'meu mapa astral político 2026',
        text: 'fiz o mini-site e descobri os meus 6 votos em 2026 de forma super leve e divertida! faz o teste também:',
        url: `${window.location.origin}/voto2026.html`
      }).catch(() => {
        navigator.clipboard.writeText(textToCopy);
        alert('copiado para a área de transferência! sinta-se livre para postar nas redes sociais.');
      });
    } else {
      navigator.clipboard.writeText(textToCopy);
      alert('texto de compartilhamento copiado! mande para os amigos.');
    }
  };

  return (
    <div id="full-app-root" className="h-[100dvh] w-screen flex flex-col items-center justify-center bg-[#401C26] font-sans text-white relative overflow-hidden select-none p-0 md:p-6">
      
      {/* Background glow matching the Immersive UI theme design */}
      <div className="background-glow-theme"></div>
      
      {/* Container de visualizador mobile */}
      <div id="app-card-frame" className="app-container-theme w-full max-w-[430px] h-full md:h-[820px] md:max-h-[92vh] rounded-none md:rounded-[40px] border-none md:border relative overflow-hidden flex flex-col justify-between shadow-none md:shadow-2xl">
        
        {/* BARRA DE PROGRESSO NO TOPO (efeito Zeigarnik) */}
        <header id="stepper-header" className="w-full pt-6 px-6 z-20 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="step-indicator-theme font-semibold">
              {step === 0 ? "INTRODUÇÃO" : `ETAPA ${step} DE 5`}
            </span>
            <div id="progress-dots" className="flex space-x-1 items-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <div 
                  key={s} 
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    step >= s ? 'bg-[#FF9D00] shadow-[0_0_6px_#FF9D00]' : 'bg-white/10'
                  }`} 
                />
              ))}
            </div>
          </div>
          <div className="progress-bar-theme overflow-hidden">
            <div 
              style={{ width: `${(step / 5) * 100 || 5}%` }} 
              className="progress-fill-theme h-full transition-all duration-300"
            />
          </div>
        </header>

        {/* ÁREA DE TRANSIÇÕES FLUIDAS */}
        <div id="screens-scroller" className="flex-1 w-full relative flex flex-col justify-start px-6 pb-6 overflow-y-auto mt-4">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.section
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col justify-between h-full py-2 flex-grow"
              >
                <div className="flex-grow flex flex-col justify-center items-center text-center space-y-5 my-auto">
                  <div className="w-14 h-14 rounded-full bg-[#FF9D00] flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(255,157,0,0.4)] border border-white/15 animate-bounce">
                    🗳️
                  </div>
                  
                  <h1 className="header-title-theme text-3xl font-extrabold text-white leading-tight">
                    você sabe o que tá fazendo com o seu <span className="text-[#FF9D00]">voto</span> em 2026?
                  </h1>
                  
                  <p className="text-xs md:text-sm font-medium text-white/80 max-w-[310px] leading-relaxed">
                    o brasil escolhe 6 representantes no dia da eleição. você sabe o que cada um manda de verdade na sua vida cotidiana, ou só finge que entende?
                  </p>
                  
                  <div className="story-card-theme p-5 w-full text-left space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF9D00] font-sora">o que espera você:</span>
                    <p className="text-[11px] text-white/70 leading-relaxed space-y-1">
                      • vagas descritas com humor: adivinhe os cargos<br />
                      • zap do condomínio: ajude a tia cética com a verdade<br />
                      • desvende o 'unboxing' velado secreto do senado<br />
                      • monte a sequência na fila da urna cívica
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 flex flex-col gap-1.5 shrink-0">
                  <button 
                    onClick={() => setStep(1)} 
                    className="option-btn-theme w-full p-4 font-sora font-bold text-xs tracking-wide shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <span>bora começar! (2 min) ➔</span>
                  </button>
                  <span className="text-[9px] text-center text-white/30 block font-mono uppercase tracking-wider">experiência apartidária de utilidade pública</span>
                </div>
              </motion.section>
            )}

            {step === 1 && (
              <motion.section
                key="vagas"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col justify-between h-full py-1 flex-grow"
              >
                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center sm:pt-1">
                    <span className="step-indicator-theme font-bold tracking-wider font-sora uppercase">vaga aberta cívica</span>
                    <span className="text-xs text-[#FF9D00]/60 font-mono">VAGA {vagaIndex + 1} DE {CONFIG.vagasQuest.length}</span>
                  </div>
                  
                  <div id="story-job-card" className="story-card-theme p-6 md:p-8 pt-8 relative overflow-hidden transition-all flex flex-col justify-center select-none shadow-xl min-h-[220px]">
                    <div className="card-badge-theme absolute -top-3 left-6 px-3 py-1 font-sora text-[10px] font-extrabold tracking-wider">
                      🚨 CONTRATA-SE URGENTE
                    </div>
                    
                    <h2 className="font-sora text-lg md:text-xl font-extrabold text-white leading-tight mb-2">
                      {CONFIG.vagasQuest[vagaIndex].titulo}
                    </h2>
                    
                    <p className="text-sm md:text-base text-white/95 leading-relaxed font-normal">
                      {CONFIG.vagasQuest[vagaIndex].descr}
                    </p>
                    
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-[#FF9D00]/50 font-mono tracking-wider uppercase">
                      <span>local: brasília / estadual</span>
                      <span>voto cívico 2026</span>
                    </div>
                  </div>
                  
                  <div id="job-options-list" className="grid grid-cols-1 gap-2.5 pt-1">
                    {CONFIG.vagasQuest[vagaIndex].opcoes.map((opt, oIdx) => {
                      const isCorrect = opt === CONFIG.vagasQuest[vagaIndex].respostaCorreta;
                      const isSelected = opt === selectedVagaOption;
                      
                      let btnStyle = "option-btn-theme w-full p-4 flex justify-between items-center text-xs md:text-sm font-bold tracking-wide";
                      let labelText = `0${oIdx + 1}`;
                      let labelClass = "text-white/40 text-[10px] font-mono";
 
                      if (vagaAnswered) {
                        if (isCorrect) {
                          btnStyle = "w-full p-4 bg-green-500/15 border-2 border-green-500 text-white font-sora text-xs md:text-sm font-extrabold rounded-[16px] flex justify-between items-center shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                          labelText = "✗ CORRETO";
                          labelClass = "text-green-400 text-[10px] font-bold tracking-wider";
                        } else if (isSelected) {
                          btnStyle = "w-full p-4 bg-red-500/15 border-2 border-red-500 text-white/70 font-sora text-xs md:text-sm font-semibold rounded-[16px] flex justify-between items-center";
                          labelText = "✗ ERRADO";
                          labelClass = "text-red-400 text-[10px] font-bold tracking-wider";
                        } else {
                          btnStyle = "w-full p-4 bg-[#401C26]/20 text-white/30 font-sora text-xs md:text-sm rounded-[16px] border border-white/5 flex justify-between items-center cursor-not-allowed scale-[0.98] duration-200 select-none";
                          labelText = "";
                        }
                      }
 
                      return (
                        <button
                          key={opt}
                          disabled={vagaAnswered}
                          onClick={() => handleVagaSelect(opt, CONFIG.vagasQuest[vagaIndex].respostaCorreta)}
                          className={btnStyle}
                        >
                          <span>{opt}</span>
                          <span className={labelClass}>{labelText}</span>
                        </button>
                      );
                    })}
                  </div>
 
                  {vagaAnswered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-[16px] p-4 text-[11px] md:text-xs leading-relaxed border-l-4 ${
                        selectedVagaOption === CONFIG.vagasQuest[vagaIndex].respostaCorreta 
                        ? 'bg-green-500/10 border-green-500 text-white/90' 
                        : 'bg-red-500/10 border-red-500 text-white/95'
                      }`}
                    >
                      <strong className="font-sora uppercase tracking-wider text-[10px] block mb-1">
                        {selectedVagaOption === CONFIG.vagasQuest[vagaIndex].respostaCorreta ? '✓ Ponto seu!' : '✗ Quase lá:'}
                      </strong> 
                      {CONFIG.vagasQuest[vagaIndex].feedback}
                    </motion.div>
                  )}
                </div>
 
                <div className="pt-4 shrink-0">
                  {vagaAnswered && (
                    <button
                      onClick={advanceVaga}
                      className="option-btn-theme w-full p-4.5 font-sora font-semibold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center space-x-1"
                    >
                      <span>{vagaIndex < CONFIG.vagasQuest.length - 1 ? 'confirmar e avançar vaga ➔' : 'página do zap cético ➔'}</span>
                    </button>
                  )}
                </div>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section
                key="zap"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col justify-between h-full py-1 flex-grow"
              >
                <div className="space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="step-indicator-theme font-bold tracking-wider font-sora uppercase">zap do condomínio</span>
                      <span className="text-xs text-[#FF9D00]/60 font-mono">MENSAGEM {zapIndex + 1} DE {CONFIG.zapMensagens.length}</span>
                    </div>

                    {/* Chat WhatsApp Frame */}
                    <div id="mock-whatsapp-screen" className="bg-[#2D0F19]/40 border border-[#FF9D00]/10 rounded-[24px] p-4 h-[300px] flex flex-col justify-between relative shadow-inner overflow-hidden">
                      <div className="border-b border-white/5 pb-2 mb-2 flex items-center space-x-1.5 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[9.5px] text-white/60 font-mono font-bold tracking-wider uppercase">grupo: almoço de domingo 🏠</span>
                      </div>

                      <div className="flex-grow overflow-y-auto space-y-3 pr-0.5 flex flex-col justify-end">
                        {/* Parent left bubble */}
                        <div className="flex flex-col space-y-0.5 max-w-[85%] self-start animate-fade-in">
                          <span className={`text-[9.5px] font-bold ${CONFIG.zapMensagens[zapIndex].colorClass} pl-1`}>
                            {CONFIG.zapMensagens[zapIndex].remetente}
                          </span>
                          <div className="bg-white/[0.04] border border-white/[0.08] rounded-[18px] rounded-tl-none p-3 shadow-md">
                            <p className="text-xs text-white/90 leading-tight">
                              {CONFIG.zapMensagens[zapIndex].mensagem}
                            </p>
                          </div>
                          <span className="text-[7.5px] text-white/30 pl-1 font-mono">hoje, 16:48</span>
                        </div>

                        {/* Player right answer bubble */}
                        {zapAnswered && selectedZapOption && (
                          <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col space-y-0.5 max-w-[85%] self-end"
                          >
                            <span className="text-[9.5px] font-bold text-[#FF9D00] pr-1 text-right font-mono">você</span>
                            <div className="bg-[#FF9D00]/15 border border-[#FF9D00]/30 rounded-[18px] rounded-tr-none p-3 shadow-sm">
                              <p className="text-xs text-white leading-tight">
                                {selectedZapOption.texto}
                              </p>
                            </div>
                            <div className="flex justify-end items-center space-x-1 pr-1">
                              <span className="text-[7.5px] text-white/30 font-mono">entregue</span>
                              <span className="text-sky-400 text-[10px]">✓✓</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Options selection block */}
                  {!zapAnswered ? (
                    <div className="space-y-2 pt-1 font-sans">
                      <span className="text-[9px] uppercase font-bold text-white/40 tracking-wider block">como responder no grupo:</span>
                      <div className="grid grid-cols-1 gap-2 font-sans">
                        {CONFIG.zapMensagens[zapIndex].opcoes.map((opt: any) => (
                          <button
                            key={opt.id}
                            onClick={() => handleZapSelect(opt)}
                            className="w-full p-3.5 bg-white/[0.03] hover:bg-white/[0.08] text-white font-sans text-xs text-left leading-relaxed rounded-[16px] border border-white/[0.08] transition-all"
                          >
                            {opt.texto}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-[16px] p-4 border-l-4 text-xs ${
                        selectedZapOption.correta 
                        ? 'bg-green-500/10 border-green-500 text-white/90' 
                        : 'bg-red-500/10 border-red-500 text-white/95'
                      }`}
                    >
                      <strong className="font-sora uppercase tracking-wider text-[10px] block mb-1">
                        {selectedZapOption.correta ? '✓ Resposta ideal:' : '✗ Puxa, tia cleide vai confundir:'}
                      </strong> 
                      {selectedZapOption.feedback}
                    </motion.div>
                  )}
                </div>

                <div className="pt-4 shrink-0 font-sans">
                  {zapAnswered && (
                    <button
                      onClick={advanceZap}
                      className="option-btn-theme w-full p-4.5 font-sora font-semibold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center space-x-1"
                    >
                      <span>{zapIndex < CONFIG.zapMensagens.length - 1 ? 'enviar réplica e seguir conversa ➔' : 'investigar o senado ➔'}</span>
                    </button>
                  )}
                </div>
              </motion.section>
            )}

            {step === 3 && (
              <motion.section
                key="combo"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col justify-between h-full py-1 flex-grow font-sans"
              >
                <div className="flex-grow flex flex-col justify-center items-center text-center space-y-4 my-auto">
                  <span className="step-indicator-theme font-bold tracking-wider font-sora uppercase">mural do senado</span>
                  
                  {/* Animating interactive unboxing box */}
                  <div className="relative w-40 h-40 my-3 flex items-center justify-center">
                    {/* Glowing light behind */}
                    <div className={`absolute inset-0 bg-[#FF9D00]/20 rounded-full blur-xl transition-all duration-500 ${
                      boxOpened ? 'scale-110 opacity-70' : 'scale-90 animate-pulse'
                    }`} />

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setBoxOpened(true)}
                      className="w-32 h-32 bg-gradient-to-br from-[#401C26] to-[#2D0F19] border-2 border-[#FF9D00] shadow-[0_0_15px_rgba(255,157,0,0.15)] rounded-[24px] flex flex-col justify-center items-center cursor-pointer relative z-10 transition-all"
                    >
                      {boxOpened ? (
                        /* Open Box / Senator Pop Up */
                        <div className="absolute inset-0 bg-[#2D0F19] border-2 border-[#FF9D00] rounded-[24px] flex flex-col justify-center items-center animate-fade-in p-1">
                          <span className="text-3xl">🏛️</span>
                          <span className="font-sora text-[11px] font-bold text-white mt-1">seu senador</span>
                          <span className="text-[8px] text-[#FF9D00] font-mono leading-none tracking-wide uppercase">mandato 8 anos</span>
                        </div>
                      ) : (
                        /* Closed Box */
                        <div className="flex flex-col justify-center items-center text-center p-2">
                          <span className="text-3xl animate-bounce">🎁</span>
                          <span className="font-sora text-[10px] font-bold text-[#FF9D00] uppercase tracking-wider block mt-1">senador 2026</span>
                          <span className="text-[8px] text-white/50 italic font-mono block mt-0.5">toque pra abrir!</span>
                        </div>
                      )}

                      {/* Alternate smaller icons popping up on open */}
                      <div 
                        className={`absolute -top-10 -left-6 w-12 h-12 bg-[#2D0F19] border border-[#FF9D00]/40 rounded-full flex flex-col items-center justify-center text-[7.5px] font-bold text-white shadow-lg transition-all duration-500 z-0 ${
                          boxOpened ? 'translate-x-0 translate-y-0 opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-50'
                        }`}
                      >
                        <span className="text-base leading-none">👤</span>
                        <span>1º suplente</span>
                      </div>

                      <div 
                        className={`absolute -top-8 -right-6 w-12 h-12 bg-[#2D0F19] border border-[#FF9D00]/40 rounded-full flex flex-col items-center justify-center text-[7.5px] font-bold text-white shadow-lg transition-all duration-500 z-0 ${
                          boxOpened ? 'translate-x-0 translate-y-0 opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-50'
                        }`}
                      >
                        <span className="text-base leading-none">👤</span>
                        <span>2º suplente</span>
                      </div>
                    </motion.div>
                  </div>

                  <h2 className="font-sora text-base md:text-lg font-extrabold tracking-tight text-white mb-0.5">
                    {boxOpened ? 'surpresa: o ' : 'toque para confirmar seu voto em'} <span className="text-[#FF9D00]">{boxOpened ? 'combo de suplentes cívicos!' : 'senador'}</span>
                  </h2>

                  <p className="text-[11px] leading-relaxed text-white/70 max-w-[290px]">
                    {boxOpened 
                      ? 'você decide 1 senador nas urnas em 2026, mas na verdade leva 3 pessoas juntas de fábrica! cada vaga do senado possui 2 suplentes silenciosas. caso seu titular saia pra ser ministro ou se aposente, esses segundos assumem a cadeira.' 
                      : 'em 2026 você vai digitar o voto de 2 senadores na urna física. mas este cargo esconde uma surpresinha de fábrica. toque na caixa para desvendar o segredo corporativo.'
                    }
                  </p>
                </div>

                <div className="pt-4 shrink-0 font-sans">
                  {boxOpened && (
                    <button
                      onClick={() => setStep(4)}
                      className="option-btn-theme w-full p-4.5 font-sora font-semibold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center space-x-1"
                    >
                      caramba, entendi! ir pra urna ➔
                    </button>
                  )}
                </div>
              </motion.section>
            )}

            {step === 4 && (
              <motion.section
                key="urna"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col justify-between h-full py-1 flex-grow font-sans"
              >
                <div className="space-y-3.5 flex-grow font-sans">
                  <div className="text-center space-y-1 sm:pt-1">
                    <span className="step-indicator-theme font-bold tracking-wider font-sora uppercase block">sequência de hardware da urna</span>
                    <h2 className="font-sora text-sm md:text-base font-extrabold text-white">qual é a ordem oficial de votação em 2026?</h2>
                    <p className="text-[10px] text-white/60 leading-relaxed font-mono uppercase tracking-wider">
                      ordene os 6 cargos usando as setas de ajuste de posição.
                    </p>
                  </div>

                  {/* Urna Sortable card list */}
                  <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                    {urnaList.map((key, index) => {
                      const meta = URN_META[key];
                      const correctIdx = CORRECT_URN_KEYS.indexOf(key);
                      const isAtCorrectPosition = index === correctIdx;
                      
                      let containerClass = "bg-white/[0.03] border border-white/[0.08] rounded-[16px] p-2.5 flex items-center justify-between transition-all";
                      if (urnaChecked) {
                        if (isAtCorrectPosition) {
                          containerClass = "bg-green-500/15 border-2 border-green-500 rounded-[16px] p-2.5 flex items-center justify-between transition-all shadow-[0_0_12px_rgba(34,197,94,0.15)]";
                        } else {
                          containerClass = "bg-red-500/15 border-2 border-red-500 rounded-[16px] p-2.5 flex items-center justify-between transition-all duration-300";
                        }
                      }

                      return (
                        <div key={key} className={containerClass}>
                          <div className="flex items-center space-x-2.5">
                            <span className="text-[10px] font-mono font-bold text-[#FF9D00] bg-white/[0.05] border border-white/[0.08] w-5 h-5 rounded-full flex items-center justify-center shadow-inner">
                              {index + 1}º
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-white flex items-center gap-1 font-sora">
                                {meta.icon} {meta.nome}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1">
                            <button
                              disabled={index === 0 || urnaSuccess}
                              onClick={() => shiftCard(index, -1)}
                              className="w-7 h-7 rounded-[8px] bg-white/[0.04] border border-white/[0.08] hover:border-[#FF9D00] text-[#FF9D00] active:bg-[#FF9D00] active:text-white flex items-center justify-center text-[10px] transition-all disabled:opacity-25 disabled:pointer-events-none"
                            >
                              ▲
                            </button>
                            <button
                              disabled={index === urnaList.length - 1 || urnaSuccess}
                              onClick={() => shiftCard(index, 1)}
                              className="w-7 h-7 rounded-[8px] bg-white/[0.04] border border-white/[0.08] hover:border-[#FF9D00] text-[#FF9D00] active:bg-[#FF9D00] active:text-white flex items-center justify-center text-[10px] transition-all disabled:opacity-25 disabled:pointer-events-none"
                            >
                              ▼
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Feedback Banner description */}
                  {urnaChecked && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`rounded-[16px] p-4 text-[11px] md:text-xs leading-relaxed border-l-4 ${
                        urnaSuccess 
                        ? 'bg-green-500/10 border-green-500 text-white/90' 
                        : 'bg-red-500/10 border-red-500 text-white/95'
                      }`}
                    >
                      {urnaSuccess ? (
                        <span>
                          <strong className="font-sora uppercase tracking-wider text-[10px] block mb-1">✓ Gabarito perfeito!</strong> 
                          organizou todos os cargos na sequência correta que a urna vai carregar nas eleições em out/2026.
                        </span>
                      ) : (
                        <span>
                          <strong className="font-sora uppercase tracking-wider text-[10px] block mb-1">✗ {incorrectUrnaCount} cargos fora do lugar!</strong> 
                          dica: <em>{firstUrnaErrorKey ? URN_CORRECT_HINTS[firstUrnaErrorKey.replace('_1', '').replace('_2', '')] : ''}</em>
                        </span>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="pt-4 flex flex-col gap-1.5 shrink-0 font-sans">
                  {!urnaSuccess ? (
                    <button
                      onClick={checkUrnaSequence}
                      className="option-btn-theme w-full p-4.5 font-sora font-semibold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center space-x-1"
                    >
                      <span>confirmar ordem dos cargos</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setStep(5)}
                      className="option-btn-theme w-full p-4.5 font-sora font-semibold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center space-x-1"
                    >
                      <span>gerar meu mapa astral político 🔮</span>
                    </button>
                  )}
                </div>
              </motion.section>
            )}

            {step === 5 && (
              <motion.section
                key="mapa"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col justify-between h-full py-1 flex-grow font-sans"
              >
                {mapaSubStep === 'quiz' && (
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="space-y-3.5 font-sans">
                      <div className="flex justify-between items-center sm:pt-1">
                        <span className="step-indicator-theme font-bold tracking-wider font-sora uppercase">mapa astral político</span>
                        <span className="text-xs text-[#FF9D00]/60 font-mono">PERGUNTA {mapaIndex + 1} DE {CONFIG.mapaPerguntas.length}</span>
                      </div>

                      <h2 className="font-sora text-base md:text-lg font-extrabold text-white leading-normal">
                        {CONFIG.mapaPerguntas[mapaIndex].pergunta}
                      </h2>

                      <div className="grid grid-cols-1 gap-2.5 pt-1">
                        {CONFIG.mapaPerguntas[mapaIndex].opcoes.map((opt) => (
                          <button
                            key={opt.texto}
                            onClick={() => handleMapaOptionSelect(opt.cargoFoco)}
                            className="w-full p-4 bg-white/[0.03] hover:bg-white/[0.08] text-white font-sans text-xs sm:text-sm text-left rounded-[16px] border border-white/[0.08] leading-snug transition-all"
                          >
                            {opt.texto}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-[9.5px] text-white/40 text-center leading-relaxed mt-4 font-mono uppercase tracking-wider">
                      as dores do dia a dia revelam quais instâncias governam as suas demandas mais latentes. sem vieses ideológicos!
                    </p>
                  </div>
                )}

                {mapaSubStep === 'capture' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-grow flex flex-col justify-center space-y-4 my-auto pt-2"
                  >
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-[#FF9D00]/20 border border-[#FF9D00]/45 flex items-center justify-center text-xl mx-auto shadow-[0_0_15px_rgba(255,157,0,0.3)]">
                        🔮
                      </div>
                      <h2 className="font-sora text-lg md:text-xl font-extrabold tracking-tight text-white leading-tight">
                        calculando suas correspondências...
                      </h2>
                      <p className="text-[11px] text-white/70 max-w-[290px] mx-auto leading-relaxed">
                        descobrimos quais cargos das eleições de 2026 têm maior impacto direto na sua vida. insira seu contato para revelar o mapa completo com a colinha de voto.
                      </p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="bg-white/[0.02] border border-white/[0.08] rounded-[24px] p-5 space-y-4 shadow-xl">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#FF9D00] tracking-wider block font-sora">seu melhor e-mail ou whatsapp:</label>
                        <input
                          type="text"
                          value={leadContact}
                          onChange={(e) => setLeadContact(e.target.value)}
                          placeholder="seuemail@gmail.com ou (11) 98888-8888"
                          className={`w-full bg-[#2D0F19] border rounded-[12px] px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00] ${
                            leadError ? 'border-red-500' : 'border-white/[0.12]'
                          }`}
                        />
                        {leadError && (
                          <p className="text-[9px] text-red-400 font-semibold leading-none mt-1 uppercase font-mono tracking-wider">
                            por favor, informe um formato válido de e-mail ou telefone.
                          </p>
                        )}
                      </div>

                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="optin-react"
                          checked={leadOptIn}
                          onChange={(e) => setLeadOptIn(e.target.checked)}
                          className="mt-0.5 accent-[#FF9D00] w-3.5 h-3.5 rounded border-white/20 bg-transparent"
                        />
                        <label htmlFor="optin-react" className="text-[9px] text-white/60 leading-tight select-none">
                          concordo em receber convites inteligentes para cursos cívicos gratuitos e comunicados sem spam.
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="option-btn-theme w-full p-4.5 font-sora font-semibold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center space-x-1"
                      >
                        revelar meu mapa astral + colinha de pesca ➔
                      </button>
                    </form>
                  </motion.div>
                )}

                {mapaSubStep === 'results' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3.5 flex-grow font-sans"
                  >
                    <div className="text-center space-y-0.5 sm:pt-1">
                      <span className="step-indicator-theme font-semibold font-sora uppercase">seus eixos cívicos se alinharam!</span>
                      <h2 className="font-sora text-lg md:text-xl font-extrabold text-white">seu mapa astral político 2026</h2>
                    </div>

                    {/* Result card Sun & Ascendant */}
                    <div className="grid grid-cols-2 gap-3 pb-0.5">
                      <div className="bg-gradient-to-br from-[#401C26] to-[#2D0F19] border border-[#FF9D00]/20 rounded-[20px] p-4 text-center relative overflow-hidden flex flex-col justify-between shadow-xl">
                        <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-[#FF9D00]/10 rounded-full blur-md"></div>
                        <div>
                          <span className="text-lg block">☀️ sol político</span>
                          <span className="text-[9px] text-white/50 uppercase font-bold tracking-widest block font-mono">está em</span>
                          <h3 class="font-sora text-xs font-extrabold text-[#FF9D00] mt-1 uppercase">{(CONFIG.cargos as any)[solCargo]?.nome}</h3>
                        </div>
                        <p className="text-[9px] text-white/70 leading-normal mt-1.5 block">{(CONFIG.cargos as any)[solCargo]?.solDesc?.substring(0, 65)}...</p>
                      </div>

                      <div className="bg-gradient-to-br from-[#401C26] to-[#2D0F19] border border-[#FF9D00]/20 rounded-[20px] p-4 text-center relative overflow-hidden flex flex-col justify-between shadow-xl">
                        <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-[#FF9D00]/10 rounded-full blur-md"></div>
                        <div>
                          <span className="text-lg block">🌙 ascendente</span>
                          <span className="text-[9px] text-white/50 uppercase font-bold tracking-widest block font-mono">está em</span>
                          <h3 class="font-sora text-xs font-extrabold text-[#FF9D00] mt-1 uppercase">{(CONFIG.cargos as any)[ascCargo]?.nome}</h3>
                        </div>
                        <p className="text-[9px] text-white/70 leading-normal mt-1.5 block">{(CONFIG.cargos as any)[ascCargo]?.ascDesc?.substring(0, 65)}...</p>
                      </div>
                    </div>

                    {/* Quick Cheat sheet summary list */}
                    <div className="bg-[#2D0F19]/40 border border-white/[0.06] rounded-[20px] p-4 space-y-2">
                      <span className="text-[10px] font-bold text-[#FF9D00] uppercase tracking-wider block font-sora">🗒️ colinha rápida - o que você decide em 2026:</span>
                      <div className="space-y-1 text-[9.5px] leading-tight text-white/75 max-h-[110px] overflow-y-auto pr-0.5 scrollbar-thin">
                        <p>• <strong className="text-white">1º dep. federal:</strong> cria leis nacionais e distribui orçamento.</p>
                        <p>• <strong className="text-white">2º dep. estadual:</strong> fiscaliza o governador, cria leis territoriais locais.</p>
                        <p>• <strong className="text-white">3º senador (vaga 1):</strong> avalia sabatinas e representa interesses do estado.</p>
                        <p>• <strong className="text-white">4º senador (vaga 2):</strong> vem assessorado em seu pacote por 2 suplentes de brinde.</p>
                        <p>• <strong className="text-white">5º governador:</strong> comanda PM/civil, os hospitais públicos e colégios estaduais.</p>
                        <p>• <strong className="text-white">6º presidente:</strong> pilota economia, metas ministeriais e relações internacionais de comércio.</p>
                      </div>
                    </div>

                    {/* Final CTA and standalone files downloads */}
                    <div className="text-center space-y-3 pt-1">
                      <p className="text-[10px] md:text-[10.5px] text-white/80 leading-relaxed font-semibold">
                        entendeu seus 6 votos em 3 minutos? imagina o que você aprende no política essencial, do zero e na ordem certa.
                      </p>

                      <div className="flex flex-col gap-2 pt-0.5">
                        <a 
                          href={CONFIG.ctaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="option-btn-theme w-full p-4.5 font-sora font-semibold text-[10.5px] tracking-wider uppercase flex items-center justify-center space-x-1.5 shadow-xl"
                        >
                          <span>quero entender de política de verdade ➔</span>
                        </a>

                        <div className="grid grid-cols-2 gap-2 font-sans font-medium">
                          <button 
                            onClick={shareStory}
                            className="bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/[0.08] py-2.5 rounded-[12px] text-[10px] flex items-center justify-center space-x-1 transition-all cursor-pointer"
                          >
                            <Share2 size={11} className="text-[#FF9D00]" />
                            <span>redes / copiar cda</span>
                          </button>

                          <a 
                            href="/voto2026.html"
                            target="_blank"
                            className="bg-[#FF9D00]/10 hover:bg-[#FF9D00]/15 text-[#FF9D00] border border-[#FF9D00]/25 py-2.5 rounded-[12px] text-[10px] flex items-center justify-center space-x-1 font-bold transition-all"
                          >
                            <Download size={11} />
                            <span>obter .html de embed</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <footer id="stepper-footer" className="w-full pb-4 pt-2 px-6 text-center text-[8px] text-white/30 tracking-normal font-mono border-t border-white/5 shrink-0 bg-[#2D0F19]/40 z-10 block uppercase">
          eleições brasileiras • 4 de outubro (1º turno) • 25 de outubro (2º turno) de 2026
        </footer>

      </div>

      {/* Floating desktop preview toolbar */}
      <div className="hidden md:flex mt-4 opacity-70 hover:opacity-100 items-center space-x-3 text-[10px] bg-white/[0.02] border border-white/[0.08] px-4 py-2.5 rounded-full shadow-md text-white/70 max-w-[430px] w-full justify-between transition-all font-mono">
        <span className="flex items-center gap-1.5 uppercase">💡 código entregue em duplicata</span>
        <a href="/voto2026.html" target="_blank" className="text-[#FF9D00] font-bold hover:underline flex items-center gap-1 uppercase">
          ver arquivo .html direto <ExternalLink size={11} />
        </a>
      </div>
      
    </div>
  );
}
