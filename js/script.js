//GLOBAL VARIABLES
const canvas = document.querySelector('canvas')
toolBtens = document.querySelectorAll('.tool')
fillColar = document.querySelector('#fill-color')
sizeSlider = document.querySelector('#size-slider')

//VARIABLES WITH DEFAULT VALUE
let ctx = canvas.getContext('2d', {
		willReadFrequently: true,
	}),
	isDrawing = false,
	brushWidth = 5,
	selectedTool = 'brush',
	prevMouseX,
	prevMouseY,
	snapshot

//SET CANVAS WIDTH AND HEIGHT
window.addEventListener('load', () => {
	canvas.width = canvas.offsetWidth
	canvas.height = canvas.offsetHeight
})

//START DRAWING
const startDrawing = e => {
	isDrawing = true
	prevMouseX = e.offsetX
	prevMouseY = e.offsetY
	ctx.beginPath()
	ctx.moveTo(e.offsetX, e.offsetY)
	ctx.lineWidth = brushWidth
	snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

//DRAWING RECTANGLE
const drawRectangle = e => {
	const width = e.offsetX - prevMouseX
	const height = e.offsetY - prevMouseY

	if (!fillColar.checked) {
		return ctx.strokeRect(
			e.offsetX,
			e.offsetY,
			prevMouseX - e.offsetX,
			prevMouseY - e.offsetY,
		)
	}
	ctx.fillRect(
		e.offsetX,
		e.offsetY,
		prevMouseX - e.offsetX,
		prevMouseY - e.offsetY,
	)
}
//DRAW CIRCLE
const drawCircle = e => {
	ctx.beginPath()
	const radius =
		Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2))+
		Math.pow(prevMouseY - e.offsetY, 2)
	ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
	fillColar.checked ? ctx.fill() : ctx.stroke()
	
}
//DRAW TRIANGLE
const drawTriangle = e => {
	ctx.beginPath()
	ctx.moveTo(prevMouseX, prevMouseY)
	ctx.lineTo(e.offsetX, e.offsetY)
	ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY )
	ctx.closePath()
	ctx.stroke()
	fillColar.checked ? ctx.fill() : ctx.stroke()
}
const drawing = e => {
	if (!isDrawing) return
	ctx.putImageData(snapshot, 0, 0)
	switch (selectedTool) {
		case 'brush':
			ctx.lineTo(e.offsetX, e.offsetY)
			ctx.stroke()
			break
		case 'rectengle':
			drawRectangle(e)
			break
		case 'circle':
			drawCircle(e)
			break
			case 'triangle':
				drawTriangle(e)
				break
		default:
			break
	}
}

//TOOLS BTN SET TO VARIABLES SELECTEC TOOL
toolBtens.forEach(btn => {
	btn.addEventListener('click', () => {
		document.querySelector('.options .active').classList.remove('active')
		btn.classList.add('active')
		selectedTool = btn.id

		console.log(`selectedTool ${selectedTool}`)
	})
})
// CHANGE BRUSH WIDTH
sizeSlider.addEventListener('change', () => (brushWidth = sizeSlider.value))
//STOP DRAWING
const stopDrawing = () => {
	isDrawing = false
	ctx.beginPath()
}

canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDrawing)
canvas.addEventListener('mouseleave', stopDrawing)
