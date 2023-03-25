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
music.play(music.string_playable(music.convert_rtttl_to_melody("lihatkebunkufunky:d=4,o=5,b=140:16g.,16f.,16g.,16g.,16a.,16g.,8f.,16e.,16f.,16g.,16g.,16f.,16g.,16g.,16a.,8g.,16g.,16f.,16g.,16g.,16a.,16g.,8f.,16e.,16f.,16g.,16g.,16f.,16g.,16g.,16a.,8g.,16g.,16f.,16g.,16g.,16a.,16g.,8f.,16e.,16f.,16g.,16g.,16f.,16g.,16g.,16a.,8g.,16g.,16f.,16g.,16g.,16a.,16g.,8f.,16e.,16f.,16g.,16g.,16f.,16g.,16g.,16a.,8g.,16g.,16f.,16g.,16g.,16a.,16g.,8f.,16e.,16f.,16g.,16g.,16f.,16g.,16g.,16a.,8g.,16g.,16f.,16g.,16g.,16a.,16g.,8f.,16e.,16f.,16g.,16g.,16f.,16g.,16g.,16a.,8g.,16g.,16f.,16g.,16g.,16a.,16g.,8f.,16e.,16f.,16g.,16g.,16f.,16g.,16g.,16a.,8g.,16g.,16f.,16g.,16g.,16a.,16g.,8f.,16e.,16f.,16g.,16g.,16f.,16g.,16g.,16a.,8g.,16g.,16f.,16g.,16g.,16a.,16g.,8f.,16e.,16f.,16g.,16g"),
        140),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)