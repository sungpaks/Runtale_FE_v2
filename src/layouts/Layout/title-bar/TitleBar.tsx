import { useNavigate } from 'react-router-dom';
import "./TitleBar.css";

export default function TitleBar({ hasPreviousButton }: { hasPreviousButton: boolean; }) {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate('/home');
    };

    return (
        <div className="title-bar">
            {hasPreviousButton ? <div>^</div> : undefined}
            <h2 onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
                👟RunTale
            </h2>
        </div>
    );
}
