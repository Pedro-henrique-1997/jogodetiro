import kaboom from "kaboom"

kaboom({
	background: [74, 48, 82]

})

scene("jogo", () => {
	
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
loadSprite("coracao", "/sprites/heart.png")

const velocidade = 400

var jogador_energia = 1000

const player = add([
	sprite("bean"),
	pos(100, 125),
	area(),
	anchor("center"),
	health(jogador_energia)
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

var inimigo_velocidade = 500
var energia_inimigo = 80

function geradorDeInimigos(){
	const gerarInimigos = choose(inimigos)
	add([
		sprite(gerarInimigos),
		pos(width(), rand(50, height() - 50)),
		anchor("center"),
		area(),
		health(energia_inimigo),
		move(LEFT, inimigo_velocidade),
		offscreen({destroy: true}),
		"inimigos",
	])
}

function gerarCoracoes(){
	add([
		sprite("coracao"),
		pos(width(), rand(50, height() - 50)),
		anchor("center"),
		area(),
		move(LEFT, inimigo_velocidade),
		offscreen({destroy: true}),
		"coracao",
	])
}

loop(1, () => {
	geradorDeInimigos()
})

loop(4.0, () => {
    gerarCoracoes()
})

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


onCollide("bala", "inimigos", (b, e) => {
	destroy(b)
	e.hurt(30)
	shake(1)
})

on("death", "inimigos", (e) => {
	shake(2),
	destroy(e),
	addKaboom(e.pos)
})


player.onHurt(() => {
	barra_de_vida.set(player.hp())
})


player.onCollide("inimigos", (e) => {
	player.hurt(100)
	destroy(e)
	addKaboom(e.pos)
	if(jogador_energia == 0){
		go("morte")
	}
})

player.onCollide("coracao", (e) => {
	destroy(e)
	player.heal(50)
	
})

player.onHeal(() => {
	barra_de_vida.set(player.hp())
})

})

scene("morte", () => {
	add([
		text("VOCE PERDEU"),
		pos(24,25),
		color(0,0,0)
	])
})

go("jogo")