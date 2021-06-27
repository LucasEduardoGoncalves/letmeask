import { useHistory, useParams } from 'react-router-dom';

import { PageRoom } from '../styles/styles';

import { Button } from '../components/Button'

import logoimg from '../assets/logo.svg';
import deleteImg from '../assets/delete.svg';
import checkImg from '../assets/check.svg';
import answer from '../assets/answer.svg';

import { CopyRoomCode } from '../components/CopyCode';
// import { useAuth } from '../hooks/auth';

import { QuestionArea } from '../components/QuestionArea';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    
    const params = useParams<RoomParams>()
    const roomId = params.id;
    
    // const { user } = useAuth();
    const { questions, title } = useRoom(roomId); 
    const history = useHistory();

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

    return (
        <PageRoom>
            <header>
                <div className="content">
                    <img src={logoimg} alt="LetMeAsk" />
                    <div>
                        <CopyRoomCode code={roomId}/>
                        <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <section>
                <div className="div-title">
                    <h1> - {title} -</h1>
                    {questions.length > 1 && <span>{questions.length} perguntas</span>}
                    
                </div>
                
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
                                {!question.isAnswer && 
                                    <>
                                        <button
                                        onClick={() => handleCheckQuestion(question.id)}
                                        type="button"
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>

                                        <button
                                            onClick={() => handleAnswerQuestion(question.id)}
                                            type="button"
                                        >
                                            <img src={answer} alt="Dar foco para a pergunta" />
                                        </button>
                                    </> 
                                }

                                <button 
                                    onClick={() => handleDeleteQuestion(question.id)}
                                    type="button"
                                >
                                    <img src={deleteImg} alt="Excluir Pergunta" />
                                </button>
                            </QuestionArea>
                        )
                    })}
                </div>
            </section>
        </PageRoom>
    )
};