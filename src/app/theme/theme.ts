export interface Theme {
  name: string;
  label: any;
  color: string;
}

export const light: Theme = {
  name: "light-theme",
  label: "Light",
  color: "white"
};

export const dark: Theme = {
  name: "dark-theme",
  label: "Dark",
  color: "black"
};