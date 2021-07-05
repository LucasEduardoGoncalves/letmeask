import styled, { keyframes } from 'styled-components'

const appearFromBottom = keyframes`
    from {
        opacity: 0;
        transform: translatey(-100px);
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

    margin-top: 0.5rem;

    animation: ${appearFromBottom} 1s;

    p {
        color:  ${props => props.theme.colors.text};
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
                color: red;

                svg path {
                    stroke: ${props => props.theme.colors.button};
                }
            }
        }
    }
`;