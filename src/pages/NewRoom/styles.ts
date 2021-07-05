import styled, { keyframes } from 'styled-components';

const appearFromRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(100px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const Container = styled.div`
display: flex;
flex-direction: row;
align-items: stretch;
height: 100vh;
width: 100%;

overflow: hidden;

    aside {
        flex: 7;

        background: ${props => props.theme.newRoom.aside.background};
        color: ${props => props.theme.newRoom.aside.textColor};

        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 7.5rem 5rem;

        img {
            max-width: 20rem;
        }

        strong {
            font: 700 2rem 'Poppins', sans-serif;
            line-height: 3rem;
            margin-top: 1rem;
        }

        p {
            font-size: 1.5rem;
            line-height: 2rem;
            color: ${props => props.theme.newRoom.aside.textColor};
        }
    }

    main {
        flex: 8;

        padding: 0 2rem;

        display: flex;
        align-items: center;
        justify-content: center;

        animation: ${appearFromRight} 1s;

        section {
            display: flex;
            flex-direction: column;

            align-items: stretch;
            text-align: center;

            width: 100%;
            max-width: 19rem;

            > img {
                align-items: center;
                max-height: 6rem;
            }

            h2 { 
                margin: 3.5rem 0 1.5rem;
                font-size: 1.5rem;
            }

            form {

                input {
                    height: 3.5rem;

                    border-radius: 0.5rem;
                    padding: 0 1rem;

                    outline: none;

                    background: ${props => props.theme.newRoom.main.input.background};
                    color: ${props => props.theme.newRoom.main.input.color};
                    ::placeholder {
                        color: ${props => props.theme.newRoom.main.input.placeholder}
                    }
                    border: 1px solid ${props => props.theme.newRoom.main.input.borderColor};
                }

                button {
                    margin-top: 1rem;
                }

                button, input {
                    width: 100%;
                }
            }

            p {
                padding: 0.5rem;
                font-size: 0.8rem;

                color: ${props => props.theme.newRoom.main.p.color};

                a {
                    color: ${props => props.theme.newRoom.main.p.corDestque};
                    text-decoration: none;

                    transition: color 0.2s;

                    &:hover{
                        color: ${props => props.theme.newRoom.main.p.corDestqueHover};
                    }
                }
            }
        }
    }
`;