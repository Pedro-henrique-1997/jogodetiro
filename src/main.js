import kaboom from "kaboom"

kaboom({
	background: [74, 48, 82]

})

const inimigos = [
	"apple",
	"lightening",
	"coin",
	"egg",
	"key",
	"door",
	"meat",
	"mushroom",
]

for(const enemy of inimigos){
	loadSprite(enemy, `/sprites/${enemy}.png`)
}

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

onKeyPress("s", () => {
	atirar(player.pos.add(16,0))
})

var inimigo_velocidade = 200

function geradorDeInimigos(){
	const gerarInimigos = choose(inimigos)
	add([
		sprite(gerarInimigos),
		pos(width(), rand(50, height() - 50)),
		anchor("center"),
		area(),
		move(LEFT, inimigo_velocidade),
		offscreen({destroy: true}),
		"inimigos",
	])
}

loop(1.5, () => {
	geradorDeInimigos()
})

const jogador_energia = 1000

const vidaLabel = add([
	text("energia"),
	pos(25,24),
])

const barra_de_vida = add([
	rect(width(), 24),
	pos(0,0),
	color(107, 201, 108),
	fixed(),
	{
		max: jogador_energia,
		set(hp){
			this.width = width() * hp / this.max
			this.flash = true
		}
	}
])

