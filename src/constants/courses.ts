/**
 * Lista oficial de cursos de pós-graduação do Grupo Integrado por área.
 */
export type Course = {
  nome: string;
  area:
    | "Direito"
    | "Educação"
    | "Engenharia"
    | "Gestão e RH"
    | "Saúde"
    | "Tecnologia"
    | "Outras áreas";
};

export const courses: Course[] = [
  // Direito
  { nome: "Direito Trabalhista e Previdenciário", area: "Direito" },
  { nome: "Direito Penal e Processual Penal", area: "Direito" },
  { nome: "Direito Civil e Processual Civil", area: "Direito" },
  { nome: "Direito Notarial e Registral", area: "Direito" },

  // Educação
  { nome: "Docência na Educação Superior", area: "Educação" },
  { nome: "Pedagogia: Abordagens de Desenvolvimento e Aprendizagem", area: "Educação" },
  { nome: "Psicopedagogia", area: "Educação" },
  { nome: "Práticas Inovadoras na Educação", area: "Educação" },
  { nome: "Docência na Educação Superior em Saúde", area: "Educação" },
  { nome: "Educação Infantil", area: "Educação" },
  { nome: "Educação Especial Inclusiva", area: "Educação" },

  // Engenharia
  { nome: "Engenharia de Estruturas e Fundações", area: "Engenharia" },
  { nome: "Engenharia e Gestão da Produção", area: "Engenharia" },
  { nome: "Engenharia de Automação e Elétrica Industrial", area: "Engenharia" },

  // Gestão e RH
  { nome: "MBA em Gestão de Pessoas", area: "Gestão e RH" },
  { nome: "MBA em Controladoria", area: "Gestão e RH" },
  { nome: "MBA em Coaching Aplicado à Gestão de Pessoas", area: "Gestão e RH" },
  { nome: "MBA em Logística e Gestão da Cadeia de Suprimentos", area: "Gestão e RH" },
  { nome: "MBA em Gestão Estratégica de Marketing e Vendas", area: "Gestão e RH" },
  { nome: "MBA em Gestão de Marketing", area: "Gestão e RH" },
  { nome: "MBA em Gestão de Projetos e Metodologias Ágeis", area: "Gestão e RH" },
  { nome: "MBA Agro360: Gestão, Inovação e Estratégia", area: "Gestão e RH" },
  { nome: "MBA em Gestão Contábil e Finanças Empresariais", area: "Gestão e RH" },
  { nome: "MBA em Gestão Financeira", area: "Gestão e RH" },
  { nome: "MBA em Gestão Comercial", area: "Gestão e RH" },
  { nome: "MBA em Gestão Empresarial", area: "Gestão e RH" },
  { nome: "MBA em Gestão de Negócios Inovadores", area: "Gestão e RH" },
  { nome: "MBA em Gestão Pública", area: "Gestão e RH" },
  { nome: "MBA em Marketing Digital", area: "Gestão e RH" },
  { nome: "MBA em Gestão de Investimentos", area: "Gestão e RH" },
  { nome: "MBA em Gestão Hospitalar", area: "Gestão e RH" },
  { nome: "MBA em Gestão de Saúde", area: "Gestão e RH" },
  { nome: "MBA em Gestão da Assistência em Saúde", area: "Gestão e RH" },
  { nome: "MBA em Auditoria, Controladoria e Perícia Contábil", area: "Gestão e RH" },

  // Saúde
  { nome: "Fisioterapia Hospitalar", area: "Saúde" },
  { nome: "Saúde Pública", area: "Saúde" },
  { nome: "Ergonomia e Saúde do Trabalho", area: "Saúde" },
  { nome: "Fisioterapia Esportiva", area: "Saúde" },
  { nome: "Análises Clínicas", area: "Saúde" },
  { nome: "Farmácia Clínica e Hospitalar", area: "Saúde" },
  { nome: "Farmacologia", area: "Saúde" },
  { nome: "Farmacologia e Interações Medicamentosas", area: "Saúde" },
  { nome: "Manipulação Farmacêutica", area: "Saúde" },
  { nome: "Nutrição Materno-Infantil", area: "Saúde" },
  { nome: "Nutrição Clínica Hospitalar e Ambulatorial", area: "Saúde" },
  { nome: "Enfermagem em Pediatria e Neonatologia", area: "Saúde" },
  { nome: "Fisiologia do Exercício", area: "Saúde" },
  { nome: "Biomecânica da Atividade Física e Reabilitação", area: "Saúde" },
  { nome: "Saúde Mental nas Organizações", area: "Saúde" },
  { nome: "Implantodontia", area: "Saúde" },
  { nome: "Enfermagem Ginecológica e Obstétrica", area: "Saúde" },
  { nome: "Enfermagem em Urgência e Emergência", area: "Saúde" },
  { nome: "Estética: Procedimentos Injetáveis", area: "Saúde" },

  // Tecnologia
  { nome: "Engenharia de Software", area: "Tecnologia" },
  { nome: "Banco de Dados", area: "Tecnologia" },
  { nome: "MBA em DevOps, DevSecOps e Cloud", area: "Tecnologia" },
  { nome: "FullStack e Desenvolvimento Inteligente", area: "Tecnologia" },

  // Outras áreas
  { nome: "Assistência Técnica e Extensão Rural", area: "Outras áreas" },
  { nome: "Manejo de Pragas em Culturas Agrícolas", area: "Outras áreas" },
  { nome: "Fisiologia Vegetal e Desenvolvimento de Plantas", area: "Outras áreas" },
  { nome: "Mecanização Agrícola", area: "Outras áreas" },
  { nome: "Estudos Literários", area: "Outras áreas" },
  { nome: "Jornalismo Digital: Novas Narrativas e Estratégias de Conteúdo", area: "Outras áreas" },
  { nome: "Treinamento Personalizado", area: "Outras áreas" },
  { nome: "Design de Interiores e Conforto Ambiental", area: "Outras áreas" },
  { nome: "Planejamento Urbano e Regional", area: "Outras áreas" },
];

// Aliases para compatibilidade com o componente de busca.
export type Curso = Course;
export const CURSOS = courses;

export function normalize(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
