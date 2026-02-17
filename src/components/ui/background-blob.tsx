import { SVGProps } from "react"

export function BackgroundBlob(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 -z-10 w-full h-full opacity-50 dark:opacity-30 blur-3xl"
            {...props}
        >
            <path
                fill="#FACC15" // Yellow-400
                d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.8,34.8C59.4,46.5,47.9,56.2,35.4,63.4C22.9,70.6,9.4,75.3,-3.1,79.9C-15.6,84.5,-27.1,89,-38.4,85.2C-49.7,81.4,-60.8,69.3,-69.1,56.1C-77.4,42.9,-82.9,28.6,-83.4,14.1C-83.9,-0.4,-79.4,-15.1,-71.4,-27.6C-63.4,-40.1,-51.9,-50.4,-39.8,-58.3C-27.7,-66.2,-15,-71.7,0.4,-72.3C15.8,-72.9,30.5,-68.6,44.7,-76.4Z"
                transform="translate(100 100)"
            />
        </svg>
    )
}
