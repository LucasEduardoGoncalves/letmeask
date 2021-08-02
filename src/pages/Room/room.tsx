import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import ReactScrollableFeed from 'react-scrollable-feed';

import icon from '../../assets/iconDark.svg';
import iconligh from '../../assets/icon.svg';

import logoimg from '../../assets/logoLigth.svg';
import logoimgDark from '../../assets/logoDark.svg';

import { Delete } from '../../styles/Icons/icons';

import { AiOutlineCheck, AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsArrow90DegLeft } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti'
import { CgTrash } from 'react-icons/cg';

import { Container, Header, Conteudo, ResponseQuestion } from './styles';
import { Trash } from '../../styles/ModalStyles'

import { Button } from '../../components/Button'
import { Tooltip } from '../../components/Toolltip';
import { CopyRoomCode } from '../../components/CopyCode';
import { QuestionArea } from '../../components/QuestionArea';
import { Modal } from '../../components/Modal';
import { SideBar } from '../../components/SideBar';

import { useAuth } from '../../hooks/auth';
import { useRoom } from '../../hooks/useRoom';
import { useTheme } from '../../hooks/useTheme';

import { database } from '../../services/firebase';

type RoomParams = {
    id: string;
}

export function Room() {

    const { theme } = useTheme();

    const [isModalOPen, setModalState] = useState(false);
    const toggleModal = () => setModalState(!isModalOPen);
    
    const params = useParams<RoomParams>()
    const roomId = params.id;
    
    const { user } = useAuth();
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

    
    const [respondendo, setRespondendo] = useState('');
    const [idResponse, setIdResponse] = useState('');
    function response(resposta: string, idResponse: string) {
        setRespondendo(resposta);
        setIdResponse(idResponse);
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
            isAnswer: false,
            response: respondendo,
            responseId: idResponse
        };

        setNewQuestion('');
        setRespondendo('');
        setIdResponse('');
        await database.ref(`rooms/${roomId}/questions`).push(question);   
    };

    return (
        <>
        <Container>
            <Conteudo>
                <Header>
                    {theme.title === 'light' ? <img src={logoimg} alt="LetMeAsk"/> : <img src={logoimgDark} alt="LetMeAsk"/>}                    

                    <div className="title">
                        <h1>{title}</h1> 
                        <CopyRoomCode  code={roomId}/>         
                    </div>
                </Header>                    
                
                <main>
                    <ReactScrollableFeed className="question-list">
                        { questions.length === 0 ? (

                            <div className="emptyQuestion">
                                <BiMessageSquareDetail/>
                                <h2>Sem mensagens por aqui...</h2>
                                <p>Envie o codigo da sala para seus amigos, e comece a trocar mensagens!</p>
                            </div>

                        ) : 
                            questions.map(question => 

                                <QuestionArea 
                                    key={question.id}
                                    id={question.id}
                                    content={question.content}
                                    author={question.author}
                                    isAnswer={question.isAnswer}
                                    isHighlighted={question.isHighlighted}
                                    response={question.response}
                                    responseId={question.responseId}
                                >
                                     
                                             
                                        <button 
                                            onClick={() => hadleLikeQuestion(question.id, question.likeId)} 
                                            className={`like-button ${question.likeId ? 'liked' : ''}`} 
                                            type="button" 
                                            aria-label="marcar como gostei"
                                        >
                                            {question.likeId ?
                                                <Tooltip title={`${question.likeCount} likes`}>                                                                  
                                                    <AiFillLike size={25}/>                                         
                                                </Tooltip>     
                                            : 
                                                <Tooltip title="Dar like">
                                                    <AiOutlineLike size={25}/>
                                                </Tooltip>   
                                            }                         
                                        </button>
                                        
                                        {user && 
                                            <Tooltip title="Responder">
                                                <BsArrow90DegLeft size={25} onClick={() => response(question.content, question.id)}/>
                                            </Tooltip>
                                        }                             

                                        {question.author.name === user?.name && 
                                            <Tooltip title="Apagar mensagem">
                                                <CgTrash size={25} className="trash" onClick={() => setQuestionFunction(question.id)}/>
                                            </Tooltip>
                                        }                                                                
                                </QuestionArea>
                               
                            )}     
                        {respondendo !== '' && 
                            <ResponseQuestion>
                                <Delete onClick={() => setRespondendo('')}/>
                                {respondendo}
                            </ResponseQuestion>
                            }
                </ReactScrollableFeed>
                </main>

                <section>      
                    <form onSubmit={handleSendQuestion}>
                        
                        { user ? (
                            <img src={user.avatar} alt={user.id}/>
                        ) : (
                            <>{theme.title === 'light' ? <img src={iconligh} alt="Seu avatar" /> : <img src={icon} alt="Seu avatar" />}</>
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