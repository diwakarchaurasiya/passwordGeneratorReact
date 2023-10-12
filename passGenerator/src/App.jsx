import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  let [passLength, setLength] = useState(8) 
  let [numAllowed,setNumAllow]= useState(false)
  let [charAllowed,setCharAllow]= useState(false)
  let [password, setPassword] = useState("")
  let passwordGenerator = useCallback(() => {
    let dataSet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    if (numAllowed) {
      dataSet += "0123465798"
    }
    if (charAllowed) {
      dataSet += "@$!%&*()_"
    }
    let pass = ""
    for (let i = 0; i < passLength; i++){
      let oneChar = dataSet.charAt(Math.round(Math.random() * dataSet.length + 1))
      pass += oneChar
    }
    setPassword(pass);

  }, [passLength, numAllowed, charAllowed, setPassword])

  const refRence = useRef(null)

  useEffect(() => { passwordGenerator() }, [passLength, numAllowed, charAllowed])
  
  const handleCopyToClipboard = () => {
    refRence.current.select();
    navigator.clipboard.writeText(password);
  };
  return (
    <>
      <h1>Password Generator</h1>
      <main>
      <div className="inputField">
<input type="text" placeholder='your Password will appear here' readOnly value={password} ref={refRence} />
<button onClick={handleCopyToClipboard}>Copy</button>
        </div>
        <div id="inputChanges">
          <div id = 'lengthRangeField'>
            <input type='range' id='passLength' min={8} max={20} value={passLength} onChange={(e)=>{setLength(e.target.value)}}/>
            <label>[{ passLength}]</label>
            </div>
        <div id='numberAllowField'>
            <input type='checkbox' id='numberAllow' defaultChecked={numAllowed} onChange={()=>{setNumAllow((prev) => !prev )}}
            /><label>Number</label>
        </div>
        <div id='spCharAllowField'>
        <input type='checkbox' id='spCharAllow' defaultChecked={charAllowed} onChange={()=>{setCharAllow((prev) => !prev )}} /><label>Special character</label>
        </div>
        </div>
</main>
    </>
  )
}

export default App
