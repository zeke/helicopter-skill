import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const ASSETS_DIR = join(__dirname, "assets");
export const ZEKEFAKE_DIR = join(ASSETS_DIR, "zekefake");
export const STYLE_REFS_DIR = join(ASSETS_DIR, "style-refs");
export const IMAGES_DIR = join(__dirname, "data", "images");
export const VIDEOS_DIR = join(__dirname, "data", "videos");

export const ZEKE_PHOTOS: Record<string, string> = {
  ziki:             "ziki.jpg",
  "outdoor-selfie": "zeke-outdoor-selfie.jpg",
  "wilder-shirt":   "zeke-wilder-shirt.jpg",
  "orange-hat":     "zeke-orange-hat.jpg",
  "lava-lamps":     "zeke-lava-lamps.jpg",
  zeko:             "zeko.jpg",
};

const STYLE = `1950s American Southwest cinema aesthetic. Dead-center symmetric framing. Pastel color palette: sandy ochre desert ground, turquoise sky, crisp white-painted concrete, muted terracotta. Flat bright daylight, soft shadows, 35mm film grain. Theatrical, surreal, retro Americana. No subtitles. Absolutely no text on screen. No words or letters visible anywhere in the frame. No signs.`;

const ZEKE = `a man with curly gray-brown hair, a short beard, and clear-framed glasses`;

export interface Variant {
  id: string;
  label: string;
  prompt: string;
  referenceImageKeys: string[];
  referenceStyleCount: number;
  useImageInput?: string;
  duration: number;
}

export interface Segment {
  index: number;
  name: string;
  description: string;
  variants: Variant[];
}

export const SEGMENTS: Segment[] = [
  {
    index: 1,
    name: "neo",
    description: "Neo — Can you fly that thing?",
    variants: [
      // v2-d: no text, perfect likeness, hand shading eyes on desert road — best still
      {
        id: "z",
        label: "Z — I2V from v2-d (road, shading eyes), 5s",
        referenceImageKeys: [],
        referenceStyleCount: 0,
        useImageInput: join(IMAGES_DIR, "01-neo-v2-d.jpg"),
        duration: 5,
        prompt: `${STYLE}

The figure in the still stands on a desert road shading his eyes, scanning the distance. He lowers his hand slightly, still looking off into the horizon, and says: Can you fly that thing?

Sound: desert wind. No music.`,
      },
      {
        id: "aa",
        label: "AA — I2V from v2-d, intelligent duration",
        referenceImageKeys: [],
        referenceStyleCount: 0,
        useImageInput: join(IMAGES_DIR, "01-neo-v2-d.jpg"),
        duration: -1,
        prompt: `${STYLE}

The figure in the still stands on a desert road, hand raised to shade his eyes. He gazes into the far distance for a moment, then says: Can you fly that thing?

Sound: desert wind. No music.`,
      },
      {
        id: "ab",
        label: "AB — I2V from v2-d, 6s, slight head turn",
        referenceImageKeys: [],
        referenceStyleCount: 0,
        useImageInput: join(IMAGES_DIR, "01-neo-v2-d.jpg"),
        duration: 6,
        prompt: `${STYLE}

The figure in the still stands on a desert road. He turns his head slightly to look off to one side into the distance. He says: Can you fly that thing?

Sound: desert wind. No music.`,
      },
      // v2-a: stunning but has airport sign in background — prompt the camera to drift away from the building
      {
        id: "ac",
        label: "AC — I2V from v2-a (airstrip), camera drifts left away from sign",
        referenceImageKeys: [],
        referenceStyleCount: 0,
        useImageInput: join(IMAGES_DIR, "01-neo-v2-a.jpg"),
        duration: 5,
        prompt: `${STYLE}

The figure in the still stands on the desert airstrip. The camera drifts slowly left, keeping the figure centered, moving the background building out of frame. The figure looks off to the side and says: Can you fly that thing?

Sound: desert wind. No music.`,
      },
    ],
  },
];
