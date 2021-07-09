import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import logoimg from '../../assets/logoLigth.svg';
import logoimgDark from '../../assets/logoDark.svg';

import { AiOutlineHeart, AiOutlineCheck } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { TiDeleteOutline } from 'react-icons/ti'
import { CgTrash } from 'react-icons/cg';

import { Container, Header, Conteudo } from './styles';
import { Trash } from '../../styles/ModalStyles'

import { Button } from '../../components/Button'
import { Tooltip } from '../../components/Toolltip';
import { CopyRoomCode } from '../../components/CopyCode';
import { QuestionArea } from '../../components/QuestionArea';
import { Modal } from '../../components/Modal';
import { SideBar } from '../../components/SideBar';

import { useAuth } from '../../hooks/auth';
import { useRoom } from '../../hooks/useRoom';

import { database } from '../../services/firebase';
import { useTheme } from '../../hooks/useTheme';

type RoomParams = {
    id: string;
}

export function Room() {

    const { theme } = useTheme();

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
    };

    async function hadleLikeQuestion(questionId: string, likeId: string | undefined) {        
        if(likeId) {
            database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
        } else {
            database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user?.id
            })
        }
    };

    async function handleDeleteQuestion(questionId: string) {
        toggleModal();   
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();           
    };

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
    };

    async function newLogin() {
        if(!user){
          await  signInWithGoogle();
        }
    };

    return (
        <>
        <Container>
            <Conteudo>
                <Header>
                    {theme.title === 'light' ? <img src={logoimg} alt="LetMeAsk"/> : <img src={logoimgDark} alt="LetMeAsk"/>}                    

                    <div className="title">
                        <h1>{title}</h1> 
                        <div>--</div>  
                        <CopyRoomCode  code={roomId}/>         
                    </div>
                </Header>
                
                <main>
                    <div className="question-list">
                        { questions.length === 0 ? (

                            <div className="emptyQuestion">
                                <BiMessageSquareDetail/>
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
                </main>

                <section>             
                    <form onSubmit={handleSendQuestion}>
                        { user ? (
                            <img src={user.avatar} alt={user.id}/>
                        ) : (
                            <p>Para enviar uma mensagem, <button onClick={newLogin}>Faça seu login</button></p>
                        )}                  

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
        </>
    )
}; 
