export const getRefreshCookieExpirationDate = () => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
  
  return expirationDate;
}