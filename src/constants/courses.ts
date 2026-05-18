/**
 * Lista de cursos de pós-graduação por área.
 * CLIENTE: substituir/ampliar com a lista oficial do Grupo Integrado.
 */
export type Curso = { nome: string; area: string };

export const CURSOS: Curso[] = [
  // Direito
  { nome: "Direito Civil e Processual Civil", area: "Direito" },
  { nome: "Direito Penal e Processual Penal", area: "Direito" },
  { nome: "Direito do Trabalho e Processual do Trabalho", area: "Direito" },
  { nome: "Direito Tributário", area: "Direito" },
  { nome: "Direito de Família e Sucessões", area: "Direito" },
  { nome: "Direito Empresarial", area: "Direito" },
  { nome: "Direito Médico e da Saúde", area: "Direito" },

  // Educação
  { nome: "Psicopedagogia Clínica e Institucional", area: "Educação" },
  { nome: "Educação Especial e Inclusiva", area: "Educação" },
  { nome: "Neuropsicopedagogia", area: "Educação" },
  { nome: "Gestão Escolar e Coordenação Pedagógica", area: "Educação" },
  { nome: "Alfabetização e Letramento", area: "Educação" },
  { nome: "Educação Infantil", area: "Educação" },
  { nome: "Docência no Ensino Superior", area: "Educação" },

  // Engenharia
  { nome: "Engenharia de Segurança do Trabalho", area: "Engenharia" },
  { nome: "Engenharia Civil com Ênfase em Estruturas", area: "Engenharia" },
  { nome: "Engenharia de Produção", area: "Engenharia" },
  { nome: "Engenharia Ambiental e Sanitária", area: "Engenharia" },
  { nome: "BIM - Building Information Modeling", area: "Engenharia" },
  { nome: "Gerenciamento de Obras e Projetos", area: "Engenharia" },

  // Gestão e RH
  { nome: "MBA em Gestão de Pessoas", area: "Gestão e RH" },
  { nome: "MBA em Gestão Empresarial", area: "Gestão e RH" },
  { nome: "MBA em Gestão Financeira e Controladoria", area: "Gestão e RH" },
  { nome: "MBA em Marketing Digital", area: "Gestão e RH" },
  { nome: "MBA em Gestão de Projetos", area: "Gestão e RH" },
  { nome: "MBA em Liderança e Coaching", area: "Gestão e RH" },
  { nome: "MBA em Logística e Supply Chain", area: "Gestão e RH" },

  // Saúde
  { nome: "Enfermagem do Trabalho", area: "Saúde" },
  { nome: "Urgência, Emergência e UTI", area: "Saúde" },
  { nome: "Saúde Mental e Atenção Psicossocial", area: "Saúde" },
  { nome: "Fisioterapia Traumato-Ortopédica", area: "Saúde" },
  { nome: "Nutrição Clínica e Esportiva", area: "Saúde" },
  { nome: "Saúde Pública e da Família", area: "Saúde" },

  // Tecnologia
  { nome: "Engenharia de Software", area: "Tecnologia" },
  { nome: "Ciência de Dados e Big Data", area: "Tecnologia" },
  { nome: "Inteligência Artificial e Machine Learning", area: "Tecnologia" },
  { nome: "Segurança da Informação e Cibersegurança", area: "Tecnologia" },
  { nome: "DevOps e Arquitetura em Nuvem", area: "Tecnologia" },
  { nome: "Desenvolvimento Full Stack", area: "Tecnologia" },
  { nome: "UX/UI Design", area: "Tecnologia" },

  // Outras áreas
  { nome: "Psicologia Organizacional e do Trabalho", area: "Outras áreas" },
  { nome: "Terapia Cognitivo-Comportamental", area: "Outras áreas" },
  { nome: "Comunicação e Mídias Digitais", area: "Outras áreas" },
  { nome: "Agronegócio e Gestão do Agro", area: "Outras áreas" },
  { nome: "Arquitetura de Interiores", area: "Outras áreas" },
  { nome: "Gastronomia e Confeitaria", area: "Outras áreas" },
];

export function normalize(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
