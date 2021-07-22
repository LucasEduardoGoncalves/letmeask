import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { Container } from './styles';

import { Loading } from '../../components/Loading';
import { Button } from '../../components/Button';

import illustration from '../../assets/illustration.svg';
import logoimg from '../../assets/logoLigth.svg';
import logoimgDark from '../../assets/logoDark.svg';

import { database } from '../../services/firebase';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/auth';

export function NewRoom() {
   
    const history = useHistory();

    const { user } = useAuth();
    const { theme, styledToast } = useTheme();
    
    const [newRoom, setNewRoom] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        setLoading(true);

        if(newRoom.trim() === '' ){
            toast.error('Preencha o campo e tente novamente.', styledToast);
            setLoading(false);
            return;
        };

        const roomRef = database.ref('rooms');

        const firebaseRooms = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRooms.key}`);
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
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input 
                          type="text"
                          placeholder="Nome da sala"
                          onChange={event => setNewRoom(event.target.value)}
                          value={newRoom}
                        />

                        <Button type="submit">
                            {loading ? <Loading/> : <div>Criar sala</div>}
                        </Button>
                    </form>

                    <p>Quer entrar em uma sala já existente? <Link to="/" >Clique aqui</Link></p>
                </section>
            </main>
        </Container>
    )
}