export const SkeletonHomePlaylists = () => {
    const playlists = [1,2,3,4,5,6]

    return (
        playlists?.map((item,key)=>(
            <div key={key} role="status" className="rounded-full shadow animate-pulse p-2 border-gray-700">
                <div className="flex rounded-sm items-center justify-center w-40 h-40 mb-4 bg-gray-700">
                </div>
                <div className="h-2 mx-4 w-20 rounded-full bg-gray-700"></div>
            </div>
        ))
    )
}