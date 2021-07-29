const App = ()=> {
  const [items, setItems] = React.useState([]);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [erro, setErro] = React.useState('');
  const [msg, setMsg] = React.useState('');
  React.useEffect(()=>{
    const getData = async ()=>{
      let data = await fetch('/item');
      data = await data.json();
      setItems(data)
    }
    getData();
  })

  const handleClickCriar = async()=>{
    setMsg('');
    setErro('');
    if(name!=='' && description!==''){
      setErro("");
      const response = await fetch('/item', {
        method: 'POST',
        body: JSON.stringify({ 
          name: name,
          description: description
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      if(response){
        setMsg(`"${name}" foi adicionado no banco com succeso`);
      }else{
        setErro("Algo deu errado");
      }
      setName('');
      setDescription('');
    }else{
      setErro("Preencha todos os campos");
    }
  }
  const handleClickDeletar = async(id, name)=>{
    const response = await fetch('/item', {
      method: 'DELETE',
      body: JSON.stringify({ 
        id: id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    if(response){
      setMsg(`"${name}" foi deletado do banco com succeso`);
    }else{
      setErro("Algo deu errado");
    }
  }
  return (
    <div style={{backgroundColor: 'antiquewhite', padding: '50px'}}>
      <div style={{
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1>Hello word</h1>
        <label>Nome:</label><br/>
        <input 
          typeof="text" 
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        ></input>
        <br/><br/><label>Descrição:</label><br/>
        <input 
          typeof="text" 
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        ></input><br/><br/>
        <button onClick={handleClickCriar}>Criar</button>
        {erro!==''&&<p style={{color: '#f00'}}>{erro}</p>}
        {msg!==''&&<p>{msg}</p>}
      </div>
      <h1>Items no banco:</h1>
      {items.length>0 && 
      <div>
        {items.map((item)=>(
          <div style={{backgroundColor:'azure', padding: '15px', marginTop: '20px', marginBotton: '20px'}}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <button onClick={()=>handleClickDeletar(item.iditems, item.name)}>Deletar</button>
          </div>
        ))}
      </div>
      }
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
