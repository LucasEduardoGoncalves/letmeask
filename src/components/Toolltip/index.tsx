import React from 'react';

import { Container } from './styles';

interface TooltioProps{
    title: string;
    className?: string;
}

const Tooltip: React.FC<TooltioProps> = ({title, className = '', children}) => {
    return(
        <Container className={className}>
            {title !== '' && (<>{children}</>)}
            <span>{title}</span>
        </Container>     
    )
};

export default Tooltip;