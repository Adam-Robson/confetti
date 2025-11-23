import { IconProps } from '@phosphor-icons/react';
import { ICONS } from '@/app/constants/icons';
export type Weight = NonNullable<IconProps['weight']>;

export type IconInstanceType = {
  name: IconName;
  size?: number;
  weight?: Weight;
  label?: string;
  className?: string;
} & Omit<IconProps, 'size' | 'weight' | 'aria-label'>;

export type IconName = keyof typeof ICONS;
