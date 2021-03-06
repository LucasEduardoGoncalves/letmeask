import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    span{
        display: flex;
        justify-content: center;
        width: 160px;
        background: ${props => props.theme.sideBar.background};
        color:  ${props => props.theme.sideBar.colorText};
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.4s;
        visibility: hidden;

        position: absolute;
        bottom: calc(100% + 12px);
        left: 50%;
        transform: translateX(-50%);

        color: white;

        &::before{
            content: '';
            border-style: solid;
            border-color: ${props => props.theme.sideBar.background} transparent;
            border-width: 6px 6px 0 6px;
            top: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    
    &:hover span{
        opacity: 1;
        visibility: visible;
    }

`;