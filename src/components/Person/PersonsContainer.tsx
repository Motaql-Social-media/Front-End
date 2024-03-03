import Person from "./Person"

const PersonsContainer = ({ people }: { people: any }) => {
  return (
    <div>
      {people.map((p: any) => (
        <Person name={p.name} username={p.username} bio={p.bio} jobtitle={p.jobtitle} followersCount={p.followersCount} followingsCount={p.followingsCount} imageUrl={p.imageUrl} isBlocked={p.isBlocked} isFollowed={p.isFollowed} isMuted={p.isMuted} />
      ))}
    </div>
  )
}

export default PersonsContainer
