import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;

    height: 100vh;
    overflow: hidden;

    .error404 {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
`;

export const Header = styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid ${props => props.theme.sideBar.background};

    .content {
        display: flex;
        margin: 0 auto;
        justify-content: space-between;

        max-width: 73rem;
        align-items: center;

        img {
            max-height: 4rem;
        }  

        h2 {
            color: ${props => props.theme.sideBar.background}
        }
    } 
`;

export const Conteudo = styled.main`
    width: 100%;
    height: 100%;

    overflow: auto;
    ::-webkit-scrollbar{
        width: 0;
    }

    main {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 1rem;

        /* transition: flex-wrap 0.2s; */
    }
`;

export const Feedback = styled.div`
    background:  ${props => props.theme.colors.blocosInput.background};
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

    border-radius: 0.5rem;
    padding: 1.5rem;

    margin-top: 0.5rem;
    width: 25rem;

    textarea {
        color:  ${props => props.theme.colors.text};
        width: 100%;
        border: 0;
        background: transparent;
        resize: none;
        outline: none;

        max-height: 50rem;

        ::-webkit-scrollbar {
            width: 0;
        }
    }
   
    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 1.4rem;

        .user-info{
            display: flex;
            align-items: center;

            img {
                height: 2rem;
                width: 2rem;

                border-radius: 50%;
            }

            p {
                margin-left: 0.5rem;
                font-size: 0.8rem;
                color: ${props => props.theme.colors.text};
                font-weight: 500;
            }
        }
            
        svg {
            font-size: 2rem;
            color: ${props => props.theme.colors.button};

            &:hover {
                color: ${props => props.theme.colors.buttonHover};
            }
        }


    }
`;
