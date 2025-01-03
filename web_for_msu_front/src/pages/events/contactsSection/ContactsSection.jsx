
// eslint-disable-next-line react/prop-types
const ContactsSection = ({header, contacts = []}) => {
  return (
    <>
      <h3>{header}</h3>
      <ul style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '.3rem 0',
      }}>
        {contacts.map((contact) => (
          <li key={contact.id} style={{
            listStyleType: 'none',
          }}>
            <p>{contact.name}: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactsSection;