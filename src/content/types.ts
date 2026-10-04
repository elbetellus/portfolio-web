export interface Img {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export interface Stat {
  value: string;
  label: string;
  note?: string;
}

export interface LinkItem {
  label: string;
  href: string;
  note?: string;
  kind: "live" | "file" | "doc" | "figma";
}
