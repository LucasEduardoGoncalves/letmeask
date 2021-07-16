import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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
    align-items: stretch;

    height: 100vh;
    width: 100vw;

    overflow: hidden;
    transition: display 0.2s;

    aside {
        display: flex;
        flex-direction: column;
        justify-content: center;

        flex: 7;

        background: ${props => props.theme.home.aside.background};
        color: ${props => props.theme.home.aside.textColor};    

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
            color: ${props => props.theme.home.aside.textColor};
        }
    }

    main {
        display: flex;
        align-items: center;
        justify-content: center;

        flex: 8;
        padding: 0 2rem;       
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

            .create-room {
                display: flex;
                align-items: center;
                justify-content: center;

                margin-top: 4.5rem;
                height: 3.5rem;
                border-radius: 0.5rem;
                font-weight: 500;

                background: #ea4335;
                color: #fff;

                cursor: pointer;
                border: 0;

                transition: background-color 0.2s ;

                svg {
                    margin-right: 0.5rem;
                    font-size: 2rem;
                }

                &:hover {
                    background: ${shade(0.2, '#ea4335')};
                }
            }

            .separator {
                font-size: 0.9rem;
                color: #ccc;

                margin: 2rem 0;

                display: flex;
                align-items: center;

                &::before {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #ccc;
                    margin-right: 1rem;
                }

                &::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #ccc;
                    margin-left: 1rem;
                }
            }

            form {

                input {
                    height: 3.5rem;

                    border: 1px solid ${props => props.theme.home.main.input.borderColor};
                    border-radius: 0.5rem;
                    padding: 0 1rem;

                    outline: none;

                    background: ${props => props.theme.home.main.input.background};
                    color: ${props => props.theme.home.main.input.color};

                    ::placeholder {
                        color: ${props => props.theme.home.main.input.placeholder}
                    }   
                }

                button {
                    margin-top: 1rem;
                }

                button, input {
                    width: 100%;
                }
            }
        }
    }

    @media(max-width: 1200px){
        aside { 
            display: none;
        }
    }
`;