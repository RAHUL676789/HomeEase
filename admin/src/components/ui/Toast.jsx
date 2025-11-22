import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { setToast } from '../../redux/toastSlice';

const Toast = ({ type, content }) => {
    const { toast } = useSelector((state) => state.toast)
    const dispatch = useDispatch();
    const toastStyles = {
        success: {
            icon: "✅",
            title: "Success",
            border: "border-green-400",
            bg: "bg-green-50",
            text: "text-green-700",
        },
        error: {
            icon: "❗",
            title: "Error",
            border: "border-red-400",
            bg: "bg-red-50",
            text: "text-red-700",
        },
        warning: {
            icon: "⚠️",
            title: "Warning",
            border: "border-yellow-400",
            bg: "bg-yellow-50",
            text: "text-yellow-700",
        },
    };

    useEffect(() => {
        let timer;
        const handleToast = () => {
            const id = uuidv4();
            const newToast = { id, type, content };
            dispatch(setToast(newToast))
            if(timer)clearTimeout(timer);
            timer = setTimeout(() => { dispatch(setToast({type:"",content:""})) }, 5000)
        }
        handleToast();
        return () => clearTimeout(timer);
    }, [type, content])
   
    if(!type || !content)return;

    const { icon, title, border, bg, text } = toastStyles[type];
    return (
        <div className='fixed right-5 top-0 w-[300px] flex flex-col gap-3 z-100'>
            {toast && toast.status && <div className={`${bg} ${text} ${border} border border-dashed 
        rounded-md px-4 py-2 w-[300px] shadow-sm animate-fade-in 
        transition-all duration-300 text-sm`}>
                <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-base">{icon}</span>
                        <span className="font-semibold">{title}</span>
                    </div>
                    <button
                        onClick={() => dispatch(setToast({type:"",content:"",id:null}))}
                        className="text-base font-bold text-gray-400 hover:text-black transition"
                    >
                        &times;
                    </button>
                </div>
                <p className="mt-1 ml-6 text-xs font-normal">{content}</p>

            </div>}

        </div>
    )
}

export default Toast
