import { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PageRoom } from '../styles/styles';

import { Button } from '../components/button'

import logoimg from '../assets/logo.svg';

import { RoomCode } from '../components/roomCode';
import { useAuth } from '../hooks/auth';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswer: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswer: boolean;
}

export function Room() {
    
    const params = useParams<RoomParams>()
    const roomId = params.id;
    
    const { user } = useAuth();

    const [newQuestion, setNewQuestion] = useState('');

    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswer: value.isAnswer,
                }
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId])

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        };

        if(!user){
            throw new Error('You must be logged in.');
        };

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,                
            },
            isHighlighted: false,
            isAnswer: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <PageRoom>
            <header>
                <div className="content">
                    <img src={logoimg} alt="LetMeAsk" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <section>
                <div>
                    <h1> - {title} -</h1>
                    {questions.length > 1 && <span>{questions.length} perguntas</span>}
                    
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    placeholder="O que você quer perguntar?"
                    />

                    <div>
                        { user ? (
                            <div className="user-info"> 
                                <img src={user.avatar} alt={user.id}/>
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <p>Para fazer uma pergunta, <button>Faça seu login</button>.</p>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
            </section>
        </PageRoom>
    )
} 