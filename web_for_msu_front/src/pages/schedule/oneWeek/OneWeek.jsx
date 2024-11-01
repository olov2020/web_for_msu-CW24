import {getScheduleByUserId} from "../../../api/userApi.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


// eslint-disable-next-line react/prop-types
const OneWeek = ({header, fromDate, toDate}) => {

  const user = useSelector(state => state.user);
  const [schedule, setSchedule] = useState({});
  const userId = user.id;

  useEffect(() => {
    const getSchedule = async () => {
      const data = await getScheduleByUserId({userId, fromDate, toDate});
      setSchedule({data});
    }

    getSchedule();
  }, []);

  return (
    <div>
      <h2>{header}</h2>

      <div>
        schedule
        {/*{schedule.map((item, index) => (
          <div key={index}>
            <p>{schedule[index]}</p>
          </div>
        ))}*/}
      </div>
    </div>
  );
};

export default OneWeek;