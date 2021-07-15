import { FormEvent, useEffect, useState } from 'react';

import illustration from '../../assets/illustration.svg';
import logoimg from '../../assets/logoLigth.svg';
import logoimgDark from '../../assets/logoDark.svg';
import google from '../../assets/google-icon.svg'; 

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

import { Button } from '../../components/Button';
import { database } from '../../services/firebase';

import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from '../../hooks/useTheme';

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [ roomCode, setRoomCode ] = useState('');
    const { theme } = useTheme();

    const notify = () => toast.success(`Seja bem vindo, ${user?.name}`,
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

    useEffect( () => {
        if (user) notify();
    }, [user]);

    async function createNewRoom() {
        if(!user){
          await  signInWithGoogle();
        }
        
        history.push('/rooms/new');
    };

    async function joinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === '') {
            toast.error("Preencha o campo e tente novamente.",
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
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            toast.error("A sala não existe.",
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
            return;
        }

        if(roomRef.val().endedAt) {
            toast.error("A sala já foi fechada",
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
            return;
        }

        history.push(`rooms/${roomCode}`);
    }

    return(
        <Container>
            <Toaster/>
            <aside>
                <img src={illustration} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de chat ao-vivo</strong>
                <p>Converse com seus amigos em tempo real</p>
            </aside>

            <main>
                <section>
                {theme.title === 'light' ? <img src={logoimg} alt="LetMeAsk"/> : <img src={logoimgDark} alt="LetMeAsk"/>}

                    <button onClick={createNewRoom} className="create-room" type="button">
                        <img src={google} alt="Imagem do Google"/>
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form onSubmit={joinRoom}>
                        <input 
                          type="text"
                          placeholder="Digite o codigo da sala"
                          onChange={event => setRoomCode(event.target.value)}
                          value={roomCode}
                        />

                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </section>
            </main>
        </Container>
    )
}