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

export const ContainerHome = styled.div`
display: flex;
flex-direction: row;
align-items: stretch;
height: 100vh;

overflow: hidden;

    aside {
        flex: 7;

        background: #835afd;
        color: #fff;

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
            color: #f8f8f8;
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

            .create-room {
                margin-top: 4.5rem;
                height: 3.5rem;
                border-radius: 0.5rem;
                font-weight: 500;
                background: #ea4335;
                color: #fff;

                display: flex;
                align-items: center;
                justify-content: center;

                cursor: pointer;
                border: 0;

                transition: background-color 0.2s ;

                img {
                    margin-right: 0.5rem;
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

                    border-radius: 0.5rem;
                    padding: 0 1rem;

                    background: #fff;
                    border: 1px solid #ccc;
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

                color: #737880;

                a {
                    color: #e559f9;
                    text-decoration: none;

                    transition: color 0.2s;

                    &:hover{
                        color: ${shade(0.2, '#e559f9')};
                    }
                }
            }
        }
    }
`;

export const PageRoom = styled.div`

    header {
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
    }

    section {
        max-width: 45rem;
        margin: 0 auto;

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

            textarea {
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
        }
    }
`;