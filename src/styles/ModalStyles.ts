import styled from "styled-components";
import { shade } from 'polished';

export const Trash = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 2rem;

    svg {
        color: red;
        margin: 0.5rem 1rem 1rem 1rem;
        font-size: 2.5rem;
    }

    h2 {
        font: 700 1.5rem 'Poppins', sans-serif;
        margin-bottom: 1rem;
    }

    p {
        margin: 1rem;
        color: #737880;
    }

    div {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;

        .cancelar {
            border: 0;
            border-radius: 0.5rem;
            width: 50%;
            color: #737880;

            padding: 1rem;
            font: 700 1rem 'Poppins', sans-serif;
            background: #ccc;

            transition: background-color 0.2s;

            &:hover {
                background: ${shade(0.2, '#ccc')}
            }
        }

        .confirmar {
            border: 0;
            border-radius: 0.5rem;
            width: 50%;
            color: #fff;

            padding: 1rem;
            font: 700 1rem 'Poppins', sans-serif;
            background: #E73F5D;

            transition: background-color 0.2s;

            &:hover {
                background: ${shade(0.4, '#E73F5D')}
            }
        }
    }
`;