export default function UserProfile({params}: any) {
    return (
        <div className="flex justify-center items-center py-2 min-h-screen">
                <p className="text-4xl">
                    Profile Page <span className="text-[green] text-5xl">{params.id}</span>
                </p>
        </div>
    )
}