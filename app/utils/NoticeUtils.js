
// Must be in this order to match database indexes
const MODALITIES = [
  'Pregão Presencial',
  'Pregão Eletrônico',
  'Concorrência',
  'Convite',
  'Concurso',
  'Leilão',
  'Tomada de Preço'
];

/* Formats the object */
export const formatNotice = (notice, details) => {

  return {
    modality: MODALITIES[notice.modalidade],
    number: notice.numero,
    date: formatDate(notice.data),
    amount: formatAmount(notice.valor),
    description: notice.objeto,
    agency: formatAgency(notice.orgaos, details),
    attachments: notice.anexos,
    exclusive: notice.exclusivo,
    segment: notice.segmentoId,
    newDate: notice.novaData,
    rectified: notice.retificado.status,
    link: notice.link,
  }  
}

/* Formats the agency content */ 
export const formatAgency = (agency, details) => {
  if(details) {
    return agency.nome;
  }

  const initials = agency.sigla.toUpperCase();
  const city = agency.cidades.nome;
  const stateInitials = agency.cidades.estados.sigla;

  return `${stateInitials} • ${city} • ${initials} • ${agency.nome}`;
}

/* Get ISO date as DD/MM/YYYY */
export const formatDate = (date) => {
  const jDate = new Date(date);
  const day = addZero(jDate.getDate());
  const month = addZero(jDate.getMonth() + 1);
  const year = jDate.getFullYear();

  return day + '/' + month + '/' + year;
}

/* Formats the amount to R$ value */
export const formatAmount = (amount) => {
  if(amount === 0) {
    return 'Não informado';
  }
  
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/* Adds a left zero to any number below 10 */
const addZero = (i) => {
  if(i < 10) {
    i = '0' + i;
  }
  
  return i;
}

