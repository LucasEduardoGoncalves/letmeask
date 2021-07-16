import styled from 'styled-components';

export const Container = styled.div`
    
    svg {
        width: 6rem;
        fill: none;
    }

    .load {
        transform-origin: 50% 50%;
        stroke-dasharray: 570;
        stroke-width: 20px;
        &.one {
            stroke: red;
            animation: load 1.5s infinite;
        }
        &.two {
            stroke: #a496a4;
            animation: load 1.5s infinite;
            animation-delay: 0.1s;
        }
        &.three {
            stroke: #a5a7bb;
            animation: load 1.5s infinite;
            animation-delay: 0.2s;
        }
    }

    .point {
        animation: bounce 1s infinite ease-in-out;

        &.one {
            fill: ${props => props.theme.sideBar.hover.background};
            animation-delay: 0s;
        }

        &.two {
            fill: ${props => props.theme.sideBar.hover.background};
            animation-delay: 0.1s;
        }

        &.three {
            fill: ${props => props.theme.sideBar.hover.background};
            animation-delay: 0.2s;
        }
    }

    @keyframes bounce {
        0%,

        100% {
        transform: translateY(0);
        }

        50% {
        transform: translateY(-20px);
        }
    }

    @keyframes load {
        0% {
            stroke-dashoffset: 570;
        }
        50% {
            stroke-dashoffset: 530;
        }
        100% {
            stroke-dashoffset: 570;
            transform: rotate(360deg);
        }
    }
`;