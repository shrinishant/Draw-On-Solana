export default function Title({ children } : any) {
    return (
        <h1 className="font-mono text-4xl text-purple-600 code">
            {children}
        </h1>
    )
}