export const SkeletonHomeArtists = () => {
    const artists = [1,2,3,4,5,6]

    return (
        artists?.map((item,key)=>(
            <div key={key} role="status" className="rounded-full shadow animate-pulse p-2 border-gray-700">
                <div className="flex rounded-full items-center justify-center w-40 h-40 mb-4 bg-gray-700">
                </div>
                <div className="h-2 mx-auto w-20 rounded-full bg-gray-700"></div>
            </div>
        ))
    )
}