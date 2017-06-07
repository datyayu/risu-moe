import { Router } from "express";
import { playlistService } from "./services/playlist";

export const routes = Router();

// Add new file.
routes.post("/files", async function(req, res) {
  const song = req.body.song;

  if (
    !song ||
    !song.id ||
    !song.fileUrl ||
    !song.duration ||
    !song.name ||
    !song.user
  ) {
    res.status(401).send("Missing parameters");
    return;
  }

  try {
    await playlistService.addSong(song);
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
});
