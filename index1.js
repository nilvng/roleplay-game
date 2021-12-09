import kaboom from "kaboom";
kaboom({
	scale: 4,
	font: "sinko",
})

loadSprite("dino", "https://i.imgur.com/Gz3ifGl.png", {
	sliceX: 3,
	sliceY: 4,
	// Define animations
	anims: {
		"idle": 1,
		"run": {
			from: 6,
			to: 8,
			speed: 10,
			loop: true,
		},
		"jump": 1
	},
})

const SPEED = 120
const JUMP_FORCE = 240

gravity(640)

const player = add([
	sprite("dino"),
	pos(center()),
	origin("center"),
	scale(1/3) ,
	area(),
	body(),
	
])

player.play("idle")
add([
	rect(width(), 24),
	area(),
	outline(1),
	pos(0, height() - 24),
	solid(),
])

player.onGround(() => {
	if (!isKeyDown("left") && !isKeyDown("right")) {
		player.play("idle")
	} else {
		player.play("run")
	}
})

player.onAnimEnd("idle", () => {
})

onKeyPress("space", () => {
	if (player.isGrounded()) {
		player.jump(JUMP_FORCE)
		player.play("jump")
	}
})

onKeyDown("left", () => {
	player.move(-SPEED, 0)
	player.flipX(true)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
	player.flipX(false)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyRelease(["left", "right"], () => {
	if (!isKeyDown("left") && !isKeyDown("right")) {
		player.play("idle")
	}
})

const getInfo = () => `
Anim: ${player.curAnim()}
Frame: ${player.frame}
`.trim()

const label = add([
	text(getInfo()),
	pos(4),
])

label.onUpdate(() => {
	label.text = getInfo()
})