import { ParentProps } from "solid-js"

export default function SVG(props: ParentProps) {
	return (
		<svg>
			{props.children}
		</svg>
	)
}

export function SVGexample() {
	return (
		<SVG>
			<Point at={[42, 42]} />
		</SVG>
	)
}

type Cod2 = [number, number]
function coordinate(cod: Cod2) {
	return {
		x: cod[0],
		y: cod[1]
	}
}

function Point(props: { at: Cod2, radius?: number }) {
	const cod = coordinate(props.at)
	return (<circle cx={cod.x} cy={cod.y} r={props.radius}></circle>)
}
