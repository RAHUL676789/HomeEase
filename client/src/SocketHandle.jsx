import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket/socket";
import { getToken } from "./utils/helper/getToken";

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
      console.log(" new booking:", payload);
    };

    const onBookingConfirm = (payload) => {
      console.log(" booking confirm:", payload);
    };

    socket.on("new-booking", onNewBooking);
    socket.on("booking-confirm", onBookingConfirm);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisConnect);

      socket.off("new-booking", onNewBooking);
      socket.off("booking-confirm", onBookingConfirm);
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
