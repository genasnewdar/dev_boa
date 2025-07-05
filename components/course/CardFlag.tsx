const CardFlag = ({ flag }: { flag: string }) => {
    switch (flag) {
        case 'free':
            return (
                <div className="bg-common-green/80 text-white p-1 px-2 rounded-lg text-xs">
                    Үнэгүй
                </div>
            )

        default:
            return <div></div>
    }
}

export default CardFlag