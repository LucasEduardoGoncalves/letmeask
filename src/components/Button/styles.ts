import styled  from 'styled-components';

export const ContainerButton = styled.button`
    height: 3.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    background: ${props => props.theme.colors.button};
    color: ${props => props.theme.colors.colorButton};
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
        background: ${props => props.theme.colors.buttonHover};
    }   

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &.outlined {
        background: #fff;
        border: 1px solid ${props => props.theme.colors.button};
        color: ${props => props.theme.colors.text};

        &:hover{
            background: #fff;
            color: ${props => props.theme.colors.buttonHover};
        }
    }
`;