import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setToast } from "../../redux/toastSlice";
import { setIsLoading } from "../../redux/loaderSlice";

export default function useAsyncWrap() {
    const dispatch = useDispatch();

    const asyncWrap = useCallback(async (fn, showToast = true) => {
        if (typeof fn !== "function") {
            dispatch(setToast({ type: "error", content: "AsyncWrap: Argument must be a function" }));
            return { data: null, error: "Argument must be a function" };
        }

        dispatch(setIsLoading(true));

        try {
            const response = await fn();

            if (showToast) {
                dispatch(setToast({
                    type: "success",
                    content: response?.data?.message || "Success"
                }));
            }

            return { data: response, error: null };

        } catch (error) {

            if (showToast) {
                dispatch(setToast({
                    type: "error",
                    content: error?.response?.data?.message || error.message || "Something went wrong"
                }));
            }

            return { data: null, error };

        } finally {
            dispatch(setIsLoading(false));
        }

    }, [dispatch]);

    return asyncWrap;
}
