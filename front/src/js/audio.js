import { useRef } from 'react';

export function useAudioClick(audioFile, volume = 0.75) {
  const audioRef = useRef(new Audio(audioFile));
  audioRef.current.volume = volume;

  const playAndNavigate = (navigate, path) => {
    audioRef.current.play();
    navigate(path);
  };

  return playAndNavigate;
}