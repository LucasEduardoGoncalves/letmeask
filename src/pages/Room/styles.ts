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

    @media(max-width:1000px) {
        img {
            max-height: 3rem;
        }

        padding: 1rem;

        .title {
            h1 {
                font-size: 1rem;
            }
        }
    }
`;

export const Conteudo = styled.main`
    width: 100%;

    main {
        display: flex;
        flex-direction: column; 
        align-items: center;

        width: 100%;
        height: 71%;

        padding: 1rem;
        margin: 0 auto;      

        .question-list {
            
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;

            ::-webkit-scrollbar{
                width: 0;
            }

            .emptyQuestion{
                
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

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
        flex-direction: column;
        align-items: center;

        padding:0 1rem;

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

            p {
                max-width: 10rem;
                display: flex;
                align-items: baseline;
                overflow: hidden;

                div {
                    font-size: 1rem;
                    color: #ccc;
                    margin-right: 0.5rem;
                }
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

export const ResponseQuestion = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    max-width: 45rem;

    padding-top: 1rem;
    padding-left: 4rem;

    svg {
        font-size: 2rem;
        margin-right: 1rem;
    }
`;