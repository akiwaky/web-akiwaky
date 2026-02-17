import { SVGProps } from "react"

export function Logo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
            className={`text-foreground ${props.className}`}
        >
            {/* Cartoonish 'A' - slightly jagged/wobbly path for organic feel */}
            <path d="M25 85 L50 15 L75 85" strokeWidth="12" />
            <path d="M35 55 Q 50 65 65 55" strokeWidth="10" />
            {/* A little halo or detail maybe? */}
            <circle cx="50" cy="15" r="5" fill="currentColor" className="opacity-0 hidden" />
        </svg>
    )
}
