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
