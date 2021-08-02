import { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Modal } from '../Modal';
import icon from '../../assets/iconDark.svg';
import iconligh from '../../assets/icon.svg';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/auth';

import { database } from '../../services/firebase';

import { 
    Sun, 
    Moon, 
    AlertTriangle, 
    FeedbackLine, 
    MinorSign, 
    MessageCheck, 
    Logout, 
    Login, 
    Feed, 
    ReturnDownBack, 
    ExitOutline 
} from '../../styles/Icons/icons';

import { 
    Container,
    Header,
    Main,
    FeedBack as FeedBackButton,
} from './styled';

import toast, { Toaster } from 'react-hot-toast';

import { FeedBack, FeedBackHelp, Trash } from '../../styles/ModalStyles';

export const SideBar = () => {
    const { user, signOut, signInWithGoogle } = useAuth();
    const { theme, toggleTheme, styledToast } = useTheme();

    const  history = useHistory();

    function logout() {
        signOut();
        toggleModalLogout();
    };

    function goToHome() {
        history.push('/');
        toggleModalHome();
    };

    const [modalFeedBack, setModalFeedBack] = useState(false);
    const toggleModalFeedBack = () => setModalFeedBack(!modalFeedBack);

    const [modalFeedBackHelp, setModalFeedBackHelp] = useState(false);
    const toggleModalFeedBackHelp = () => {
        setModalFeedBackHelp(!modalFeedBackHelp);
        setModalFeedBack(false);
        console.log(user?.id);
    };

    const [modalFeedBackTanks, setModalFeedBackTanks] = useState(false);
    const toggleModalFeedBackTanks = () => {
        setModalFeedBackTanks(!modalFeedBackTanks);
        setModalFeedBack(false);
    };

    const [modalLogout, setModalLogout] = useState(false);
    const toggleModalLogout = () => {
        setModalLogout(!modalLogout)
    };

    const [modalHome, setModalHome] = useState(false);
    const toggleModalHome = () => {
        setModalHome(!modalHome)
    };

    const [newFeedback, setNewFeedback] = useState('');
    async function handleFeedback(event: FormEvent) {
        event.preventDefault();

        if(newFeedback.trim() === ''){
            return;
        };

        if(!user){
            throw new Error('You must be logged in.');
        };

        const feedback = {
            content: newFeedback,
            author: {
                name: user.name,
                avatar: user.avatar,
                id: user.id,                
            }
        };
        await database.ref(`/feedback`).push(feedback);

        setNewFeedback('');
        toast.success('Feedback enviado com sucesso', styledToast);
        setModalFeedBackTanks(false);
        setModalFeedBackHelp(false);  
    };

    return (
        <>
        <Toaster/>
        <Container>
            <div className="arrow">
                <MinorSign/>         
            </div>

            {user ? 
                <Header>
                    <img src={user.avatar} alt="Seu avatar" />
                    <h4>{user.name}</h4>              
                </Header> 
            : 
                <Header>
                    {theme.title === 'light' ? <img src={iconligh} alt="Seu avatar" /> : <img src={icon} alt="Seu avatar" />}
                    <h4>Usuario não logado</h4>              
                </Header>
            }

            <Main>  
                <button onClick={toggleTheme}>
                    {theme.title === 'dark' ? <Moon/> : <Sun/>}
                    Temas
                </button>

                {user ? 
                    <div onClick={toggleModalLogout}>
                        <Logout/>
                        Logout
                    </div> : 
                    <div onClick={signInWithGoogle}>
                        <Login/>
                        Login
                    </div>
                }

                <div onClick={toggleModalHome}>
                    <ReturnDownBack/>
                    Home
                </div>

                <FeedBackButton className="feedback" disabled={!user} onClick={toggleModalFeedBack}>
                    <FeedbackLine/>
                    FeedBack
                </FeedBackButton> 
            </Main>
        </Container>

        <Modal isOpen={modalHome} onClose={toggleModalHome}>
            <Trash>
            <ReturnDownBack/>
                <h2>Va para a home</h2>
                <p>Tem certeza que quer voltar para a home?</p>
                <div>
                    <button onClick={toggleModalHome} className="cancelar">Cancelar</button>
                    <button onClick={goToHome} className="confirmar">Confirmar</button>
                </div>
            </Trash>
        </Modal>

        <Modal isOpen={modalLogout} onClose={toggleModalLogout}>
            <Trash>
            <ExitOutline/>
                <h2>Logout</h2>
                <p>Tem certeza que quer deslogar sua conta?</p>
                <div>
                    <button onClick={toggleModalLogout} className="cancelar">Cancelar</button>
                    <button onClick={logout} className="confirmar">Confirmar</button>
                </div>
            </Trash>
        </Modal>

        <Modal isOpen={modalFeedBack} onClose={toggleModalFeedBack}>
            <FeedBack>
                <div>
                    <MessageCheck/>
                    <div onClick={toggleModalFeedBackTanks}>
                        <h2>Ajude-nos a melhorar o LetMeAsk</h2>
                        <p>De um feedback sobre sua experiencia.</p>
                    </div>                   
                </div>
                <div onClick={toggleModalFeedBackHelp}>
                    <AlertTriangle/>
                    <div>
                        <h2>Ocorreu um erro</h2>

                        <p>Informe sobre um recurso com falha.</p>
                    </div>
                </div>
                {user?.id === "37ODF6TglmWJvbuRh6n5rel6I263" && 
                    <Link to="/feedback">
                        <Feed/>
                        <div>
                            <h2>FeedBack recebidos</h2>
                            <p>Confira os novos feedbacks, {user.name}!</p>
                        </div>
                    </Link>
                }
            </FeedBack>    
        </Modal>

        <Modal isOpen={modalFeedBackHelp} onClose={toggleModalFeedBackHelp}>
            <FeedBackHelp>
                <h2>Qual o seu problema?</h2>
                <form onSubmit={handleFeedback}>
                    <textarea 
                        name="message" 
                        placeholder="Nos diga seu erro..." 
                        onChange={event => setNewFeedback(event.target.value)}
                        value={newFeedback}
                    />

                    <div>
                        <button onClick={toggleModalFeedBackHelp}>
                            Cancelar
                        </button>

                        <button type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </FeedBackHelp>
        </Modal>

        <Modal isOpen={modalFeedBackTanks} onClose={toggleModalFeedBackTanks}>
            <FeedBackHelp>
                <h2>Seu feedBack</h2>
                <form onSubmit={handleFeedback}>
                    <textarea 
                        name="message" 
                        placeholder="Nos de dicas de como melhorar!" 
                        onChange={event => setNewFeedback(event.target.value)}
                        value={newFeedback}
                    />

                    <div>
                        <button onClick={toggleModalFeedBackTanks}>
                            Cancelar
                        </button>

                        <button type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </FeedBackHelp>
        </Modal>
        </>
    );
};