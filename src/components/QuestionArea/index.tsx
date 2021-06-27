import { ReactNode } from 'react';
import { Container } from './styles';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isHighlighted?: boolean;
    isAnswer?: boolean;
}

export function QuestionArea({content, author, children, isHighlighted = false, isAnswer = false}: QuestionProps) {
    return (
        <Container className={`${isHighlighted ? 'highlighted' : ''} ${isAnswer ? 'answer' : ''}`}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <p>{author.name}</p>
                </div>
                <div className="children">{children}</div>
            </footer>
        </Container>
    )
}