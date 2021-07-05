import { Link } from 'react-router-dom';

import { Container } from './styled';
import { useAuth } from '../../hooks/auth';

import { FiSun, FiMoon } from 'react-icons/fi';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { IoReturnDownBack } from 'react-icons/io5';
import { BsGear } from 'react-icons/bs';

import { useTheme } from '../../hooks/useTheme';

export const SideBar = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    function trocarThema() {
        toggleTheme();
    }

    return (
        <Container>
            <header>
                <img src={user?.avatar} alt="Seu avatar" />
                <h4>{user?.name}</h4>              
            </header>

            <main>  
                <button onClick={trocarThema}>
                    {theme.title === 'dark' ? <FiMoon/> : <FiSun/>}
                    Theme
                </button>

                <Link to="/">
                    <IoReturnDownBack/>
                    Home
                </Link>

                <div>
                    <BsGear/>
                    Configurações
                </div>

                <div>
                    <HiOutlineInformationCircle/>
                    Informações
                </div> 
            </main>
        </Container>
    )
}