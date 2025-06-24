import type { HTMLAttributes } from 'astro/types';

export interface ButtonProps extends HTMLAttributes<'button'> {
    Icon?: any;
    variant: 'outline' | 'fill' | 'ghost' | 'destruct';
    class?: string;
}

export type LoadingButtonValidState = 'initial' | 'loading' | 'error' | 'success'