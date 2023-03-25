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
music.play(music.stringPlayable(music.convertRTTTLToMelody("Ampar-Ampar Pisang:d=4,o=5,b=125: 16d,16d,16d,16d,16d,16d,8d,16d,16d,16d,16d,16d,16d,8d,16e,16e,16f#,16f#,16f#,16f#,8f#,16f#,16g,16g,16g,16g,16g,16g,8g,16a,16a,16a,16a,16a,16a,8a,16b,16b,16c#,16c#,16c#,16c#,8c#,16d,16d,16d,16d,16d,16d,8d,16e,16e,16f#,16f#,16f#,16f#,8f#,16f#,16g,16g,16g,16g,16g,16g,8g,16a,16a,16a,16a,16a,16a,8a,16b,16b,16c#,16c#,16c#,16c#,8c#,16d,16d,16d,16d,16d,16d,8d,16e,16e,16f#,16f#,16f#,16f#,8f#,16f#,16g,16g,16g,16g,16g,16g,8g,16a,16a,16a,16a,16a,16a,8a,16b,16b,16c#,16c#,16c#,16c#,8c#,16d,16d,16d,16d,16d,16d,8d,16e,16e,16f#,16f#,16f#,16f#,8f#,16f#,16g,16g,16g,16g,16g,16g,8g,16a,16a,16a,16a,16a,16a,8a,16b,16b,16c#,16c#,16c#,16c#,8c#,16d,16d,16d,16d,16d,16d,8d,16e,16e,16f#,16f#,16f#,16f#,8f#,16f#,16g,16g,16g,16g,16g,16g,8g,16a,16a,16a,16a,16a,16a,8a,16b,16b,16c#,16c#,16c#,16c#,8c#,16d,16d,16d,16d,16d,16d,8d,16e,16e,16f#,16f#,16f#,16f#,8f#,16f#,16g,16g,16g,16g,16g,16g,8g,16a,16a,16a,16a,16a,16a,8a,16b,16b,16c#,16c#,16c#,16c#,8c#,16d,16d,16d,16d,16d,16d,8d,16e,16e,16f#,16f#,16f#,16f#,8f#,16f#,16g,16g,16g,16g,16g"), 120), music.PlaybackMode.LoopingInBackground)
