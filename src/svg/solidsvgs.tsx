import { ComponentProps, ParentProps } from "solid-js"

// style={{
// 			width: '100%',
// 			height: '100%'
// 		}}
export function SVG(props: ParentProps) {
	console.log(props, props.keys)

	return (
		<svg >
			{props.children}
		</svg>
	)
}

export default function SVGexample() {
	return (
		<SVG>
			<Point at={[42, 42]} style={defaultPointStyle} />
			<Line from={[123, 123]} to={[666, 666]} style={defaultPointStyle} />
		</SVG>
	)
}

const defaultPointStyle: SimpleStyle = {
	fill: 'magenta',
	fillOpacity: 0.5,
	stroke: 'green',
	strokeWidth: 5
}
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

type Cod2 = [number, number]
function coordinate(cod: Cod2) {
	return {
		x: cod[0],
		y: cod[1]
	}
}

type Color = string

type SimpleStyle = {
	fill: Color,
	fillOpacity: number,
	stroke: Color,
	strokeWidth: number,
}
function spreadStyle(style?: SimpleStyle) {
	if (style == null) return style

	return {
		fill: style.fill,
		'fill-opacity': style.fillOpacity,
		stroke: style.stroke,
		'stroke-width': style.strokeWidth,
	}
}

// type ThisButThat<This, That> = {[Key: Exclude]}

type PointProps = { at: Cod2, radius?: number, style?: SimpleStyle }
function Point(props: ParentProps<PointProps & Omit<ComponentProps<'circle'>, keyof PointProps>>) {
	const cod = coordinate(props.at)
	const circle = <circle
		{...spreadStyle(props.style)}
		cx={cod.x}
		cy={cod.y}
		r={props.radius ?? 42}
	>
	</circle >
	return circle
}

type LineProps = { from: Cod2, to: Cod2, style?: SimpleStyle }
function Line(props: ParentProps<LineProps & Omit<ComponentProps<'line'>, keyof LineProps>>) {
	const cods = [coordinate(props.from), coordinate(props.to)]
	const circle = (cod: { x: number, y: number }) =>
		<circle
			{...spreadStyle(props.style)}
			cx={cod.x}
			cy={cod.y}
			r={42}
		>
		</circle >
	return <>{cods.map(circle)}</>
}
