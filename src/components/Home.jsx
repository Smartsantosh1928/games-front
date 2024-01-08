import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export function Home() {

    const navigate = useNavigate();
    
    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
      }
      

    const handleStart = (id) => {
        const gameId = generateRandomString(64);
        console.log('Starting game with id : ', gameId);
        navigate(`/${id}/${gameId}`);
    }

    const GameData = [
        {
            name: 'Chess',
            description: 'Play chess with a friend or a random stranger.',
            image: '/chess.jpg',
            id: 'chess',
        },
        {
            name: 'Tic Tac Toe',
            description: 'Play tic tac toe with a friend or a random stranger.',
            image: '/ttt.png',
            id: 'ttt',
        }
    ]

  return (
    <div className='w-full h-screen flex justify-center items-center bg-blue-gray-100'>
        <div className='grid grid-cols-2 gap-28'>
            {GameData.map(game => <Card className="w-full">
                <CardHeader floated={false} className="h-80">
                    <img src={game.image} alt="Chess" className='w-full h-full' />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {game.name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        {game.description}
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-5 pt-2">
                    <Button color="blue" variant='gradient' onClick={() => handleStart(game.id)} >Start Game</Button>
                    <Button color="blue" variant='gradient' >Join Game</Button>
                </CardFooter>
            </Card>)}
      </div>
    </div>
  )
}

export default Home