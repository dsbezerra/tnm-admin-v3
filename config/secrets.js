const DEV = process.env.NODE_ENV === 'production';

export const api = {
  uri: `https://api${DEV ? 'dev' : 'tnm'}-tnmlicitacoes.rhcloud.com/api`,
}

export const plivo = {
  authId: 'MAMDBINDUYYJK1OWQ3Y2',
  authToken: 'YWQxMWQzNmE1NTk3NmM0NmVjYWUxNjcyYzYxNzg1',
}

export const neural = {
  apiUri: 'https://tnm-neural.herokuapp.com/category_classifier',
};