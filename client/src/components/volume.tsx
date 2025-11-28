'use client';

import { useAudio } from '@/contexts/audio-provider';
import Icon from '@/components/icon';

export default function Volume() {
  const { volume, updateVolume, muted, toggleMute } = useAudio();

  const iconName = (() => {
    if (muted || volume === 0) return 'SpeakerSimpleXIcon' as const;
    if (volume < 0.34) return 'SpeakerSimpleXIcon' as const;
    if (volume < 0.67) return 'SpeakerSimpleLowIcon' as const;
    return 'SpeakerSimpleHighIcon' as const;
  })();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.currentTarget.value);
    const newVolume = Math.min(1, Math.max(0, v));
    if (typeof updateVolume === 'function') {
      // Narrow the type so TypeScript knows this is callable
      (updateVolume as (v: number) => void)(newVolume);
    }
  };

  const valueText = muted
    ? 'Muted'
    : `${Math.round(volume * 100).toString()}%`;

  return (
    <div className="max-w-md w-full flex items-center gap-3 mt-4">
      <button
        type="button"
        onClick={toggleMute}
        title={muted ? 'Unmute' : 'Mute'}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="px-2 py-1"
      >
        <Icon name={iconName} />
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleChange}
        aria-label="Volume"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(volume * 100)}
        aria-valuetext={valueText}
        className="
          h-2 w-full rounded-full appearance-none
          bg-white/20
          transition-all
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:cursor-pointer
        "
      />
    </div>
  );
}
