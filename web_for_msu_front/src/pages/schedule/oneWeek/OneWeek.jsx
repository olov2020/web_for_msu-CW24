import {getScheduleByUserId, getUserInfoByUserId} from "../../../api/userApi.js";
import {useSelector} from "react-redux";


const OneWeek = ({header, fromDate, toDate}) => {

  const user = useSelector(state => state.user);
  const userId = user.id;
  const {schedule} = getScheduleByUserId({userId, fromDate, toDate});

  return (
    <div>
      <h2>{header}</h2>

      <div>
        {schedule.map((item, index) => (
          <div key={index}>
            <p>{schedule[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OneWeek;