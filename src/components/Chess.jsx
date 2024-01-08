import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function Chess() {

    const { gameId } = useParams();

    useEffect(() => {
        console.log('Chess game with id : ', gameId);
    },[])

  return (
    <div>Chess</div>
  )
}

export default Chess