import type { SlotProps } from '@radix-ui/react-slot';
import type { FCProps } from '@/types';
import { BUTTON_VARIANTS } from './constants';

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export type ButtonProps = FCProps<{
    variant?: ButtonVariant;
    asChild?: boolean;
    isLoading?: boolean;
}> &
    SlotProps &
    React.ComponentProps<'button'>;
