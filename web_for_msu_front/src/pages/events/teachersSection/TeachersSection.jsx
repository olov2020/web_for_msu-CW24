
// eslint-disable-next-line react/prop-types
const TeachersSection = ({teachers = []}) => {
  return (
    <>
      <h3>Ответственные за онлайн вступительные испытания</h3>
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