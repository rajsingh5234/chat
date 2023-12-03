
const Image = ({ className = "", alt, ...props }) => {
    return (
        <img
            className={`w-[50px] ${className}`}
            alt={alt}
            {...props}
        />
    )
}

export default Image