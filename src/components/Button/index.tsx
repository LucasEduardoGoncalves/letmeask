import { ButtonHTMLAttributes } from 'react';
import { ContainerButton } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
    isOutlined?: boolean;
};


export function Button ({isOutlined = false, ...rest} : ButtonProps) {
    return (
        <ContainerButton className={`button ${isOutlined ? 'outlined' :''}`} {...rest}/>
    )
}