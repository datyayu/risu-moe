export type Song = {
  id: string;
  name: string;
  duration: string;
  user: string;
  url: string;
  ref?: string;
};

export type CurrentSong = Song & {
  currentTime: string;
};

export type SongMetadata = {
  id?: string;
  ref?: string;
  downloadUrl?: string;
  user?: string;
  userId?: string;
  userName?: string;
  name: string;
  duration: string;
};
