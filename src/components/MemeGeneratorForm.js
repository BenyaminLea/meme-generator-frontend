import './styles/MemeGeneratorForm.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MemeGeneratorForm = ( { selectedImgId, setSelectedImgId, memes, text1, text2, setText1, setText2, handleSubmit } ) => {
    return (
        <FormControl>
            <InputLabel id="select-label">Image</InputLabel>
            <Select
            labelId="select-label"
            id="select"
            value={selectedImgId}
            label="Image"
            onChange={(e)=>{setSelectedImgId(e.target.value)}}
            >
                {memes.map((meme)=>{return <MenuItem divider={true} value={meme.id} key={meme.id}><img src={meme.url} alt={meme.name}/></MenuItem> })}
            </Select>
            <TextField id="outlined-basic" label="Text 1" variant="outlined" value={text1} onChange={(e)=>{setText1(e.target.value)}}/>
            <TextField id="outlined-basic" label="Text 2" variant="outlined" value={text2} onChange={(e)=>{setText2(e.target.value)}}/>
            <Button variant="contained" type="submit" onClick={handleSubmit}>Generate Meme</Button>
        </FormControl>
    );
};

export default MemeGeneratorForm;