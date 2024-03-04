import Person from "./Person"

const PersonsContainer = ({ people }: { people: any }) => {
  return (
    <div>
      {people.map((p: any) => (
        <div key={p.username}>
          <Person name={p.name} username={p.username} bio={p.bio} jobtitle={p.jobtitle} followersCount={p.followersCount} followingsCount={p.followingsCount} imageUrl={p.imageUrl} isBlocked={p.isBlocked} isFollowed={p.isFollowed} isMuted={p.isMuted} />
        </div>
      ))}
    </div>
  )
}

export default PersonsContainer
