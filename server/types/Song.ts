export type Song = {
  id: string;
  name: string;
  duration: string;
  user: string;
  url: string;
};

export type CurrentSong = Song & {
  currentTime: string;
};
