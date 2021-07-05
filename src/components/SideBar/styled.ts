import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background: ${props => props.theme.sideBar.background};
    color: ${props => props.theme.sideBar.colorText};

    height: 100vh;
    width: 4rem;

    transition: width 0.3s;

    &:hover {
        width: 18rem;

        header {
            opacity: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            margin: 2rem 0;

            img {             
                margin: 1rem 2rem;

                height: 6.5rem;
                border-radius: 50%;
            }
        }

        main {
            display: block;
            line-height: 3rem;
            width: 100%;

            button {
                height: 3rem;
            }
            div, a, button{
                color: ${props => props.theme.sideBar.colorText};
                text-decoration: none;

                display: flex;
                align-items: center;
                width: 100%;

                padding: 0 1rem;
                margin: 0.1rem 0;

                font-size: 1rem;

                border: 0;

                /* transition: background-color 0.2s; */

                svg {
                    color: ${props => props.theme.sideBar.colorText};
                    margin: 0 0.5rem;
                }

                &:hover {
                    background-color: ${props => props.theme.sideBar.hover.background};
                    color: ${props => props.theme.sideBar.hover.colorText};

                    border-right: 0.5rem solid ${props => props.theme.sideBar.background};

                    svg {
                        color: ${props => props.theme.sideBar.hover.colorText};
                    }
                }
            }
        }
    }

    header {
        opacity: 0;
        transition: opacity 0.3s;

        display: flex;
        flex-direction: column;
        align-items: center;

        margin: 2rem 0;

        img {             
            margin: 1rem 2rem;

            height: 6.5rem;
            border-radius: 50%;
        }
    }

    div, a, button {
        color: transparent;
        background: transparent;
        border: 0;
    }

`;