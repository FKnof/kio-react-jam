import { Sound } from "@pixi/sound";
import * as PIXI from "pixi.js";

export const theme = Sound.from({
  url: "./MusicSounds/theme.mp3",
  // preload: true,
  // autoPlay: true,
  // complete: function () {
  //   console.log("Sound finished");
  // },
});

export const destroy = Sound.from({
  url: "./MusicSounds/destroy.mp3",
  // preload: true,
  // autoPlay: false,
});
