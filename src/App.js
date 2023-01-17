import './App.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import React, { useState, useEffect } from 'react';

function App() {
  const [memes, setMemes] = useState([])
  const [pastMemes, setPastMemes] = useState([])
  const [selectedImgId, setSelectedImgId] = useState("")
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  const [result, setResult] = useState("")

  useEffect(()=> {
    async function fetchData() {
      const {data} = await axios.get("http://localhost:5000/api/memes")
      setMemes(data.data.memes)
      const cache = await axios.get("http://localhost:5000/api/cache")
      setPastMemes(cache.data)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {'template_id':selectedImgId, 'text0':text1, 'text1':text2}
    const { data } = await axios.post("http://localhost:5000/api/meme", obj);
    setResult(data.data.url)
    const cache = await axios.get("http://localhost:5000/api/cache")
    setPastMemes(cache.data)
  }

  const handleTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp))
    const dateFormat = date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
    return dateFormat
  }

  return (
    <div className="App">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Image</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedImgId}
          label="Image"
          onChange={(e)=>{setSelectedImgId(e.target.value)}}
        >
          {memes.map((meme)=>{return <MenuItem value={meme.id} key={meme.id}><img src={meme.url} alt={meme.name}/>{meme.name}</MenuItem> })}
        </Select>
        <TextField id="outlined-basic" label="Text 1" variant="outlined" value={text1} onChange={(e)=>{setText1(e.target.value)}}/>
        <TextField id="outlined-basic" label="Text 2" variant="outlined" value={text2} onChange={(e)=>{setText2(e.target.value)}}/>
        <Button variant="contained" type="submit" onClick={handleSubmit}>Generate Meme</Button>
      </FormControl>
      {result && <img src={result} alt="Personalized Meme"/>}
      {pastMemes && pastMemes.map((meme)=>{return <div><img src={meme.url}/>{handleTimestamp(meme.creation_date)}</div>})}
    </div>
  );
}

export default App;
