import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket/socket";
import { getToken } from "./utils/helper/getToken";
import { addNewPartnerBooking, setPartner, updatePartnerBooking } from "./redux/partnerSlice";
import { setUser } from "./redux/userSlice"
import { setToast } from "./redux/toastSlice";

const SocketHandler = () => {
  const dispatch = useDispatch();
  const { partner } = useSelector((state) => state.partner);
  const { user } = useSelector((state) => state.user);


  // 🔹 Mount time socket connection setup
  useEffect(() => {
    const token = getToken();
    if (token) socket.auth = { token };

    // connect socket only once
    if (!socket.connected) socket.connect();

    const onConnect = () => console.log(" socket connected", socket.id);
    const onConnectError = (err) => console.log(" socket connect error", err);
    const onDisConnect = (reason) =>
      console.log(" socket disconnected", reason);

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("disconnect", onDisConnect);

    // Global booking listeners
    const onNewBooking = (payload) => {

      console.log(payload,"this is paylod")
      console.log(payload.data)
      dispatch(addNewPartnerBooking(payload || payload.data))
      dispatch(setToast({ type: "success", content: payload.message || "new booking request" }))

    };

    const onBookingConfirm = (payload) => {
      console.log(" booking confirm: payload", payload);
      dispatch(setPartner(payload.data))
      dispatch(setToast({ type: "success", content: payload.message || "booking has been confirm" }))
    };
    const onBookingReject = (payload) => {
      console.log("this is reject payload", payload);
      dispatch(setPartner(payload.data))
      dispatch(setToast({ type: "success", content: payload.message || "booking has been rejected" }))
    }

    const onNewRequest = (payload) => {
      console.log("this is new request paylaod", payload);
      dispatch(setPartner(payload.data))
      dispatch(setToast({ type: "success", content: payload.message || "booking has been confirm" }))


    }
    const onBookingError = (payload)=>{
      console.log(payload)
      dispatch(setToast({type:"error",content:payload?.error || "Something went wrong"}))
    }

    const onBookingCancel = (payload)=>{
       console.log("this is new cancel paylaod", payload);
      dispatch(setPartner(payload.data))
      dispatch(setToast({ type: "success", content: payload.message || "booking has been confirm" }))

    }
    socket.on("partner-new-booking", onNewBooking);
    socket.on("partner-booking-confirm", onBookingConfirm);
    socket.on("partner-booking-reject", onBookingReject);
    socket.on("partner-new-service-request", onNewRequest)
    socket.on("booking-error",onBookingError)
    socket.on("partner-booking-cancel-delete",onBookingCancel)

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisConnect);

      socket.off("partner-new-booking", onNewBooking);
      socket.off("partner-booking-confirm", onBookingConfirm);
      socket.off("partner-booking-reject", onBookingReject);
    };
  }, []);


  useEffect(() => {
    if (partner?._id) {
      socket.emit("partner-join", partner._id);
      console.log(" Partner joined:", partner._id);
    }

    if (user?._id) {
      socket.emit("user-join", user._id);
      console.log(" User joined:", user._id);
    }
  }, [partner?._id, user?._id]);

  return null;
};

export default SocketHandler;
