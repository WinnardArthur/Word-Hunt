import "./definitions.css"

const Definitions = ({ word, category, meanings, lightMode  }) => {
    return (
        <div className="meanings">
            {
                meanings[0] && word && category === 'en' &&
                <div style={{width: '100%'}}>
                    {
                        (
                            <audio 
                                src={meanings[0]?.phonetics[0]?.audio || meanings[0]?.phonetics[1]?.audio} 
                                style={{backgroundColor: "#fff", borderRadius: '10px', width: '100%', marginTop: '1rem', marginBottom: '1rem'}}
                                controls    
                            >
                                Your Browser does not support audio element.
                            </audio>
                        )
                    }
                </div>
            }
            { 
                word === "" ? <span className="subTitle">Start by typing a word in Search</span> : (
                    meanings.map((mean) => (
                        mean.meanings.map((item) => (
                            item.definitions.map((def) => (
                                <div className="singleMean"  style={{backgroundColor: lightMode ? "teal" : 'white', color: lightMode ? "white" : 'black'}}>
                                    <div style={{paddingTop: '1rem'}}>
                                        <b>{def.definition}</b>
                                        <hr style={{backgroundColor: 'lavender', width: '100%', marginBottom: '1rem'}} />
                                        <div>
                                            {
                                                def.example && (
                                                    <span>
                                                        <b>Example: </b>
                                                        {def.example}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        {/* {
                                            def.synonyms && (
                                                <span>
                                                    <b>Synonyms: </b>
                                                    {def.synonyms.map((s) => `${s}, `)}
                                                </span>
                                            )
                                        }
                                        {
                                            def.antonyms && (
                                                <span>
                                                    <b>Antonyms: </b>
                                                    {def.antonyms.map((s) => `${s}, `)}
                                                </span>
                                            )
                                        } */}
                                    </div>
                                    <div style={{marginTop: '.5rem'}}>
                                        {
                                            item.synonyms.length > 0 && (
                                                <span>
                                                    <b>Synonyms: </b>
                                                    {item.synonyms.map((s) => `${s}, `)}
                                                </span>
                                            )
                                        }
                                    </div>
                                    <div style={{marginTop: '.5rem'}}>
                                        {
                                            item.antonyms.length > 0 && (
                                                <span>
                                                    <b>Antonyms: </b>
                                                    {item.antonyms.map((s) => `${s}, `)}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        ))
                    ))
                )
            }
        </div>
    )
}

export default Definitions
