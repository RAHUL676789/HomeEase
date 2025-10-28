import React, { useState, useEffect, useRef } from "react";

const PartnerUpcomingTimer = ({ workingDate }) => {
  const [counterTime, setCounterTime] = useState(null);
  const [counterDate, setCounterDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const timerRef = useRef(null);

  useEffect(() => {
    if (!workingDate) return;

    const targetTime = new Date(workingDate).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.floor((targetTime - now) / 1000); // in seconds

      if (diff <= 0) {
        setCounterTime(0);
        clearInterval(timerRef.current);
        return;
      }

      setCounterTime(diff);
    };

    updateCountdown(); // initial call
    timerRef.current = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerRef.current);
  }, [workingDate]);

  useEffect(() => {
    if (counterTime === null) return;

    const days = Math.floor(counterTime / 86400);
    const hours = Math.floor((counterTime % 86400) / 3600);
    const minutes = Math.floor((counterTime % 3600) / 60);
    const seconds = counterTime % 60;

    setCounterDate({ days, hours, minutes, seconds });
  }, [counterTime]);

  return (
    <div className="py-1 px-3 bg-zinc-900 text-white rounded ">
      <div className="flex uppercase gap-3">
        <h2 className="lowercase font-semibold text-sm">upcoming in :</h2>
        { counterDate.days > 0 && <p className="font-semibold text-sm flex gap-1 items-center">
          <span className="text-xs lowercase">days</span> {counterDate.days}
        </p>}
        { counterDate.days > 0 && <p className="font-semibold text-sm flex gap-1 items-center">
          <span className="text-xs lowercase">hours</span> {counterDate.hours}
        </p>}

         { counterDate.days <= 0 && <p className="lowercase">Today is Working Day</p>
}
       
      </div>
    </div>
  );
};

export default PartnerUpcomingTimer;
