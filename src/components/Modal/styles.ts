import styled from 'styled-components';

export const Container = styled.div`

.modal{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: rgba(60, 60, 60, 0.5);
}

.modal__overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,-8);
    cursor: pointer;
}

.modal__box{
    position: relative;

    max-width: 70rem; 

    margin: 0 10%;
    padding: 1.5rem;
    box-sizing: border-box;
    border-radius: 1rem;
    background-color: #fff;
    cursor: auto;
}

.modal__content{
    margin-top: 0.5rem;
}

.modal__close-btn{
    background: transparent;
    position: absolute;
    top: 6px;
    right: 10px;
    border:none;
    color: #9e25fc;
    font-size:2rem;
    
    &:hover{
        color: #731ab7;
    }
}
`;