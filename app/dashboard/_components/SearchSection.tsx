import { Search } from 'lucide-react';

function SearchSection({ onSearchInput }: { onSearchInput: (value: string) => void }) {
  return (
    <div className='p-6 md:p-10 bg-gradient-to-br from-purple-500 via-purple-700 
    to-blue-600 flex flex-col justify-center items-center text-white'>
      <h2 className='text-2xl md:text-3xl font-bold'>Browse All Templates</h2>
      <p className='text-center'>What would you like to create today?</p>
      <div className='w-full flex justify-center'>
        <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-full md:w-[50%]'>
          <Search className='text-primary' />
          <input
            type="text"
            placeholder='Search'
            onChange={(event) => onSearchInput(event.target.value)}
            className='bg-transparent w-full outline-none text-black'
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
