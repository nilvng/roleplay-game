import kaboom from "kaboom";
// kaboom({
// 	scale: 4,
// 	font: "sinko",
// })
// loadRoot('https://i.imgur.com/')
// loadSprite('top-door', 'U9nre4n.png')
// loadSprite('bottom-wall', 'vWJWmvb.png')
// loadSprite("dino", "https://i.imgur.com/Gz3ifGl.png", {
// 	sliceX: 3,
// 	sliceY: 4,
// 	// Define animations
// 	anims: {
// 		"idle": 1,
// 		"run": {
// 			from: 6,
// 			to: 8,
// 			speed: 10,
// 			loop: true,
// 		},
// 		"jump": 1
// 	},
// })

// const SPEED = 120
// const JUMP_FORCE = 240

// gravity(640)

// const player = add([
// 	sprite("dino"),
// 	pos(center()),
// 	origin("center"),
// 	scale(1/3) ,
// 	area(),
// 	body(),
	
// ])

// player.play("idle")
// add([
// 	rect(width(), 24),
// 	area(),
// 	outline(1),
// 	pos(0, height() - 24),
// 	solid(),
// ])

// player.onGround(() => {
// 	if (!isKeyDown("left") && !isKeyDown("right")) {
// 		player.play("idle")
// 	} else {
// 		player.play("run")
// 	}
// })

// player.onAnimEnd("idle", () => {
// })

// onKeyPress("space", () => {
// 	if (player.isGrounded()) {
// 		player.jump(JUMP_FORCE)
// 		player.play("jump")
// 	}
// })

// onKeyDown("left", () => {
// 	player.move(-SPEED, 0)
// 	player.flipX(true)
// 	if (player.isGrounded() && player.curAnim() !== "run") {
// 		player.play("run")
// 	}
// })

// onKeyDown("right", () => {
// 	player.move(SPEED, 0)
// 	player.flipX(false)
// 	if (player.isGrounded() && player.curAnim() !== "run") {
// 		player.play("run")
// 	}
// })

// onKeyRelease(["left", "right"], () => {
// 	if (!isKeyDown("left") && !isKeyDown("right")) {
// 		player.play("idle")
// 	}
// })

// const getInfo = () => `
// Anim: ${player.curAnim()}
// Frame: ${player.frame}
// `.trim()

// const label = add([
// 	text(getInfo()),
// 	pos(4),
// ])

// label.onUpdate(() => {
// 	label.text = getInfo()
// })

kaboom({
	background: [0, 0, 0],
	width: 600,
	height: 600
})
loadSprite("bean", "https://i.imgur.com/yZIb8O2.png")
loadSprite("grass", "https://i.imgur.com/vWJWmvb.png")
loadSprite("portal", "https://i.imgur.com/U9nre4n.png")


const SPEED = 480

const LEVELS = [
	[
		"@        ",
		"        >",
		"=========",
	],
	[
		"@       >",
		"=========",
	],
]


scene("game", ({ levelIdx, score }) => {
	gravity(100)
	const level = addLevel(LEVELS[levelIdx || 0], {
		width: 64,
		height: 64,
		pos: vec2(100, 200),
		"@": () => [
			sprite("bean"),
			area(),
			body(),
			origin("bot"),
			"player",
		],
		"=": () => [
			sprite("grass"),
			area(),
			solid(),
			origin("bot"),
		],
		">": () => [
			sprite("portal"),
			area(),
			origin("bot"),
			"portal",
		],
	})
	const player = get("player")[0]
	onKeyPress("space", () => {
		if (player.isGrounded()) {
			player.jump()
		}
	})

	onKeyDown("left", () => {
		player.move(-SPEED, 0)
	})

	onKeyDown("right", () => {
		player.move(SPEED, 0)
	})
	player.onUpdate(() => {
		if (player.pos.y >= 480) {
			go("lose")
		}
	})

	player.onCollide("portal", () => {
		if (levelIdx < LEVELS.length - 1) {
			go("game", {
				levelIdx: levelIdx + 1,
				score: score,
			})
		} else {
			go("win", { score: score, })
		}
	})

	const scoreLabel = add([
		text(score),
		pos(12)
	])

})

scene("lose", () => {

	add([
		text("You Lose"),
		pos(12),
	])

	onKeyPress(start)

})

scene("win", ({ score }) => {

	add([
		text(`Congratuation`, {
			width: width(),
		}),
		pos(12),
	])

	onKeyPress(start)

})

function start() {
	go("game", {
		levelIdx: 0,
		score: 0,
	})
}

start()

