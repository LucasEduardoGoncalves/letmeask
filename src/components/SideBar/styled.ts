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

    .arrow {
        position: fixed;
        display: flex;
        align-items: center;
        opacity: 1;
        top: 50%;
        font-size: 2rem;
    }

    header, main {
        opacity: 0;
        transition: opacity 0.2s;
    }

    &:hover {
        width: 18rem;

        .arrow {
            display: none;
        }

        header, main {
            opacity: 1;
        }
    } 
`;

export const Header = styled.header`
    transition: opacity 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 2rem 0;

    img {             
        margin: 1rem 2rem;

        height: 6.5rem;
        border-radius: 50%;
    }
`;

export const Main = styled.main`
    display: block;
    line-height: 3rem;
    width: 100%;
    
    button {
        height: 3rem;
    }
    
    div, a, button {
        color: ${props => props.theme.sideBar.colorText};
        text-decoration: none;
        background: transparent;

        display: flex;
        align-items: center;
        width: 100%;

        padding: 0 1rem;
        margin: 0.1rem 0;

        font-size: 1rem;

        border: 0;

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
`;

export const FeedBack = styled.button`  
    color: ${props => props.theme.sideBar.colorText};
    text-decoration: none;
    background: transparent;

    display: flex;
    align-items: center;
    width: 100%;

    padding: 0 1rem;
    margin: 0.1rem 0;

    font-size: 1rem;

    border: 0;

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
`;