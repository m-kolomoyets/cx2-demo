import { useToggle } from '@react-hookz/web';

export type ObjValues<T> = T[keyof T];

export type WithClassName<TProps = unknown> = TProps & {
    /**
        Extendable classnames of component
    */
    className?: string;
};

export type WithChildren<TProps = unknown> = TProps & {
    /**
        The content of the component.
    */
    children?: React.ReactNode;
};

export type FCProps<TProps = unknown> = WithClassName<WithChildren<TProps>>;

export type ObjectOfStringsType = {
    [key: string]: string;
};

export type SetStateValue<T> = React.Dispatch<React.SetStateAction<T>>;
export type SetToggleValue = ReturnType<typeof useToggle>[1];
