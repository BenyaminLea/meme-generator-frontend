import './App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import MemeGeneratorForm from './components/MemeGeneratorForm';
import MemeGeneratedContainer from './components/MemeGeneratedContainer';
import MemeGeneratedHistoryComponent from './components/MemeGeneratedHistoryComponent';

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

  return (
    <div className="App">
      <Container size="sm">
      <Box>Meme Generator</Box>
      <MemeGeneratorForm selectedImgId={selectedImgId} setSelectedImgId={setSelectedImgId} memes={memes} text1={text1} text2={text2} setText1={setText1} setText2={setText2} handleSubmit={handleSubmit}/>
      {result && <MemeGeneratedContainer url={result}/>}
      <Divider variant="middle"/>
      {pastMemes && <MemeGeneratedHistoryComponent pastMemes={pastMemes}/>}
      </Container>
    </div>
  );
}

export default App;
