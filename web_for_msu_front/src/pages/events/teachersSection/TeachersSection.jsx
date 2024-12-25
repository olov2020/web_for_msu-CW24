
// eslint-disable-next-line react/prop-types
const TeachersSection = ({header, teachers = []}) => {
  return (
    <>
      <h3>{header}</h3>
      <ul style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '.3rem 0',
      }}>
        {teachers.map((teacher) => (
          <li key={teacher.id} style={{
            listStyleType: 'none',
          }}>
            <p>{teacher.name}: <a href={`tel:${teacher.phone}`}>{teacher.phone}</a></p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TeachersSection;