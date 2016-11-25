
const SECONDS_IN_MILLIS = 1000;
const MINUTES_IN_MILLIS = SECONDS_IN_MILLIS * 60;

export const getElapsedTime = (scraper) => {

  const startTime = scraper.startTime;
  const endTime = scraper.endTime;

  const now = Date.now();
  const elapsedTime = endTime ? (endTime - startTime) : (now - startTime);
  
  const seconds = addZero(Math.floor((elapsedTime / SECONDS_IN_MILLIS) % 60));
  const minutes = addZero(Math.floor((elapsedTime / MINUTES_IN_MILLIS) % 60));

  return minutes + ':' + seconds;
}

const addZero = (i) => {
  if(i < 10)
    i = '0' + i;

  return i;
}