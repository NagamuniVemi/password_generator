import { useState,useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const [number,setNumber]=useState(false)
  const [character,setCharacter]=useState(false)
  const [password,setpassword]=useState()

  const passwordref=useRef(null)
  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if(character) str+="!@#$%^&*()_+"


    for(let i=0;i<=length;i++)
    {
        let char=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char)
    }
   setpassword(pass)

  },[length,number,character])
  const copypassword=useCallback(()=>{
        passwordref.current?.select()
        window.navigator.clipboard.writeText(password)
  },[password])
    
  useEffect(()=>{passwordgenerator()},[length,number,character,passwordgenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-grey-800'>
        <h1 className='text-white text-center my-3'> passwordgenerator</h1>
        <div className='className="dlex shadow rounded-lg overflow-hidden mb-4"'> 
        <input 
        type="text" 
        value={password}
        placeholder='password'
        className='outline-none w-full py-1 px-3'
        ref={passwordref}
        readOnly
        />
        <button
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copypassword}> copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
              <input 
               type='range'
               min={8}
               max={25}
               className='cursor-pointer'
               onChange={(e)=>{setLength(e.target.value)}}
               />
               <label htmlFor="">length:{length}</label>
          </div>
          <input
          
            type='checkbox'
            defaultChecked={number}
            id='numberinput'
            onChange={()=>{setNumber((prev)=>!prev)}}         
          
          
      />
      <label >numbers</label>
      <input
          
          type='checkbox'
          defaultChecked={character}
          id='charinput'
          onChange={()=>{setCharacter((prev)=>!prev)}}         
        
        
    />
    <label htmlFor="">character</label>
        </div>
           </div>
    </>
  )
}

export default App
