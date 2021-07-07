import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { Container } from './styled';
import { FeedBack, FeedBackHelp } from '../../styles/ModalStyles';

import { Modal } from '../Modal';

import { FiSun, FiMoon, FiAlertTriangle } from 'react-icons/fi';
import { RiFeedbackLine, RiArrowDropLeftLine } from 'react-icons/ri';
import { BiMessageRoundedCheck } from 'react-icons/bi';
import { CgFeed } from 'react-icons/cg';
import { IoReturnDownBack } from 'react-icons/io5';
import { BsGear } from 'react-icons/bs';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/auth';

import { database } from '../../services/firebase';

export const SideBar = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const notify = () => toast.success('Feedback enviado com sucesso',
    {
        style: {
          border: `1px solid ${theme.toast.borderColor}`,
          padding: '16px',
          color: `${theme.toast.textColor}`,
          background: `${theme.toast.background}`,
        },
        iconTheme: {
          primary: `${theme.toast.icon.cor1}`,
          secondary: `${theme.toast.icon.cor2}`,
        }
    });

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
        notify();
        setModalFeedBackTanks(false);
        setModalFeedBackHelp(false);  
    };

    return (
        <>
        <Toaster/>
        <Container>
            <div className="arrow">
                <RiArrowDropLeftLine/>         
            </div>

            <header>
                <img src={user?.avatar} alt="Seu avatar" />
                <h4>{user?.name}</h4>              
            </header>

            <main>  
                <button onClick={toggleTheme}>
                    {theme.title === 'dark' ? <FiMoon/> : <FiSun/>}
                    Temas
                </button>

                <Link to="/">
                    <IoReturnDownBack/>
                    Home
                </Link>

                <div>
                    <BsGear/>
                    Configurações
                </div>

                <button onClick={toggleModalFeedBack}>
                    <RiFeedbackLine/>
                    FeedBack
                </button>
            </main>
        </Container>

        <Modal isOpen={modalFeedBack} onClose={toggleModalFeedBack}>
            <FeedBack>
                <div>
                    <BiMessageRoundedCheck/>
                    <div onClick={toggleModalFeedBackTanks}>
                        <h2>Ajude-nos a melhorar o LetMeAsk</h2>
                        <p>De um feedback sobre sua experiencia.</p>
                    </div>                   
                </div>
                <div onClick={toggleModalFeedBackHelp}>
                    <FiAlertTriangle/>
                    <div>
                        <h2>Ocorreu um erro</h2>

                        <p>Informe sobre um recurso com falha.</p>
                    </div>
                </div>
                {user?.id === "37ODF6TglmWJvbuRh6n5rel6I263" && 
                    <Link to="/feedback">
                        <CgFeed/>
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
                        placeholder="Nos figa seu erro..." 
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