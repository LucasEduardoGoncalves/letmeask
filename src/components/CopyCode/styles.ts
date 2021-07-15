import styled from 'styled-components';

export const Container = styled.button`
    height: 2.5rem;
    border-radius: 0.5rem;
    overflow: hidden;

    background: ${props => props.theme.copyCode.background};
    border: 1px solid ${props => props.theme.copyCode.borderColor};

    cursor: pointer;
    display: flex;

    transition: border-color 0.2s;

    div {
        background: ${props => props.theme.copyCode.div.background};
        padding: 0 0.8rem;

        display: flex;
        justify-content: center;

        align-items: center;  
        height: 100%;  

        transition: background-color 0.2s;

        svg {
            color: ${props =>props.theme.copyCode.div.color};
        }
    }

    span {
        display: block;
        align-self: center;
        flex: 1;
        color: ${props => props.theme.copyCode.colorText};

        padding: 0 1rem 0 0.8rem;
        width: 12rem;

        font-weight: 500;
        font-size: 0.8rem;
        
        transition: color 0.2s;
    }

    &:hover {
        div {
            background: ${props => props.theme.copyCode.hover.background};
        }

        border-color: ${props => props.theme.copyCode.hover.background};
        span {
            color: ${props => props.theme.copyCode.hover.background};
        }
    }

    @media(max-width: 1000px) {
        span {
            display: none
        }
    }
`;