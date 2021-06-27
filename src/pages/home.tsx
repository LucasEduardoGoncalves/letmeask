import { FormEvent, useState } from 'react';

import illustration from '../assets/illustration.svg';
import logoimg from '../assets/logo.svg';
import google from '../assets/google-icon.svg'; 

import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import { ContainerHome } from '../styles/styles';

import { Button } from '../components/Button';
import { database } from '../services/firebase';

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

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
        <ContainerHome>
            <aside>
                <img src={illustration} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo real</p>
            </aside>

            <main>
                <section>
                    <img src={logoimg} alt="Imagem da logo"/>

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
        </ContainerHome>
    )
}