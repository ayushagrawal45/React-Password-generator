import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const[length,setLength] = useState(8);
  const[numberallowed,setnumberallowed]=useState(false);
  const[characterallowed,setcharacterallowed]=useState(false);
  const[Password,setpassword]=useState("")

  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str+="0123456789"
    if(characterallowed) str+= "!@#$%^&*-_+=[]{}~`"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random() * str.length +1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
  }, [length,numberallowed,characterallowed,setpassword])

  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    passwordgenerator()
  },[length,numberallowed,characterallowed,passwordgenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
         <h1 className='text-white text-center my-3'>Password generator</h1>
         <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
           type="text"
            value={Password}  //jo humne password value set rakhi hai vo yaha ayegi
           className="outline-none w-full py-1 px-3"
           placeholder="Password"
            ref={passwordRef}
           readOnly
           />
           <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>

           
         </div>
         <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" //range ka input type
            min={6}
            max={100}
            value={length}  //.force the input's value to match the state variable...v
            className="cursor-pointer"  
            onChange={(e)=>{setLength(e.target.value)}}  // and update the state variable on any edits!
            />
            <label >length:{length}</label>
            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox" 
              defaultChecked={numberallowed}
              id='numberInput'
              onChange={()=>{
                setnumberallowed((prev)=>!prev)
              }}
              />
              <label htmlFor="numberinput">Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox" 
              defaultChecked={characterallowed}
              id='characterInput'
              onChange={()=>{
                setcharacterallowed((prev)=>!prev)   //event fire like(=>) agar isme apan inle true dalte tp hmesa true rheta
              }}
              />
              <label htmlFor="numberinput">character</label>
            </div>
          </div>
         </div>
      </div>
    </>
  )
}

export default App
