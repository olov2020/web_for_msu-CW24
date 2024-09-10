import {useSelector} from "react-redux";
import {getScheduleByUserId} from "../../api/userApi.js";


const Schedule = () => {

  const user = useSelector(state => state.user);
  
  const userSchedule = getScheduleByUserId(user.id);

  return (
    <div>
      <h1>Расписание</h1>


    </div>
  );
};

export default Schedule;