const Game = require('../models/Game');

module.exports = {
    showCategories,
    showInstructions,
    createGame,
    gameOver,
    settings
}

function showCategories(req, res) {
    res.render('games/categories');
};

function showInstructions(req, res) {
    res.render('games/instructions');
}

function createGame(req, res) {
    var game = new Game({
        categoryId: req.params.catId,
        user: req.user
    });
    game.save(function(err) {
        res.render('games/main', {gameId: game._id});
    });
};

function gameOver(req, res) {
    Game.findById(req.params.gameId, function(err, game) {
        if (err) return res.status(400).json({err});
        var totalDrinks = game.questions.reduce((acc, q) => acc + q.numDrinks, 0);
        res.render('games/gameover', {totalDrinks});
    });
}

function settings(req, res) {
    res.render('games/settings');
}