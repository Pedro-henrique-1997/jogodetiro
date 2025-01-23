import kaboom from "kaboom"

kaboom({
	background: [74, 48, 82]

})

loadSprite("bean", "/sprites/bean.png")

const velocidade = 400

const player = add([
	sprite("bean"),
	pos(100, 125),
	area(),
	anchor("center"),
])

player.onKeyDown("right", () => {
	player.move(velocidade, 0)
})

player.onKeyDown("left", () => {
	player.move(-velocidade, 0)
})

player.onKeyDown("down", () => {
	player.move(0, velocidade)
})

player.onKeyDown("up", () => {
	player.move(0, -velocidade)
})

var bala_speed = 480

function atirar(posicao){
	add([
		circle(16),
		pos(posicao),
		anchor("center"),
		move(RIGHT, bala_speed),
		color(255, 0, 0),
		offscreen({destroy: true}),
		outline(4),
		area(),
		"bala",
	])
}

oKeyPress("s", () => {
	atirar(player.pos.add(16,0))
})

