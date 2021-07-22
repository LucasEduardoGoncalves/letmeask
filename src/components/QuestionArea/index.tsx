import { ReactNode } from 'react';
import { Container } from './styles';

import { BsArrow90DegRight } from 'react-icons/bs';

type QuestionProps = {
    content: string;
    id?: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isHighlighted?: boolean;
    isAnswer?: boolean;
    response?: string;
    responseId?: string;
}

export function QuestionArea({content, author, children, isHighlighted = false, isAnswer = false, response, responseId , id}: QuestionProps) {
    return (
    <>
        <Container className={`${isHighlighted ? 'highlighted' : ''} ${isAnswer ? 'answer' : ''}`} id={id}>

            {response ? <a href={`#${responseId}`} className="response"><BsArrow90DegRight/> <div>{response}</div></a>: null}

            {content.includes('http://') || content.includes('https://') ? 
                <a href={content} rel="noreferrer" target="_blank">{content}</a> 
            : 
                <textarea readOnly value={content}></textarea>
            }
            
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <p>{author.name}</p>                   
                </div>
                <div className="children">{children}</div>
            </footer>
        </Container>
    </>
    )
}