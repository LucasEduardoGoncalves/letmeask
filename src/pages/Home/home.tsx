import { FormEvent, useState } from 'react';

import illustration from '../../assets/illustration.svg';
import logoimg from '../../assets/logoLigth.svg';
import logoimgDark from '../../assets/logoDark.svg';
import google from '../../assets/google-icon.svg'; 

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

import { Button } from '../../components/Button';
import { database } from '../../services/firebase';

import { useTheme } from '../../hooks/useTheme';

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    const { theme } = useTheme();

    async function createNewRoom() {
        if(!user){
          await  signInWithGoogle();
        }
        
        history.push('/rooms/new');
    };

    async function joinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exist.');
            return;
        }

        if(roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`rooms/${roomCode}`);
    }

    return(
        <Container>
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