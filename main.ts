controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    NgadiniPlayer,
    assets.animation`NgadiniWalk`,
    100,
    true
    )
    scene.followPath(NgadiniPlayer, path, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (NovitaNPC.overlapsWith(NgadiniPlayer)) {
        animation.stopAnimation(animation.AnimationTypes.All, NgadiniPlayer)
        animation.runImageAnimation(
        NovitaNPC,
        assets.animation`NovitaFound`,
        100,
        true
        )
        NovitaNPC.sayText("You Got Me!", 200, false)
    }
})
let path: tiles.Location[] = []
let NovitaNPC: Sprite = null
let NgadiniPlayer: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
NgadiniPlayer = sprites.create(assets.image`Ngadini`, SpriteKind.Player)
NovitaNPC = sprites.create(assets.image`Novita`, SpriteKind.Food)
tiles.placeOnRandomTile(NgadiniPlayer, sprites.dungeon.collectibleInsignia)
tiles.placeOnRandomTile(NovitaNPC, sprites.dungeon.chestClosed)
scene.cameraFollowSprite(NgadiniPlayer)
controller.moveSprite(NgadiniPlayer)
let NgadiniLocation = NgadiniPlayer.tilemapLocation()
let NovitaLocation = NovitaNPC.tilemapLocation()
path = scene.aStar(tiles.getTileLocation(NgadiniLocation.column, NgadiniLocation.row), tiles.getTileLocation(NovitaLocation.column, NovitaLocation.row))
music.play(music.stringPlayable(music.convertRTTTLToMelody("LeisureSuit:d=4,o=6,b=224:f.5,f#.5,g.5,g#5,8a#5,f5,g#.5,a#.5,8f5,g#5,8a#5,g#5,2c#.,a#5,8c#,a5,a#.5,c#.,8a5,a#5,8c#,d#,2e,c#.,f.,f.,f.,f.,f,8e,d#,2d,a#.5,e,8f,e,8f,c#,d#.,c#"), 120), music.PlaybackMode.LoopingInBackground)
