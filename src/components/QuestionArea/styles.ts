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
    background: #fefefe;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

    border-radius: 0.5rem;
    padding: 1.5rem;

    margin-top: 0.5rem;

    animation: ${appearFromBottom} 1s;

    p {
        color: #29292e;
    }

    &.highlighted {
        background-color: #f4f0ff;
        border: 1px solid #835afd;
    }  

    &.answer {
        background: #ccc;
        border: 0;
        color: #ccc;
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
                color: #29292e;
                font-weight: 500;
            }
        }

        .children {
            display: flex;
            gap: 0.5rem;
            align-items: center;

            .trash {
                color: #737380;
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
                color: #737380;

                gap: 0.5em;
               
            }
            &.liked {
                color: #835afd;

                svg path {
                    stroke: #835afd;
                }
            }
        }
    }
`;