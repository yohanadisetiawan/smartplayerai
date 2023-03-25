def on_a_pressed():
    animation.run_image_animation(NgadiniPlayer,
        assets.animation("""
            NgadiniWalk
        """),
        100,
        True)
    calculateDistenation()
    scene.follow_path(NgadiniPlayer, path, 100)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    global NovitaNPC
    if NovitaNPC.overlaps_with(NgadiniPlayer):
        animation.stop_animation(animation.AnimationTypes.ALL, NgadiniPlayer)
        animation.run_image_animation(NovitaNPC,
            assets.animation("""
                NovitaFound
            """),
            100,
            True)
        NovitaNPC.say_text("You Got Me!", 200, False)
        pause(1000)
        sprites.destroy(NovitaNPC, effects.fountain, 500)
        pause(100)
        NgadiniPlayer.say_text("Press A to next Journey.", 200, False)
        pause(2000)
        NovitaNPC = sprites.create(assets.image("""
            Novita
        """), SpriteKind.food)
        tiles.place_on_random_tile(NovitaNPC, sprites.dungeon.chest_closed)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap)

def calculateDistenation():
    global NgadiniLocation, NovitaLocation, path
    NgadiniLocation = NgadiniPlayer.tilemap_location()
    NovitaLocation = NovitaNPC.tilemap_location()
    path = scene.a_star(tiles.get_tile_location(NgadiniLocation.column, NgadiniLocation.row),
        tiles.get_tile_location(NovitaLocation.column, NovitaLocation.row))
NovitaLocation: tiles.Location = None
NgadiniLocation: tiles.Location = None
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
music.play(music.string_playable(music.convert_rtttl_to_melody("Bungong Jumpa:d=4,o=5,b=125:16f#6,16f#6,16f#6,16f#6,16f#6,8d6,16d6,16d6,16d6,16d6,16d6,8c#6,16c#6,16c#6,16c#6,16c#6,8b5,16b5,16b5,16b5,16b5,16b5,8a5,16a5,16a5,16a5,16a5,16a5,8g#5,16g#5,16g#5,16g#5,16g#5,16g#5,8f#5,16f#5,16f#5,16f#5,16f#5,16f#5,8d#5,16d#5,16d#5,16d#5,16d#5,16d#5,8c#5,16c#5,16c#5,16c#5,16c#5,16c#5,8b4,16b4,16b4,16b4,16b4,16b4,8a4,16a4,16a4,16a4,16a4,16a4,8g#4,16g#4,16g#4,16g#4,16g#4,16g#4,8f#4,16f#4,16f#4,16f#4,16f#4,16f#4,8d#4,16d#4,16d#4,16d#4,16d#4,16d#4,8c#4,16c#4,16c#4,16c#4,16c#4,16c#4,8b3,16b3,16b3,16b3,16b3,16b3,8a3,16a3,16a3,16a3,16a3,16a3,8g#3,16g#3,16g#3,16g#3,16g#3,16g#3,8f#3,16f#3,16f#3,16f#3,16f#3,16f#3,8d#3,16d#3,16d#3,16d#3,16d#3,16d#3,8c#3,16c#3,16c#3,16c#3,16c#3,16c#3,8b2,16b2,16b2,16b2,16b2,16b2,8a2,16a2,16a2,16a2,16a2,16a2,8g#2,16g#2,16g#2,16g#2,16g#2,16g#2,8f#2,16f#2,16f#2,16f#2,16f#2,16f#2,8d#2,16d#2,16d#2,16d#2,16d#2,16d#2,8c#2"),
        120),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)