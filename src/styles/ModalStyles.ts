import styled from "styled-components";

export const Trash = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 2rem;

    svg {
        color: ${props => props.theme.modal.svg};
        margin: 0.5rem 1rem 1rem 1rem;
        font-size: 2.5rem;
    }

    h2 {
        font: 700 1.5rem 'Poppins', sans-serif;
        margin-bottom: 1rem;
        color: ${props => props.theme.modal.h2}
    }

    p {
        margin: 1rem;
        color: ${props => props.theme.modal.p};
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
            color:${props => props.theme.modal.button.button1.color};

            padding: 1rem;
            font: 700 1rem 'Poppins', sans-serif;
            background: ${props => props.theme.modal.button.button1.background};

            transition: background-color 0.2s;

            &:hover {
                background: ${props => props.theme.modal.button.button1.backgroundHover}
            }
        }

        .confirmar {
            border: 0;
            border-radius: 0.5rem;
            width: 50%;
            color: ${props => props.theme.modal.button.button2.color};

            padding: 1rem;
            font: 700 1rem 'Poppins', sans-serif;
            background: ${props => props.theme.modal.button.button2.background};

            transition: background-color 0.2s;

            &:hover {
                background: ${props => props.theme.modal.button.button2.backgroundHover};
            }
        }
    }
`;