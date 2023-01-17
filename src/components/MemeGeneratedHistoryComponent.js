import './styles/MemeGeneratedHistoryComponent.css';
import Tooltip from '@mui/material/Tooltip';

const handleTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp))
    const dateFormat = date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + ", "+ date.toDateString();
    return dateFormat
}

const MemeGeneratedHistoryComponent = ( {pastMemes} ) => {
    return (
        <div>
            <h4>List of previously generated memes</h4>
            <div className="history">
                {pastMemes.map((meme)=>{
                    return <div className="historyElem">
                        <Tooltip title={"Creation Date: " + handleTimestamp(meme.creation_date)} placement="top">
                            <img src={meme.url} key={meme.url} alt={meme.url}/>
                        </Tooltip>
                        </div>
                })}
            </div>
        </div>
        );
};

export default MemeGeneratedHistoryComponent;