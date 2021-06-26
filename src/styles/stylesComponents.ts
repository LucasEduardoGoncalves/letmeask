import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';


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


export const ContainerButton = styled.button`
    height: 3.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    background: #835afd;
    color: #fff;
    padding: 0 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    border: 0;

    transition: background-color 0.2s ;
    transition: color 0.2s ;

    img {
        margin-right: 0.5rem;
    }

    &:not(:disabled):hover {
        background: ${shade(0.2, '#835afd')};
    }   

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &.outlined {
        background: #fff;
        border: 1px solid #835afd;
        color: #835afd;

        &:hover{
            background: #fff;
            color: ${shade(0.2, '#835afd')};
        }
    }
`;

export const CopyCode = styled.button`
    height: 2.5rem;
    border-radius: 0.5rem;
    overflow: hidden;

    background: #fff;
    border: 1px solid #835afd;

    cursor: pointer;
    display: flex;

    div {
        background: #835afd;
        padding: 0 0.8rem;

        display: flex;
        justify-content: center;

        align-items: center;  
        height: 100%;  

        transition: background-color 0.2s;
    }

    span {
        display: block;
        align-self: center;
        flex: 1;

        padding: 0 1rem 0 0.8rem;
        width: 12rem;

        font-weight: 500;
        font-size: 0.8rem;
        
        transition: background-color 0.2s;
    }

    &:hover {
        div {
            background: ${shade(0.2, '#835afd')};
        }
    }
`;

export const QuestionsArea = styled.div`
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