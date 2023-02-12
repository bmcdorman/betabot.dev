export const CONTACT_URL = btoa('aHR0cHM6Ly9iZXRhYm90LWRldi1jb250YWN0LXM0YmZjdXpzcHEtdWMuYS5ydW4uYXBwCg==').trim();
export const EMAIL = (() => {
  const reversed = btoa('dmVkLnRvYmF0ZWJAbmVkYXJiCg==').trim();
  return reversed.split('').reverse().join('');
})();