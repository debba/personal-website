export type Theme = "auto" | "light" | "dark";
export const themeStorageKey = "debbaweb.theme";

// Runs in <head> before first paint so a stored preference never flashes the wrong theme.
export const themeBootstrapScript = `(function(){var t="auto";try{var s=localStorage.getItem("${themeStorageKey}");if(s==="light"||s==="dark")t=s}catch(e){}document.documentElement.dataset.theme=t})()`;
