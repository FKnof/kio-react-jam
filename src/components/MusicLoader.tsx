import { Howl } from "howler";

export const sounds = {
  theme: new Howl({ src: ["./MusicSounds/theme.mp3"] }),
  shoot: new Howl({ src: ["./MusicSounds/shoot.mp3"] }),
  destroy: new Howl({ src: ["./MusicSounds/destroy.mp3"] }),
  dissolveSimilar: new Howl({ src: ["./MusicSounds/dissolve_similar.mp3"] }),
  gameOver: new Howl({ src: ["./MusicSounds/game_over.mp3"] }),
  gameWon: new Howl({ src: ["./MusicSounds/game_won.mp3"] }),
  scorePositive: new Howl({ src: ["./MusicSounds/score_positive.mp3"] }),
  scoreNegative: new Howl({ src: ["./MusicSounds/score_negative.mp3"] }),
};
