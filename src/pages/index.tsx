import Image from 'next/image'

export default function Home() {
  return (
    <main className="container max-w-md mx-auto p-2 mt-4 bg-gray-900">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center justify-center p-3 bg-blue-500 rounded">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            alt="pokemon image"
            width={500}
            height={500}
          />
          <div className='text-white font-bold'>Squirtle</div>
        </div>
      </div>
    </main>
  )
}
