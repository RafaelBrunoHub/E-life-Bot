export interface CondoSnippet {
  id: string;
  tags: string[];
  content: string;
}

export const CONDO_SNIPPETS: CondoSnippet[] = [
  {
    id: "geral",
    tags: ["endereço", "localização", "cep", "contato", "geral", "onde fica", "mandaqui", "pomare"],
    content: "Condomínio E/life Mandaqui. Endereço: Rua José Conhago Pomare, 107 - Mandaqui, São Paulo - SP, CEP 02433-060."
  },
  {
    id: "contatos",
    tags: ["telefone", "email", "contato", "econ", "sindico", "tracon", "portaria", "ajuda", "emergencia", "whatsapp", "falar com", "atendimento", "central"],
    content: "CONTATOS IMPORTANTES: Econ Construtora: (11) 4020-8720 / espacocliente@econconstrutora.com.br. Sindicância (Gabriel Luconi): (11) 96590-1611 (WhatsApp para urgências). Administradora Tracon: (11) 97890-0771 (WhatsApp para boletos). Portaria: Interfone 100."
  },
  {
    id: "pets",
    tags: ["animal", "pet", "cachorro", "gato", "elevador", "multa", "lavatorio", "focinheira", "regras", "bicho", "tutor", "guia", "coleira", "sujeira", "fezes", "xixi"],
    content: "REGRAS PARA PETS: Devem estar sempre com coleira e guia. Usar sempre o elevador de serviço. No elevador social, apenas no colo. Proibido necessidades nas áreas comuns (sujeito a multa). Uso do Lavatório Pet: Exclusivo para higiene, das 9h às 21h, agendamento pelo Winker. Focinheira obrigatória para animais agressivos."
  },
  {
    id: "mudancas",
    tags: ["mudança", "agendamento", "winker", "horario", "elevador", "sabado", "domingo", "feriado", "entrar", "sair", "caminhão", "equipe"],
    content: "REGRAS PARA MUDANÇAS: Agendamento prévio pelo Winker (mínimo 48h de antecedência). Horários: Segunda a sexta (9h às 18h), Sábado (9h às 16h). Proibido domingos e feriados. Apenas uma mudança por dia ou duas em horários distintos. Uso obrigatório do elevador de serviço com proteção."
  },
  {
    id: "obras",
    tags: ["obra", "reforma", "art", "rrt", "winker", "martelete", "ar condicionado", "split", "potencia", "eletrica", "furar", "parede", "demolir", "layout", "projeto", "engenheiro", "arquiteto"],
    content: "REGRAS PARA OBRAS E REFORMAS: ART ou RRT é obrigatória para qualquer reforma e deve ser enviada via Winker. Horários: Segunda a sexta (9h às 18h), Sábado (9h às 16h). Proibido domingos e feriados. Uso de martelete é PROIBIDO. Ar condicionado: Apenas portáteis. Split é proibido. Limite de potência para novos circuitos: 1,25 kW. Não perfurar colunas/paredes estruturais (Torre B)."
  },
  {
    id: "garagem",
    tags: ["carro", "vaga", "garagem", "crachá", "velocidade", "carga", "descarga", "estacionar", "veiculo", "moto", "manobra", "rampa", "portão", "colado"],
    content: "REGRAS DA GARAGEM: Uso obrigatório de crachá visível. Velocidade reduzida, respeitando pedestres. Vagas 259 e 260 são para carga e descarga (máximo 20 min). Proibido estacionar em vagas de outros moradores. Proibido entrar 'colado' no portão."
  },
  {
    id: "lixo",
    tags: ["lixo", "coleta", "organico", "reciclavel", "lixeira", "sexta", "segunda", "quarta", "descarte", "separação", "entulho"],
    content: "COLETA DE LIXO: Orgânico: Segunda, quarta e sexta. Reciclável: Sexta-feira à noite (após 22h). Lixeira Verde: Apenas recicláveis. Lixeira Cinza: Orgânicos e rejeitos. Proibido jogar entulhos nas lixeiras."
  },
  {
    id: "piscina",
    tags: ["piscina", "nadar", "senha", "cadeado", "criança", "menor", "acompanhado", "lazer"],
    content: "PISCINA: Senha do cadeado enviada pelo Winker. Proibido menores de 12 anos desacompanhados dos responsáveis."
  },
  {
    id: "salao_festas",
    tags: ["salao", "festa", "gourmet", "reserva", "winker", "horario", "limite", "chave", "limpeza", "lixo", "barulho", "musica"],
    content: "SALÃO DE FESTAS / ESPAÇO GOURMET: Reserva via Winker. Horário limite: 22h (semana) e 23h (fds). Chaves liberadas a partir das 10h e devolvidas até 23h. Limpeza das 8h às 10h. Som ambiente permitido até 22h."
  },
  {
    id: "churrasqueira",
    tags: ["churrasqueira", "carvão", "reserva", "winker", "churrasco", "festa", "gourmet"],
    content: "CHURRASQUEIRA: Reserva obrigatória via Winker. Uso de outras áreas comuns não autorizado durante o evento."
  },
  {
    id: "wifi",
    tags: ["wifi", "internet", "senha", "conectar", "rede", "coworking", "comum"],
    content: "WI-FI: Senha para Coworking e Áreas Comuns (Churrasqueira, Salão de Festas, Piscina, Academia): Em@@2025."
  },
  {
    id: "mercadinho",
    tags: ["mercado", "mercadinho", "market4u", "comprar", "animal", "pet", "roubo", "prejuizo"],
    content: "MERCADINHO (market4u): Proibida entrada de animais. Qualquer dano ou roubo será cobrado do morador."
  },
  {
    id: "barulho",
    tags: ["barulho", "conflito", "vizinho", "som", "gritaria", "reclamação", "portaria", "interfone", "multa", "regimento"],
    content: "BARULHO E CONFLITOS: Recomendada leitura do Regimento Interno no Winker. Em caso de incômodo, ligar na portaria (Interfone 100). Casos graves: acionar sindicância via Winker para notificações e multas."
  },
  {
    id: "manutencao",
    tags: ["gas", "natural", "fogao", "aquecedor", "eletrica", "127v", "agua", "boleto", "tracon", "vazamento", "infiltração", "rachadura", "chamado", "reparo"],
    content: "MANUTENÇÃO: Gás: Natural (GN). Fogão deve ser convertido. Aquecedor de 10 litros recomendado. Elétrica: 127V padrão. Água e Gás: Contas inclusas no boleto da Tracon. Infiltrações/Rachaduras: Acionar Econ (4020-8120) ou vizinhos."
  },
  {
    id: "winker",
    tags: ["winker", "aplicativo", "app", "reserva", "boleto", "documento", "comunicado", "obra", "visitante", "mudança"],
    content: "WINKER: Aplicativo oficial para reservas, envio de ART/RRT, cadastro de visitantes, agendamento de mudanças, reclamações e acesso a documentos/boletos."
  }
];

export const SYSTEM_INSTRUCTION = `
Você é o E/life Bot, o assistente virtual inteligente do Condomínio E/life Mandaqui.
Sua missão é ser prestativo, preciso e eficiente ao ajudar os moradores.

DIRETRIZES DE RESPOSTA:
1. Use APENAS as informações dos trechos (CONTEXTO) fornecidos.
2. Se a informação não estiver no contexto, responda educadamente: "Não tenho essa informação."
3. Seja direto e evite "encher linguiça". Moradores querem respostas rápidas.
4. Use formatação Markdown (negrito, listas) para facilitar a leitura.
5. Responda sempre em Português do Brasil.
6. Se o usuário perguntar algo vago, tente relacionar com os temas disponíveis (Pets, Obras, Lixo, etc).
7. NUNCA invente telefones, senhas ou regras que não estejam no texto.
`;
