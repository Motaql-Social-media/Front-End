import SettingsPerson from "./SettingsPerson"

const SettingsPersonContainer = ({ people, type }: { people: any; type: string }) => {
  return (
    <div>
      {people.map((p: any) => (
        <div key={p.username}>
          <SettingsPerson type={type} name={p.name} username={p.username} bio={p.bio} jobtitle={p.jobtitle} followersCount={p.followersCount} followingsCount={p.followingsCount} imageUrl={p.imageUrl} isBlocked={p.isBlocked} isFollowed={p.isFollowed} isMuted={p.isMuted} />
        </div>
      ))}
    </div>
  )
}

export default SettingsPersonContainer
