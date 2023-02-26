import './end.css'

const endGame = (props, resetGame) => {
    return(
        <div className='endGame'>
            <h1>Koniec gry!</h1>
            <p>Odgadnięte hasła:  {props && props.join(', ')}</p>
            <p>Punkty: {props.length}</p>
            <button onClick={resetGame}>Reset</button>
        </div>
    )
}

export default endGame