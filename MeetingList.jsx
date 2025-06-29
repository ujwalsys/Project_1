function MeetingList({ meetings }) {
  return (
    <div>
      <h3>Meetings</h3>
      <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>
            <b>{meeting.topic}</b> — {meeting.date} {meeting.startTime} ({meeting.numberOfPeople || 'N/A'} people)
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MeetingList;
