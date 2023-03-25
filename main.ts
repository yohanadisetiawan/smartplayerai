controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    animation.runImageAnimation(NgadiniPlayer, assets.animation`
            NgadiniWalk
        `, 100, true)
    calculateDistenation()
    scene.followPath(NgadiniPlayer, path, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    
    if (NovitaNPC.overlapsWith(NgadiniPlayer)) {
        animation.stopAnimation(animation.AnimationTypes.All, NgadiniPlayer)
        animation.runImageAnimation(NovitaNPC, assets.animation`
                NovitaFound
            `, 100, true)
        NovitaNPC.sayText("You Got Me!", 200, false)
        pause(1000)
        sprites.destroy(NovitaNPC, effects.fountain, 500)
        pause(100)
        NgadiniPlayer.sayText("Press A to next Journey.", 200, false)
        pause(2000)
        NovitaNPC = sprites.create(assets.image`
            Novita
        `, SpriteKind.Food)
        tiles.placeOnRandomTile(NovitaNPC, sprites.dungeon.chestClosed)
    }
    
})
function calculateDistenation() {
    
    NgadiniLocation = NgadiniPlayer.tilemapLocation()
    NovitaLocation = NovitaNPC.tilemapLocation()
    path = scene.aStar(tiles.getTileLocation(NgadiniLocation.column, NgadiniLocation.row), tiles.getTileLocation(NovitaLocation.column, NovitaLocation.row))
}

let NovitaLocation : tiles.Location = null
let NgadiniLocation : tiles.Location = null
let path : tiles.Location[] = []
let NovitaNPC : Sprite = null
let NgadiniPlayer : Sprite = null
scene.setBackgroundColor(7)
game.setDialogFrame(assets.image`
    DialogFrame
`)
game.showLongText("Smart Player AI\\nMovement Auto Player to NPC using A Star Algorithm\\nPress Button A to start\\nBy Yohan\\nSurel:\\nyohanadisetiawan@gmail.com", DialogLayout.Center)
tiles.setCurrentTilemap(tilemap`
    level1
`)
NgadiniPlayer = sprites.create(assets.image`
    Ngadini
`, SpriteKind.Player)
NovitaNPC = sprites.create(assets.image`
    Novita
`, SpriteKind.Food)
tiles.placeOnRandomTile(NgadiniPlayer, sprites.dungeon.collectibleInsignia)
tiles.placeOnRandomTile(NovitaNPC, sprites.dungeon.chestClosed)
scene.cameraFollowSprite(NgadiniPlayer)
controller.moveSprite(NgadiniPlayer)
music.play(music.stringPlayable(music.convertRTTTLToMelody("Bungong Jumpa:d=4,o=5,b=125:16f#6,16f#6,16f#6,16f#6,16f#6,8d6,16d6,16d6,16d6,16d6,16d6,8c#6,16c#6,16c#6,16c#6,16c#6,8b5,16b5,16b5,16b5,16b5,16b5,8a5,16a5,16a5,16a5,16a5,16a5,8g#5,16g#5,16g#5,16g#5,16g#5,16g#5,8f#5,16f#5,16f#5,16f#5,16f#5,16f#5,8d#5,16d#5,16d#5,16d#5,16d#5,16d#5,8c#5,16c#5,16c#5,16c#5,16c#5,16c#5,8b4,16b4,16b4,16b4,16b4,16b4,8a4,16a4,16a4,16a4,16a4,16a4,8g#4,16g#4,16g#4,16g#4,16g#4,16g#4,8f#4,16f#4,16f#4,16f#4,16f#4,16f#4,8d#4,16d#4,16d#4,16d#4,16d#4,16d#4,8c#4,16c#4,16c#4,16c#4,16c#4,16c#4,8b3,16b3,16b3,16b3,16b3,16b3,8a3,16a3,16a3,16a3,16a3,16a3,8g#3,16g#3,16g#3,16g#3,16g#3,16g#3,8f#3,16f#3,16f#3,16f#3,16f#3,16f#3,8d#3,16d#3,16d#3,16d#3,16d#3,16d#3,8c#3,16c#3,16c#3,16c#3,16c#3,16c#3,8b2,16b2,16b2,16b2,16b2,16b2,8a2,16a2,16a2,16a2,16a2,16a2,8g#2,16g#2,16g#2,16g#2,16g#2,16g#2,8f#2,16f#2,16f#2,16f#2,16f#2,16f#2,8d#2,16d#2,16d#2,16d#2,16d#2,16d#2,8c#2"), 120), music.PlaybackMode.LoopingInBackground)
