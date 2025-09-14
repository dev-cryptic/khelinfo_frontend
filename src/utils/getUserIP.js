// src/utils/getUserIP.js
const getUserIP = async () => {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
};

export default getUserIP;
