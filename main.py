def on_a_pressed():
    animation.run_image_animation(NgadiniPlayer,
        assets.animation("""
            NgadiniWalk
        """),
        100,
        True)
    scene.follow_path(NgadiniPlayer, path, 100)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    if NovitaNPC.overlaps_with(NgadiniPlayer):
        animation.stop_animation(animation.AnimationTypes.ALL, NgadiniPlayer)
        animation.run_image_animation(NovitaNPC,
            assets.animation("""
                NovitaFound
            """),
            100,
            True)
        NovitaNPC.say_text("You Got Me!", 200, False)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap)

path: List[tiles.Location] = []
NovitaNPC: Sprite = None
NgadiniPlayer: Sprite = None
scene.set_background_color(7)
game.set_dialog_frame(assets.image("""
    DialogFrame
"""))
game.show_long_text("Smart Player AI\\nMovement Auto Player to NPC using A Star Algorithm\\nPress Button A to start\\nBy Yohan\\nSurel:\\nyohanadisetiawan@gmail.com",
    DialogLayout.CENTER)
tiles.set_current_tilemap(tilemap("""
    level1
"""))
NgadiniPlayer = sprites.create(assets.image("""
    Ngadini
"""), SpriteKind.player)
NovitaNPC = sprites.create(assets.image("""
    Novita
"""), SpriteKind.food)
tiles.place_on_random_tile(NgadiniPlayer, sprites.dungeon.collectible_insignia)
tiles.place_on_random_tile(NovitaNPC, sprites.dungeon.chest_closed)
scene.camera_follow_sprite(NgadiniPlayer)
controller.move_sprite(NgadiniPlayer)
NgadiniLocation = NgadiniPlayer.tilemap_location()
NovitaLocation = NovitaNPC.tilemap_location()
path = scene.a_star(tiles.get_tile_location(NgadiniLocation.column, NgadiniLocation.row),
    tiles.get_tile_location(NovitaLocation.column, NovitaLocation.row))
music.play(music.string_playable(music.convert_rtttl_to_melody("LeisureSuit:d=4,o=6,b=224:f.5,f#.5,g.5,g#5,8a#5,f5,g#.5,a#.5,8f5,g#5,8a#5,g#5,2c#.,a#5,8c#,a5,a#.5,c#.,8a5,a#5,8c#,d#,2e,c#.,f.,f.,f.,f.,f,8e,d#,2d,a#.5,e,8f,e,8f,c#,d#.,c#"),
        120),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)