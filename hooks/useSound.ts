import { useCallback, useRef } from 'react';

/**
 * Hook for playing sound effects using Web Audio API
 * Generates simple tones without requiring external audio files
 */
export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
    try {
      const audioContext = getAudioContext();

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if audio is not supported
      console.warn('Audio playback failed:', error);
    }
  }, [getAudioContext]);

  const playCorrectSound = useCallback(() => {
    // Pleasant rising two-note chime (like a success sound)
    playTone(523.25, 0.15, 'sine', 0.25); // C5
    setTimeout(() => playTone(659.25, 0.2, 'sine', 0.25), 100); // E5
  }, [playTone]);

  const playIncorrectSound = useCallback(() => {
    // Softer descending tone (gentle feedback, not harsh)
    playTone(349.23, 0.15, 'sine', 0.2); // F4
    setTimeout(() => playTone(293.66, 0.25, 'sine', 0.2), 120); // D4
  }, [playTone]);

  return {
    playCorrectSound,
    playIncorrectSound,
  };
}
