const MemeGeneratedContainer = ( {url} ) => {
    return (
        <div className="result">
            <div>Here is your generated meme :</div>
            <img className="result" src={url} alt="Personalized Meme"/>
        </div>
    );
};

export default MemeGeneratedContainer;