import { EMAIL_REGEX, NAME_REGEX } from "./constants";

export function generateUniqueId() {
  const currentDate = new Date();
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueId = '';

  uniqueId += currentDate.getTime();
  for (let i = 0; i < 10; i++) {
    uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return uniqueId;
}

export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

export function validateEmail(email) {
  if (!email) return false;
  if (!EMAIL_REGEX.test(email)) return false;
  return true;
}

export function validateName(name) {
  if (!name) return false;
  if (!NAME_REGEX.test(name)) return false;
  return true;
}

export function capitalizeFirstLetter(str) {
  if (!str) return str; // Handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}