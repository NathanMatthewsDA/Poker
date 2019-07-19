# Poker
Poker game implemented in DAML

Introduction

Tutorial on how you might model Poker in DAML.
Rules of the game.
Turn based.
Chips
House
Rounds

To effectively model a workflow in DAML we start by identying the various participants in the workflow. For our poker game I've identified the following participants. Note a participant might not be an actual person, it might be a process, organiosation or something else. 

Participant in the poker game:

House - maintains chips
Dealer - party responsible for card shuffling and dealing cards
Players - The actual players in the game, each player is an individual participant.

Poker as a workflow.

A poker game progresses through various phases. 
In any betting round players may fold reducing the number of active players in the game. If at any point in the betting round theres only one unfolded polayer left, they are the winner and the game ends prematurely.

Rre-flop
Check Round
Betting Round
Flop Deal

Flop
Check Round
Betting Round
Card Deal

Turn
Check Round
Betting Round
Card Deal

River
Check Round
Betting Round

Showdown

Modelling tradeoff.

create four empty templates

We could model all the required game data about the structure of the game for each template. 
shared game data.
...

Check Round
Betting Round
Showdown

We can model each phase as a contract template.


Player actions

Before a round start the player puts their chips they want to bet with on the table. This stack of chips cannot be added to during the round. The stack of chips is visible to all other players.

We have a contract representing the game state. The game state represents the current state of the game and is visible to all players and the house and the dealer.
