import React, { useEffect, useState } from 'react';
import Toast from './Toast';
import { v4 as uuidv4 } from 'uuid';

const ToastContainer = ({ type, content }) => {
  const [toastList, setToastList] = useState([]);
  // const [id, setid] = useState(()=>uuidv4());

  useEffect(() => {
    console.log("hello");
    console.log("🔥 Props received:", { type, content });
    const id = uuidv4();

    if (!type || !content) return;
      console.log("runnig")
  console.log(type,content)

   
    const newToast = { type, content, id };
    console.log(newToast);

    setToastList((prev) => [...prev, newToast]);

    const timer = setTimeout(() => {
      setToastList((prev) => prev.filter((t) => t.id !== id));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const removeToast = (id) => {
    setToastList((prev) => prev.filter((t) => t.id !== id));
  };
  


  return (
    <div className='fixed top-5 right-5 flex flex-col gap-3 z-100'>
      {toastList.map((toast) => (
        <Toast key={toast.id} {...toast} remover={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
