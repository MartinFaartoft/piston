# Piston [![Build Status](https://travis-ci.org/MartinFaartoft/piston.svg?branch=master)](https://travis-ci.org/MartinFaartoft/piston)
A game engine for making 2D games using HTML5 Canvas

## Example games
* Missile Command [play] (http://ftft.dk/missilecommand/) | [source] (https://github.com/MartinFaartoft/missilecommand) 
* Volley [play] (http://ftft.dk/volley/) | [source] (https://github.com/MartinFaartoft/volley)
* Asteroids [play] (http://ftft.dk/asteroids/) | [source] (https://github.com/MartinFaartoft/asteroids)

## Features
* Collision detection
* Sprite painting and animation
* Movable and zoomable camera
* Reading input from keyboard and mouse
* Resource loading (currently images) before game start

## Changelog

### Version 0.5.0
* Added support for mouse wheel input
* Added Camera class that allows
  * Moving and zooming the camera within a scene
  * Toggling full-screen
* Added Game class to simplify starting a new game
* Renamed Entity to Actor
* Added rotation and rotationSpeed to Actor base class

### Version 0.4.0
* Added Support for mouse input and custom cursor graphics
* Added type annotations where appropriate
* Cleaned up collision detection

### Version 0.3.0
* Cleaned up Engine API
* Cleaned up Entity hiearchy
* Removed BaseGameState - Engine takes over responsibilities

### Version 0.2.0
* Replaced number[] with ps.Vector
