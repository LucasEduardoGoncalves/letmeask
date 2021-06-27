import styled  from 'styled-components';
import { shade } from 'polished';

export const ContainerButton = styled.button`
    height: 3.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    background: #835afd;
    color: #fff;
    padding: 0 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    border: 0;

    transition: background-color 0.2s ;
    transition: color 0.2s ;

    img {
        margin-right: 0.5rem;
    }

    &:not(:disabled):hover {
        background: ${shade(0.2, '#835afd')};
    }   

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &.outlined {
        background: #fff;
        border: 1px solid #835afd;
        color: #835afd;

        &:hover{
            background: #fff;
            color: ${shade(0.2, '#835afd')};
        }
    }
`;