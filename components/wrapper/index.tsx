const LayoutWrapper = ({ children, styles = '' }: { children: React.ReactNode, styles?: string }) => {
    return (
        <div className={`w-screen flex justify-center ${styles}`}>
            <div className="max-w-screen-xl w-full p-4 md:p-6">
                {children}
            </div>
        </div>
    )
}

export default LayoutWrapper;