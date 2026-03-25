import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'

const API_BASE_URL = "http://localhost:3001";

function App() {
  const [todo, setTodo] = useState([])
  const [time, setTime] = useState(0)
  const handleTodoFetchSuccess = useCallback((res) => {
    setTodo(res);
  }, []);

  useFetch(`${API_BASE_URL}/todo`, handleTodoFetchSuccess);

return (
  <>
    <Advice />
    <h1>🐣Todo List🐣</h1>
    <StopWatch time={time} setTime={setTime}/>
    <br />
    <TodoInput setTodo = {setTodo}/>
    <div className='zzz'></div>
    <TodoList todo = {todo} setTodo={setTodo} />
  </>
  )
}

const useFetch = (url, onSuccess) => {
  const [isLoading, setIsLoding] = useState(true)
  const [data, setData] =useState(null);

  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      setData(res);
      if (onSuccess) onSuccess(res);
      setIsLoding(false);
    });
  }, [url, onSuccess]);
  return [isLoading, data]
}

const Advice = () => {
  const [isLoading, data] = useFetch(
    "https://korean-advice-open-api.vercel.app/api/advice"
  );
  return (
    <>
    {!isLoading && (
      <div className='aaa'>
        <div>{data.message}</div>
        <div>- {data.author} -</div>
      </div>
    )}
    </>
  )
}

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date())
    }, 1000);
  }, [])

  return (
    <>
      <div>{time.toLocaleTimeString()}</div>
    </>
  )
}

const formatTime = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${secs}`;
};

const StopWatch = ({time, setTime}) => {
  const [isOn, setIsOn] = useState(false);
  const timerRef = useRef(null)

  useEffect(() => {
    if(isOn === true) {
      const timerId = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      timerRef.current = timerId;
    } else {
      clearInterval(timerRef.current);
    }
  },[isOn]);
  
  return (
    <div>
    {formatTime(time)}
    <button onClick={() => setIsOn(prev=>!prev)}>
      {isOn ? "stop" : "start"}
    </button>
    <button onClick={() => {
      setTime(0);
      setIsOn(false);
    }}>
      reset
    </button>
    </div>
  );
};

const TodoInput = ({setTodo}) => {
  const inputRef = useRef(null)
  const addTodo = () => {
    const content = inputRef.current.value.trim();
    if (!content) return;

    const newTodo = {
      content,
      time: 0,
    };

    fetch(`${API_BASE_URL}/todo`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Todo 추가 실패");
        return res.json();
      })
      .then((res) => {
        setTodo((prev) => [...prev, res]);
        inputRef.current.value = "";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <input ref={inputRef}/>
      <button onClick={addTodo}>추가</button>
    </>
  )
}

const TodoList = ({todo, setTodo}) => {
  return (
    <>
      <ul>
        {todo.map((el) => 
          <Todo key={el.id} todo={el} setTodo={setTodo}/>
        )}
      </ul>
    </>
  )
}

const Todo = ({todo, setTodo}) => {
  return (
    <>
      <li>
        {todo.content}
          <button
            onClick={() => {
              fetch(`${API_BASE_URL}/todo/${todo.id}`, {
                method: "DELETE", 
              }).then((res) => {
                if (res.ok) {
                  setTodo((prev) => prev.filter((el) => el.id !== todo.id));
                }
              });
            }}
            >
            삭제
          </button>
      </li>
    </>
  )
}

export default App
