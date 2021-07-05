import styled from 'styled-components';

export const Header = styled.div`
    padding: 1.5rem;

    border-bottom: 1px solid #ccc;

    .content {
        display: flex;
        margin: 0 auto;
        justify-content: space-between;

        max-width: 73rem;
        align-items: center;

        img {
            max-height: 4rem;
        }  
        
        > div {
            display: flex;
            align-items: center;
            gap: 1rem;

            button {
                height: 2rem;
            }
        }
    } 
`;

export const PageRoom = styled.div`
    width: 100%;
    display: flex;

    height: 100vh;
    overflow: hidden;

    .conteudo {
        width: 100%;  
    }

    section {
        height: 100%;
        overflow: auto;

        max-width: 45rem;
        margin: 0 auto;

        padding: 0 3rem;

        ::-webkit-scrollbar {
            width: 0;
        }

        .div-title {
            display: flex;
            align-items: center;

            margin: 2rem 0 1.5rem;

            h1 {
                font-family: 'Poppins', sans-serif;
                font-size: 1.5rem;

                color: #29292e;
            }

            span {
                margin-left: 1rem;
                background: #e55ef9;

                border-radius: 1rem;

                padding: 0.5rem 1rem;
                color: #fff;

                font-weight: 500;
                font-size: 1rem;
            }
        }

        form {

            .responceMessage {
                display: flex;
                justify-content: left;
                width: 100%;
                height: 3rem;
                margin-left: 0.5rem;
                gap: 1rem;
                align-items: center;
                border: 0;
                padding: 1rem;
                border-radius: 0.5rem;
                background: rgb(240, 240, 240);
            }

            input {
                width: 100%;
                height: 6rem;
                border: 0;
                padding: 1rem;
                border-radius: 0.5rem;
                background: #fefefe;
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

                overflow: auto;
                resize: none;

                &::-webkit-scrollbar {
                    width: 0px;
                }
            }
            .user-info{
                display: flex;
                align-items: center;

                img {
                    height: 2rem;
                    width: 2rem;

                    border-radius: 50%;
                }

                span {
                    margin-left: 0.5rem;
                    font-size: 0.8rem;
                    color: #29292e;
                    font-weight: 500;
                }
            }

            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 1rem;

                p {
                    font-size: 0.8rem;
                    color: #737380;

                    font-weight: 500;

                    button {
                        background: transparent;
                        color: #835afd;
                        border: 0;

                        text-decoration: underline;
                        font-size: 0.8rem;

                        cursor: pointer;
                    }
                }
            }

            button {
                transition: background-color 0.2;
            }
        }

        .question-list {
            margin-top: 1.3rem;

            display: flex;
            flex-direction: column-reverse;

            .emptyQuestion{
                display: flex;
                flex-direction: column;
                align-items: center;

                h2 {
                    margin: 1rem;
                    font: 700 1.5rem 'Poppins', sans-serif;
                }

                p {
                    color: #737880;
                }
            }
        }
    }
`;