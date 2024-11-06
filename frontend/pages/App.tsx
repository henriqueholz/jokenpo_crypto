import { useState, useEffect } from 'react';
import { Leaderboard, Options, play, getLeaderboard, listenEvent, getBestPlayers } from '../services/Web3Service';
import Header from '../components/Header';
import Image from 'next/image';

function App() {

  const [message, setMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState<Leaderboard>();

  useEffect(() => {
    getLeaderboard()
      .then(leaderboard => setLeaderboard(leaderboard))
      .catch(err => setMessage(err.message));

    listenEvent((result: string) => {
      getBestPlayers()
        .then(players => setLeaderboard({ players, result } as Leaderboard))
        .catch(err => setMessage(err.message))
    });
  }, [])

  function onPlay(option: Options) {
    setLeaderboard({ ...leaderboard, result: "Sending your choice..." });
    play(option)
      .catch(err => setMessage(err.message));
  }

  return (
    <div className="container mx-auto px-4">
      <Header />
      <main>
        <div className="py-5 text-center">
          <img className="block mx-auto mb-4" src="/logo512.png" alt="JoKenPo" width="72" />
          <h2 className="text-2xl font-bold">Leaderboard</h2>
          <p className="text-lg">Check the best players' score and play the game.</p>
          <p className="text-red-600">{message}</p>
        </div>
        <div className='w-full lg:w-3/4 mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <h4 className='mb-3 text-xl font-semibold'>Best Players</h4>
              <div className='bg-white p-4 shadow rounded'>
                <table className='w-full table-auto text-left'>
                  <thead>
                    <tr>
                      <th className='border-b-2 border-gray-200 py-2'>Player</th>
                      <th className='border-b-2 border-gray-200 py-2'>Wins</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      leaderboard && leaderboard.players && leaderboard.players.length
                        ? leaderboard.players.map(p => (<tr key={p.wallet}><td className='py-2'>{p.wallet}</td><td className='py-2'>{p.wins.toString()}</td></tr>))
                        : <tr><td colSpan={2} className='py-2'>Loading...</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h4 className='mb-3 text-xl font-semibold'>Games</h4>
              <div className='bg-white p-4 shadow rounded'>
                <h5 className='mb-3 text-blue-500'>Current Status:</h5>
                <div className='bg-green-100 text-green-800 p-3 rounded'>
                  {
                    leaderboard && leaderboard.result
                      ? leaderboard.result
                      : "Loading..."
                  }
                </div>
                <h5 className='mb-3 text-blue-500'>
                  {
                    leaderboard && leaderboard.result?.indexOf("won") !== -1 || !leaderboard?.result
                      ? "Start a new game:"
                      : "Play this game:"
                  }
                </h5>
                <div className='flex gap-3'>
                  <div className='w-1/3'>
                    <div className='bg-blue-200 p-3 cursor-pointer' onClick={() => onPlay(Options.PAPER)}>
                      <Image src="/paper.png" width={100} height={100} alt="Paper" className='block mx-auto' />
                    </div>
                  </div>
                  <div className='w-1/3'>
                    <div className='bg-blue-200 p-3 cursor-pointer' onClick={() => onPlay(Options.ROCK)}>
                      <Image src="/rock.png" width={100} height={100} alt="Rock" className='block mx-auto' />
                    </div>
                  </div>
                  <div className='w-1/3'>
                    <div className='bg-blue-200 p-3 cursor-pointer' onClick={() => onPlay(Options.SCISSORS)}>
                      <Image src="/scissors.png" width={100} height={100} alt="Scissors" className='block mx-auto' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
