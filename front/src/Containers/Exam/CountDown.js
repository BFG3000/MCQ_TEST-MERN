import React from "react";
import Countdown from "react-countdown";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { endExam } from "../../store/actions/examActions";

const CountDown = React.memo(({ timer, resultId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(resultId);
  return (
    <div style={{ fontSize: "2rem" }}>
      <Countdown
        date={Date.now() + timer}
        intervalDelay={0}
        autoStart={true}
        zeroPadTime={2}
        daysInHours={true}
        onComplete={() => {
          dispatch(endExam(resultId));
          history.push("/")
        }}
      />
    </div>
  );
});

export default CountDown;
