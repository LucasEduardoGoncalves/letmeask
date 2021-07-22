import styled, { keyframes } from 'styled-components'

const appearFromBottom = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const Container = styled.div`
    background:  ${props => props.theme.colors.blocosInput.background};
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

    border-radius: 0.5rem;
    padding: 1.5rem;

    max-width: 45rem;
    width: 100%;

    margin-top: 0.5rem;
    border: 1px solid ${props => props.theme.colors.blocosInput.background};
    

    animation: ${appearFromBottom} 1s;

    a {
        text-decoration: none;
    }
    transition: border-color 0.2s ;

    &:hover {     
        border-color: ${props => props.theme.sideBar.background};
    }

    textarea {
        color:  ${props => props.theme.colors.text};
        width: 100%;
        border: 0;
        background: transparent;
        resize: none;
        outline: none;

        ::-webkit-scrollbar {
            width: 0;
        }
    }

    &.highlighted {
        background-color:  ${props => props.theme.colors.blocosInput};
        border: 1px solid  ${props => props.theme.colors.blocosInput};
    }  

    &.answer {
        background: ${props => props.theme.colors.blocosInput};
        border: 0;
        color: ${props => props.theme.colors.blocosInput};
    } 

    .response {
        display: flex;
        align-items: center;
        opacity: 0.8;
        margin: 0.5rem;
        color: ${props => props.theme.colors.text};

        svg {
            margin-right: 0.5rem;
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

        .children {
            display: flex;
            gap: 0.5rem;
            align-items: center;

            .trash {
                color: ${props => props.theme.colors.text};
                padding-top: 1px;
            }
        }

        button {
            border: 0;
            background: transparent;
            cursor: pointer;

            &.like-button {
                display: flex;
                align-items: flex-end;
                color: ${props => props.theme.colors.text};

                gap: 0.5em;
               
            }
            &.liked {
                color: ${props => props.theme.sideBar.background};

                svg path {
                    stroke: ${props => props.theme.colors.button};
                }
            }
        }
    }
`;