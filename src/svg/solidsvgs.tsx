import { ComponentProps, createSignal, For, ParentProps } from "solid-js"
import { createStore } from "solid-js/store"

// style={{
// 			width: '100%',
// 			height: '100%'
// 		}}
export function SVG(props: ParentProps) {
	console.log('props',props, (props as any).keys)

	return (
		<svg
			onDrag={(...args) => console.log('svg onDrag', { args })}
			onDragStart={(...args) => console.log('svg onDragStart', { args })}
			onDragEnd={(...args) => console.log('svg onDragEnd', { args })}
			onDragEnter={(...args) => console.log('svg onDragEnter', { args })}
			onDragExit={(...args) => console.log('svg onDragExit', { args })}
			onDragOver={(...args) => console.log('svg onDragOver', { args })}
			onDragLeave={(...args) => console.log('svg onDragLeave', { args })}
		>

			{props.children}
		</svg>
	)
}

const defaultSVG2props = {
	width: 200,
	height: 200,
	viewBox: {
		minx: 0,
		miny: 0,
		width: 100,
		height: 100
	}
}
export function SVG2(props: typeof defaultSVG2props & { children: any }) {
	return (
		<svg width={props.width} height={props.height} viewBox={`${props.viewBox.minx} ${props.viewBox.miny} ${props.viewBox.width} ${props.viewBox.height}`} xmlns="http://www.w3.org/2000/svg">

			<polygon points="5,5 195,10 185,185 10,195" />

			<foreignObject x="20" y="20" width="160" height="160">
				<div style={{

					color: "white",
					font: "18px serif",
					height: "100%",
					overflow: "auto",
				}}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis mollis
					mi ut ultricies. Nullam magna ipsum, porta vel dui convallis, rutrum
					imperdiet eros. Aliquam erat volutpat.
				</div>
			</foreignObject>

			{props.children}

		</svg>
	)
}

const omg_long_array = <Aahh,>(size: number, value: ((index: number) => Aahh)): Aahh[] => {
	let aarrhh: Aahh[] = []
	for (let i = 0; i < size; i++) {
		aarrhh.push(value(i))
	}
	return aarrhh
}

export default function SVGexample() {
	const [svgp_get, svgp_set] = createSignal(defaultSVG2props)
	const [style_get, style_set] = createSignal(defaultPointStyle)
	const [longarray, setlogarray] = createSignal(omg_long_array(12345, i => {
		const [get, set] = createSignal([i * 10, i * 10])
		return ({ get, set })
	}))

	return (
		<>
			<For each={Object.entries(svgp_get())}>
				{([key, value], no) => {
					if (typeof value == 'number' || typeof value == 'string') {
						return <input value={value} onChange={(event) => (console.log(event), svgp_set({ ...svgp_get(), [key]: event.target.value }))} />
					}
					if (typeof value == 'object') {
						return (
							<For each={Object.entries(value)}>
								{([inner_key, val], no) => {
									if (typeof val == 'number' || typeof val == 'string') {
										return <input value={val} onChange={(event) => (console.log(event, event.target.value), svgp_set({ ...svgp_get(), [key]: { ...value, [inner_key]: event.target.value } }))} />
									}
								}
								}
							</For>
						)
					}
				}}
			</For>
			<br />
			<hr />
			<br />
			<SVG2 {...svgp_get()} >lol</SVG2>
			<br />
			<hr />
			<br />
			<For each={Object.entries(style_get())}>
				{([key, value], no) => {
					return <input value={value} onChange={(event) => (console.log(event), style_set({ ...style_get(), [key]: event.target.value }))} />
				}}
			</For>
			<br />
			<hr />
			<br />
			<SVG2 {...svgp_get()}>
				<For each={longarray()}>
					{(val, index) => <Point at={() => [val.get()[0], val.get()[1]]} setter={(value) => (console.log(value), val.set(value))} style={style_get()} />}
				</For>
				<For each={[1, 2, 3]}>
					{(value, index) => <Point at={[value, value]} style={style_get()} />}
				</For>
			</SVG2>
		</>
	)
}
// <Line from={[123, 123]} to={[666, 666]} style={style_get()} />

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

function getSetSignal<T>(defaultValue: T) {
	const [get, set] = createSignal(defaultValue)
	return { get, set }
}

type PointProps = { at: Cod2, setter?: (cod: Cod2) => void, radius?: number, style?: SimpleStyle }
function Point(props: ParentProps<PointProps & Omit<ComponentProps<'circle'>, keyof PointProps>>) {
	// console.log('point', props)
	const cod = () => coordinate(typeof props.at == 'function' ? props.at() : props.at)
	const mousedown = getSetSignal(false)
	const circle = <circle
		{...spreadStyle(props.style)}
		cx={cod().x}
		cy={cod().y}
		r={props.radius ?? 42}
		style={{ cursor: 'move' }}
		onMouseDown={(event, ...args) => (console.log('point onMouseDown', { args }), mousedown.set(true))}
		onMouseEnter={(...args) => console.log('point onMouseEnter', { args })}
		onMouseLeave={(...args) => console.log('point onMouseLeave', { args })}
		onMouseMove={(event, ...args) => (
			// console.log('point onMouseMove', { args }),
			console.log(...Object.entries({ xy: [event.x, event.y], client: [event.clientX, event.clientY], page: [event.pageX, event.pageY],  }).map(([key, [x,y]])=>(`${key}: ${[x,y]}`))),
			console.log('cod', cod(), mousedown.get()), mousedown.get() && props.setter && props.setter([event.clientX, event.clientY]))}
		onMouseOut={(...args) => console.log('point onMouseOut', { args })}
		onMouseOver={(...args) => console.log('point onMouseOver', { args })}
		onMouseUp={(event, ...args) => (console.log('point onMouseUp', { args }), mousedown.set(false))}
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
			onMouseDown={(...args) => console.log('line onMouseDown', { args })}
			onMouseEnter={(...args) => console.log('line onMouseEnter', { args })}
			onMouseLeave={(...args) => console.log('line onMouseLeave', { args })}
			onMouseMove={(...args) => console.log('line onMouseMove', { args })}
			onMouseOut={(...args) => console.log('line onMouseOut', { args })}
			onMouseOver={(...args) => console.log('line onMouseOver', { args })}
			onMouseUp={(...args) => console.log('line onMouseUp', { args })}
		>
		</circle >
	return <>{cods.map(circle)}</>
}
			// onDrag={(...args) => console.log('line onDrag', { args })}
			// onDragStart={(...args) => console.log('line onDragStart', { args })}
			// onDragEnd={(...args) => console.log('line onDragEnd', { args })}
			// onDragEnter={(...args) => console.log('line onDragEnter', { args })}
			// onDragExit={(...args) => console.log('line onDragExit', { args })}
			// onDragOver={(...args) => console.log('line onDragOver', { args })}
			// onDragLeave={(...args) => console.log('line onDragLeave', { args })}
