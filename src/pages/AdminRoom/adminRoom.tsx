import { FormEvent, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Conteudo, Header } from './styles';
import toast, { Toaster } from 'react-hot-toast';

import { SideBar } from '../../components/SideBar';
import { Button } from '../../components/Button'
import { CopyRoomCode } from '../../components/CopyCode';
import { QuestionArea } from '../../components/QuestionArea';

import logoimg from '../../assets/logoLigth.svg';
import logoimgDark from '../../assets/logoDark.svg';
import deleteImg from '../../assets/delete.svg';
import checkImg from '../../assets/check.svg';
import answer from '../../assets/answer.svg';

import { useRoom } from '../../hooks/useRoom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/auth';

import { AiOutlineCheck } from 'react-icons/ai';

import { database } from '../../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    
    const params = useParams<RoomParams>()
    const roomId = params.id;

    const { theme } = useTheme();
    const { user } = useAuth();
    
    const { questions, title, authorId } = useRoom(roomId); 
    const history = useHistory();

    const [newQuestion, setNewQuestion] = useState('');


    useEffect(() => {
        if(user?.id !== authorId) {
            toast.error('Usario com erro');
            console.log(user?.id);
            console.log(authorId);
        }
    },[user?.id, authorId, history])

    async function handleDeleteQuestion(questionId: string) {
       if(window.confirm('Tem certeza que deseja deletar essa pergunta?')){
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
       }
    }

    async function handleCheckQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({           
            isHighlighted: true
        });
    }

     async function handleAnswerQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswer: true
        });
    }

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }

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

        setNewQuestion('');
        await database.ref(`rooms/${roomId}/questions`).push(question);   
    };

    return (
        <Container>
            <Toaster/>
            <Conteudo>
                <Header>
                    {theme.title === 'light' ? <img src={logoimg} alt="LetMeAsk"/> : <img src={logoimgDark} alt="LetMeAsk"/>}                    

                    <div className="title">
                        <h1>{title}</h1> 
                        <div>--</div>  
                        <CopyRoomCode  code={roomId}/>     
                        <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>    
                    </div>
                </Header>

                <main>
                    <div className="question-list">
                        { questions.map(question => { 
                            return (
                                <QuestionArea 
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                    isAnswer={question.isAnswer}
                                    isHighlighted={question.isHighlighted}
                                >                               
                                    
                                    <button onClick={() => handleCheckQuestion(question.id)} type="button">
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                    </button>

                                    <button onClick={() => handleAnswerQuestion(question.id)} type="button">
                                        <img src={answer} alt="Dar foco para a pergunta" />
                                    </button>
                                  
                                    <button onClick={() => handleDeleteQuestion(question.id)} type="button">
                                        <img src={deleteImg} alt="Excluir Pergunta" />
                                    </button>
                                </QuestionArea>
                            )
                        })}
                    </div>
                </main>

                <section>             
                    <form onSubmit={handleSendQuestion}>
                        <img src={user?.avatar} alt={user?.id}/>               

                        <input 
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                        placeholder="Envie uma mensagem..."
                        />

                        <Button type="submit" disabled={!user}><AiOutlineCheck/></Button>        
                    </form>
                </section>
            </Conteudo>
            <SideBar/>
        </Container>
    )
};