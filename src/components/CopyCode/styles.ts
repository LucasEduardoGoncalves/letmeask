import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    height: 2.5rem;
    border-radius: 0.5rem;
    overflow: hidden;

    background: #fff;
    border: 1px solid #835afd;

    cursor: pointer;
    display: flex;

    div {
        background: #835afd;
        padding: 0 0.8rem;

        display: flex;
        justify-content: center;

        align-items: center;  
        height: 100%;  

        transition: background-color 0.2s;

        svg {
            color: #fff;
        }
    }

    span {
        display: block;
        align-self: center;
        flex: 1;

        padding: 0 1rem 0 0.8rem;
        width: 12rem;

        font-weight: 500;
        font-size: 0.8rem;
        
        transition: background-color 0.2s;
    }

    &:hover {
        div {
            background: ${shade(0.2, '#835afd')};
        }
    }
`;