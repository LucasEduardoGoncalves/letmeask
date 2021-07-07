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

export const FeedBack = styled.div`
    display: block;

    > div, a {
        display: flex;
        align-items: center;
        color: ${props => props.theme.modalFeedBack.color};
        margin: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;

        text-decoration: none;
        transition: background-color 0.2s;

        svg {
            font-size: 3rem;
            margin-right: 1rem;
        };

        div {
            

            h2 {
                font-size: 1.3rem;
                margin: 0.2rem;
            };
        };

        &:hover {
            background: ${props => props.theme.modalFeedBack.backgroundHover};
        }
    };
`;

export const FeedBackHelp = styled.div`
    display: block;

    h2 {
        font-size: 1rem;
        margin: 0.5rem;
        color: ${props => props.theme.modalFeedBackHelp.h2};
        font-weight: 200;
    }

    textarea {
        width: 30rem;
        height: 10rem;

        border-radius: 0.5rem;
        padding: 0.5rem;
        margin: 0.5rem;
        background: transparent;
        border: 1px solid ${props => props.theme.modalFeedBackHelp.textarea.border}; 
        color: ${props => props.theme.modalFeedBackHelp.textarea.color};
        ::placeholder{
            color: ${props => props.theme.modalFeedBackHelp.textarea.placeholder};
        }

        resize: none;
        outline: none;
    }

     div {
        display: flex;
        align-items: center;
        justify-content: space-around;

        button {
            padding: 0.5rem;
            width: 6rem;
            border-radius: 0.5rem;
            background: transparent;

            border: 1px solid ${props => props.theme.modalFeedBackHelp.button.border};

            color: ${props => props.theme.modalFeedBackHelp.button.color};
            background-color: ${props => props.theme.modalFeedBackHelp.button.background};

            transition: background-color 0.2s;
            transition: border-color 0.2s;

            &:hover {
                background: ${props => props.theme.modalFeedBackHelp.button.backgroundHover};
                border-color: ${props => props.theme.modalFeedBackHelp.button.borderHover};
            }
        }
    }
`;
