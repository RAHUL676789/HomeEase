import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { setToast } from "../../redux/toastSlice";
import { setIsLoading } from "../../redux/loaderSlice";


export default function useAsyncWrap() {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);


    const asyncWrap = useCallback(async (fn, showToast = true) => {
        if (typeof fn !== "function") {
            dispatch(setToast({ type: "error", content: "UseAsyncWrap:Argument must a function" }))
            return;
        }
        dispatch(setIsLoading(true));
        try {
            const response = await fn();
            setData(response);
            if (showToast) {
                dispatch(
                    setToast({
                        type: "success",
                        content: response?.data?.message || "Action successful",
                    })
                );
            }
            return response;
        } catch (error) {
            setErr(error);
            if (showToast) {
                dispatch(
                    setToast({
                        type: "error",
                        content: error?.response?.data?.message || error?.message || "Something went wrong",
                    })
                );
            }
            throw error;
        } finally {
            dispatch(setIsLoading(false));
        }
    }, [dispatch]);


   


    return { data, err, asyncWrap };
}   
