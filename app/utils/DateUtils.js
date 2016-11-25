/**
 * Retorna a data em formato string no padrão dd/MM/YYYY às HH:MM
 */
export function getFormattedDate(date, showHours) {
  const newDate = new Date(date);
  let day       = addZero(newDate.getDate());
  let month     = addZero(newDate.getMonth() + 1);
  let year      = newDate.getFullYear();

  if(showHours) {
    let hours     = addZero(newDate.getHours());
    let minutes   = addZero(newDate.getMinutes());
    if(hours == '00') {
      hours = '24';
    }
    return day + '/' + month + '/' + year + ' às '
         + hours  + ":" + minutes;
  }
  else {
    return day + '/' + month + '/' + year;
  }
  
}

/** 
 * Converte uma string com qualquer divisor para formato data Javascript
 */
export function getJavascriptDateFormatFromString(strDate, divisor) {
  
  if(strDate.length < 8) {
    throw 'Invalid date format. The date must be at least 8 characters length';
  }

  const splitDate = strDate.split(divisor);
  
  if(splitDate.length !== 3)
    throw 'Invalid date format.';

  const _strDate = '"' + splitDate[2] + '/' 
		 + splitDate[1] + '/'
		 + splitDate[0] + '"';

  return new Date(_strDate);
}

/**
 * Adiciona zero no início dos números que forem
 * menores que 10
 */
function addZero(i) {
  if(i < 10) {
    i = '0' + i;
  }
  return i;
}
