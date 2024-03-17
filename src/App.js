import {useCallback, useEffect, useRef, useState} from 'react';

function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllowed)
        str += "0123456789";
      if(charAllowed)
        str += "!~@#$%^&*()_+|";

      for(let i = 1; i <= length; i++){
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char)
      }
      setPassword(pass)
  }, [length,numberAllowed,charAllowed])

useEffect(() => {
  passwordGenerator()
}, [length,numberAllowed, charAllowed])


//useRef hook
const passwordRef = useRef(null);

const copyPasswordToClip = useCallback(() => {
  window.navigator.clipboard.writeText(password);
  passwordRef.current?.select();
}, [])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center mb-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'> 
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          onChange={() => {}}
          placeholder="password"
          readOnly
          ref={passwordRef}
          >
          </input>
          <button className='outline-none text-white bg-blue-600 px-3 py-0.5'
          onClick={copyPasswordToClip}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2' >
            <div className='flex items-center gap-x-1'>
              <input 
                type='range'
                min={8}
                max={50}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}
              ></input>
              <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
                type='checkbox'
                defaultChecked={numberAllowed}
                onChange={() => {setNumberAllowed((prev) => !prev)}}
              ></input>
              <label>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
                type='checkbox'
                defaultChecked={charAllowed}
                onChange={() => {setCharAllowed((prev) => !prev)}}
              >
              </input>
              <label>SpecCharacters</label>
            </div>
        </div>
      </div>
    </>
  )
} 

export default App;
