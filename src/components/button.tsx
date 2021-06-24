import { ButtonHTMLAttributes } from 'react';
import { ContainerButton } from '../styles/styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;


export function Button(props: ButtonProps) {
    return (
        <ContainerButton className="button" {...props}/>
    )
}