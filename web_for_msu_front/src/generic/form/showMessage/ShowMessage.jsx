import style from './showMessage.css'

// eslint-disable-next-line react/prop-types
const ShowMessage = ({message, type}) => {
  return (
    <div className={
      type === 'success' ?
        style.success :
        type === 'warning' ?
          style.warning :
          type === 'error' ?
            style.error :
            {}
    }>
      {/*<img alt={} src={}/>*/}
      <h2>{message}</h2>
    </div>
  );
};

export default ShowMessage;