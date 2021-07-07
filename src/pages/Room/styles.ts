import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    overflow: hidden;

    max-height: 100vh;
    max-width: 100vw;
`;

export const Header = styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid ${props => props.theme.sideBar.background};

    display: flex;
    margin: 0 auto;
    justify-content: space-between;

    align-items: center;

    img {
        max-height: 4rem;
    }  
    
    .title {
        display: flex;
        align-items: center;
        gap: 1rem;

        h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.5rem;

            color: ${props => props.theme.colors.button};
        }
    }   
`;

export const Conteudo = styled.main`
    width: 100%;

    main {
        display: flex;
        flex-direction: column;
        overflow: auto;  

        margin: 0 auto;

        height: 71%;
        max-width: 45rem;
        padding: 3rem;
            
        ::-webkit-scrollbar {
            width: 0;
        }

        .question-list {
            margin-bottom: 1rem;

            display: flex;
            flex-direction: column-reverse;

            .emptyQuestion{
                display: flex;
                flex-direction: column;
                align-items: center;

                svg {
                    font-size: 6rem;
                    color: ${props => props.theme.colors.text};
                }

                h2 {
                    margin: 1rem;
                    font: 700 1.5rem 'Poppins', sans-serif;
                }

                p {
                    color:  ${props => props.theme.colors.text};
                }
            }
        }
    }

    > section {
        width: 100%;
        display: flex;
        justify-content: center;

        padding-top: 0.5rem;

        form {
            display: flex;
            align-items: center;

            gap: 1rem;                      
            margin-bottom: 1rem;

            width: 100%;
            max-width: 45rem;

            img {
                height: 3rem;
                width: 3rem;

                border-radius: 50%;
            }

            input {
                width: 100%;
                height: 4rem;
                border: 0;
                padding: 1rem;
                border-radius: 0.5rem;
                background: ${props => props.theme.colors.blocosInput.background};
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

                overflow: auto;
                resize: none;

                color:  ${props => props.theme.colors.text};

                &::-webkit-scrollbar {
                    width: 0px;
                }
                ::placeholder {
                    color:  ${props => props.theme.colors.text};
                }
                &:focus {
                    outline: 0;
                }
            } 

            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 1rem;
            }

            p {
                    font-size: 0.8rem;
                    color:  ${props => props.theme.colors.text};;

                    font-weight: 500;

                    button {
                        background: transparent;
                        color:  ${props => props.theme.colors.button};;
                        border: 0;

                        text-decoration: underline;
                        font-size: 0.8rem;

                        cursor: pointer;
                    }
                }

            button {
                transition: background-color 0.2;
            }
        }
    }
`;