import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'

// components
import Grid from './Grid'
import Kpad from './Kpad'
import Modal from './Modal'

export default function Wordle({ solution }) {
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordle(solution)
  
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if(isCorrect){
      setTimeout(()=> setShowModal(true), 2000)
          //console.log('Congratulations, you win')
      window.removeEventListener('keyup', handleKeyup)
    }

    if(turn>5){
      //console.log('out of guesses, Better luck next time')
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  

  return (
    // <div>
    //   <div>solution - {solution}</div>
    //   <div>Current Guess - {currentGuess}</div>
    //   <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
    //   <Kpad usedKeys={usedKeys} />
    //   {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    // </div>
    <div>
      
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Kpad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  )
}