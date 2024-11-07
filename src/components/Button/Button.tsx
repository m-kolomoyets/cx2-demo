import { forwardRef, memo } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import clsx from 'clsx';
import type { ButtonProps } from './types';
import { Component as LoaderIcon } from '@/icons/icon-loader.svg?svgUse';
import s from './Button.module.css';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ asChild, children, className, variant = 'primary', isLoading, disabled, ...rest }, ref) => {
        const Component = asChild ? Slot : 'button';

        return (
            <Component
                className={clsx(s.wrap, s[variant], 'focus-primary', className)}
                disabled={disabled || isLoading}
                data-state={isLoading ? 'loading' : 'idle'}
                {...rest}
                ref={ref}
            >
                {isLoading ? (
                    <span className={s['loader-wrap']}>
                        <LoaderIcon className={s.loader} />
                    </span>
                ) : null}
                <Slottable>{children}</Slottable>
            </Component>
        );
    }
);
Button.displayName = 'Button';

export default memo(Button);
