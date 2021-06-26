import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import illustration from '../assets/illustration.svg';
import logoimg from '../assets/logo.svg';

import { ContainerHome } from '../styles/styles';
import { Button } from '../components/button';

import { database } from '../services/firebase';

export function NewRoom() {

    const { user } = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');
    
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if(newRoom.trim() === '' ){
            return;
        };

        const roomRef = database.ref('rooms');

        const firebaseRooms = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/admin/rooms/${firebaseRooms.key}`);
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
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input 
                          type="text"
                          placeholder="Nome da sala"
                          onChange={event => setNewRoom(event.target.value)}
                          value={newRoom}
                        />

                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>

                    <p>Quer entrar em uma sala já existente? <Link to="/" >Clique aqui</Link></p>
                </section>
            </main>
        </ContainerHome>
    )
}