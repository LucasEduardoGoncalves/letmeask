import { useState, useEffect } from "react";

import { Container, Header, Conteudo, Feedback } from './styles';

import svgError from '../../assets/404.svg';
import logoimg from '../../assets/logoLigth.svg';
import logoimgDark from '../../assets/logoDark.svg';

import { TiDeleteOutline } from 'react-icons/ti'

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from "../../hooks/auth";

import { database } from "../../services/firebase";
import { SideBar } from '../../components/SideBar';


type FeedbackType = {
    id: string,
    author: {
        name: string,
        avatar: string,
        id: string,  
    }
    content: string,
}

type FirebaseFeedback = Record<string, {
    id: string,
    author: {
        name: string,
        avatar: string,
        id: string,  
    }
    content: string,
}>

export const FeedBack = () => {
    const [feedback, setFeedback] = useState<FeedbackType[]>([]);
    const { theme } = useTheme();
    const { user }  = useAuth();
    
    async function handleDeleteQuestion(feedbackID: string) {   
        await database.ref(`/feedback/${feedbackID}`).remove();           
    };

    useEffect(() => {       
        const roomRef = database.ref(`/feedback`);

            roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseFeedback = databaseRoom ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value]) => {
                return {
                    id: key,
                    author: {
                        name: value.author.name,
                        avatar: value.author.avatar,
                        id: value.author.id,
                    },
                    content: value.content
                }
            });
            setFeedback(parsedQuestions);
            
        })
    }, []);
    
    return (
    <>
        {user?.id === "37ODF6TglmWJvbuRh6n5rel6I263" ? (
            <Container>
                <Conteudo>
                    <Header>
                        <div className="content" >
                            {theme.title === 'light' ? <img src={logoimg} alt="LetMeAsk"/> : <img src={logoimgDark} alt="LetMeAsk"/>}
                            <h2>Feedbacks</h2>
                        </div>                      
                    </Header>
                    

                    <main>
                        {feedback.map(feedback => {
                            return (
                            <Feedback>
                                <textarea readOnly value={feedback.content}/>
                                <footer>
                                    <div className="user-info">
                                        <img src={feedback.author.avatar} alt={feedback.author.name} />
                                        <p>{feedback.author.name}</p>
                                    </div>
                                    <TiDeleteOutline onClick={() => handleDeleteQuestion(feedback.id)}/>
                                </footer>
                            </Feedback>
                            )
                        })}                             
                    </main>
                </Conteudo>
                <SideBar/>
            </Container>
        ):
            <Container>
                <img src={svgError} alt="error 404" className="error404"/>
            </Container> 
        }
    </>
    )
};