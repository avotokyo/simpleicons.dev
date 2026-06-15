export type License =
  | { type: string; url: string }
  | { type: "custom"; url: string };

export type Theme = "dark" | "light";

export type IconRecord = {
  title: string;
  slug: string;
  hex: string;
  source: string;
  guidelines?: string;
  license?: License;
};

export type IconMeta = {
  slug: string;
  title: string;
  hex: string;
  source: string;
  guidelines?: string;
  license?: License;
};

export type RenderOptions = {
  theme?: Theme;
  color?: string;
  iconColor?: string;
  viewbox?: "auto";
};
