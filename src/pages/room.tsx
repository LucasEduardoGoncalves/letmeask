import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import emptyQuestions from '../assets/empty-questions.svg';

import { AiOutlineHeart } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'
import { CgTrash } from 'react-icons/cg';

import { PageRoom } from '../styles/styles';

import { Button } from '../components/Button'

import logoimg from '../assets/logo.svg';

import Tooltip from '../components/Toolltip';

import { CopyRoomCode } from '../components/CopyCode';
import { useAuth } from '../hooks/auth';
import { database } from '../services/firebase';

import { QuestionArea } from '../components/QuestionArea';
import { useRoom } from '../hooks/useRoom';

import Modal from '../components/Modal';

import { Trash } from '../styles/ModalStyles'

type RoomParams = {
    id: string;
}

export function Room() {

    const [isModalOPen, setModalState] = useState(false);
    const toggleModal = () => setModalState(!isModalOPen);
    
    const params = useParams<RoomParams>()
    const roomId = params.id;
    
    const { user, signInWithGoogle } = useAuth();
    const { questions, title } = useRoom(roomId);

    const [newQuestion, setNewQuestion] = useState('');

    const [setQuestion, setSetQuestion] = useState('');
    function setQuestionFunction(questionId: string) {
        setSetQuestion(questionId);
        toggleModal();
    }

    async function hadleLikeQuestion(questionId: string, likeId: string | undefined) {
        
        if(likeId) {
            database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
        } else {
            database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user?.id
            })
        }
    }

    async function handleDeleteQuestion(questionId: string) {
        toggleModal();   
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();           
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

        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');
    }

    async function newLogin() {
        if(!user){
          await  signInWithGoogle();
        }
    };

    return (
        <PageRoom>
            <header>
                <div className="content" >
                    <img src={logoimg} alt="LetMeAsk" />
                    <CopyRoomCode  code={roomId}/>
                </div>
            </header>

            <section>
                <div className="div-title">
                    <h1> - {title} -</h1>
                    {/* {questions.length > 1 && <span>{questions.length} perguntas</span>} */}
                    
                </div>

                <form onSubmit={handleSendQuestion}>
                    <input 
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    placeholder="Envie uma mensagem..."
                    />

                    <div>
                        { user ? (
                            <div className="user-info"> 
                                <img src={user.avatar} alt={user.id}/>
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <p>Para enviar uma mensagem, <button onClick={newLogin}>Faça seu login</button>.</p>
                        )}
                        <Button type="submit" disabled={!user}>Enviar mensagem</Button>
                    </div>
                </form>
                
                <div className="question-list">
                    { questions.length === 0 ? (

                        <div className="emptyQuestion">
                            <img src={emptyQuestions} alt="Sem nem uma Mensagem"/>
                            <h2>Sem mensagens por aqui...</h2>
                            <p>Envie o codigo da sala para seus amigos, e comece a trocar mensagens!</p>
                        </div>

                    ) : questions.map(question => { 
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
                                    {question.author.name === user?.name && 
                                        <Tooltip title="Apagar mensagem">
                                            <CgTrash size={25} className="trash" onClick={() => setQuestionFunction(question.id)}/>
                                        </Tooltip>
                                    }
                                    

                                    <button 
                                        onClick={() => hadleLikeQuestion(question.id, question.likeId)} 
                                        className={`like-button ${question.likeId ? 'liked' : ''}`} 
                                        type="button" 
                                        aria-label="marcar como gostei"
                                    >
                                       
                                    <Tooltip title="Dar amei">
                                        <AiOutlineHeart size={25}/>
                                    </Tooltip>
                                        {question.likeCount > 1 && <span>{question.likeCount}</span>}
                                    </button>
                                </>
                                }                            
                            </QuestionArea>
                        )
                    })}
                    
                </div>

            </section>

            <Modal isOpen={isModalOPen} onClose={toggleModal}>
                <Trash>
                    <TiDeleteOutline/>
                    <h2>Apagar mensagem</h2>
                    <p>Tem certeza que quer apagar a mensagem?</p>
                    <div>
                        <button onClick={toggleModal} className="cancelar">Cancelar</button>
                        <button onClick={() => handleDeleteQuestion(setQuestion)} className="confirmar">Confirmar</button>
                    </div>
                </Trash>               
            </Modal>
        </PageRoom>

        //() => handleDeleteQuestion(question.id)


    )
} 
