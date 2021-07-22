import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./auth";

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
        id: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswer: boolean;
    likeCount: number;
    likeId: string | undefined;
    response?: string;
    responseId?: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
        id: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswer: boolean;
    likes: Record<string, {
        authorId: string;
    }>;
    response?: string;
    responseId?: string;
}>

export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [questions, setQuestions] = useState<QuestionType[]>([]);

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
                    response: value.response,
                    responseId: value.responseId,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],               
                }
            });

            setTitle(databaseRoom.title);
            setAuthorId(databaseRoom.authorId);
            setQuestions(parsedQuestions);
        })

        return () => {
            roomRef.off('value')
        }
    }, [roomId, user?.id, authorId, title])

    return {questions, title, authorId}

}