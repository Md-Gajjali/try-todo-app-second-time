import { useEffect, useState } from 'react'
import './App.css'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { getDatabase, ref, set,push  ,onValue } from "firebase/database";





function App() {

  const [task, setTask] = useState("")
  const [todo,setTodo]=useState([])


    const notify = () =>{
      task =="" ?
      toast.error('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        })
        :
        toast.success('🦄 Wow so easy!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });

    } 



  const handleTodo = (e) => {
    setTask(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()

    if (task =="") {
      notify()
    }else{
       const db = getDatabase();
       const NewRef = push(ref(db, 'Todo/' ))
       set(NewRef, { TodoName: task}).then(
        notify(),
        setTask("")
      )
    }
   
  }


    useEffect(()=>{
      const db = getDatabase();
      const starCountRef = ref(db, 'Todo/' );

      onValue(starCountRef, (snapshot) => {
        const Arr = [];
        // 
        snapshot.forEach((item)=>{
          Arr.push(item.val())
          setTodo(Arr)
        }) 
      });
    },[])



  return (
    <>

      <div className='w-full bg-black text-white text-center py-5'>
        <h1 className='text-5xl'>Todo App</h1>
      </div>

      <form className="max-w-sm mx-auto mt-10">
        <div className="mb-5">
          <label htmlFor=""
            className="block mb-2.5 text-sm font-medium text-heading">Your password</label>

          <input
            type="text"
            value={task}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="inter your list" onChange={handleTodo} />
        </div>

        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          onClick={handleClick}
        >Submit</button>

        <ul className='text-black text-3xl '>
        {
          todo.map((item)=>{
            return(
                <li className="w-full px-4 text-start py-2 border-b border-default rounded-t-lg">{item.TodoName}</li>
            )
          })
        }

        </ul>
      </form>


    </>
  )
}

export default App
