const sounds = {
  theme: new Audio("./MusicSounds/theme.mp3"),
  shoot: new Audio("./MusicSounds/shoot.mp3"),
  scorePositive: new Audio("audio/score_positive.mp3"),
  // playerHit: new Audio("audio/PlayerHit.wav"),
};

export const playSound = (name: keyof typeof sounds) => {
  const sound = sounds[name];
  try {
    sound.play();
  } catch (_e) {
    // Sounds may be blocked by browser
  }
};
