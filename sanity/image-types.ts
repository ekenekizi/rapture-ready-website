export type TeachingImage = {
  _type: "teachingImage";
  _key?: string;
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  credit?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
  dimensions?: { width: number; height: number; aspectRatio: number };
};
