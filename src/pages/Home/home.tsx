import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { ImGoogle } from 'react-icons/im';

import illustration from '../../assets/illustration.svg';
import logoimg from '../../assets/logoLigth.svg';
import logoimgDark from '../../assets/logoDark.svg';

import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/useTheme';

import { Container } from './styles';

import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';

import { database } from '../../services/firebase';


export function Home() {

    const history = useHistory();

    const { user, signInWithGoogle } = useAuth();
    const { theme, styledToast } = useTheme();

    const [ roomCode, setRoomCode ] = useState('');  
    const [ loading, setLoading ] = useState(false);

    useEffect( () => {
        if (user) toast.success(`Seja bem vindo, ${user?.name}`, styledToast)
    }, [user, styledToast]);

    async function createNewRoom() {
        if(!user){
          await signInWithGoogle();
        };
        history.push('/rooms/new');
    };

    async function joinRoom(event: FormEvent) {
        event.preventDefault();

        setLoading(true);

        if(roomCode.trim() === '') {
            toast.error('Preencha o campo e tente novamente.', styledToast);
            setLoading(false);
            return;
        };

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            toast.error('A sala não existe.', styledToast);
            setLoading(false);
            return;
        };

        if(roomRef.val().endedAt) {
            toast.error('A sala já foi fechada.', styledToast);
            setLoading(false);
            return;
        };

        history.push(`rooms/${roomCode}`);
        setLoading(false);
    };

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
                        <ImGoogle/>
                        <div> Crie sua sala com o Google </div> 
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
                            {loading ? <Loading/> : <div>Entrar na sala</div>}                          
                        </Button>
                    </form>
                </section>
            </main>
        </Container>
    )
}