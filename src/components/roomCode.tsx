import copyImg from '../assets/copy.svg'
import { CopyCode } from '../styles/stylesComponents';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipeBoard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <CopyCode onClick={copyRoomCodeToClipeBoard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>{props.code}</span>
        </CopyCode>
    )
}