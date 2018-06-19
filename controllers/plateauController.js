
exports.initPlateau = (req,res) => {
    res.render('plateau', { title: 'Plateau'});
}

exports.displayPlateau = (req,res) => {
    const line = req.body.line || 16;
    const column = req.body.column || 16;
    const zoom = req.body.zoom || 1;
    const caseSize = req.body.caseSize || 34
    const map = req.body.map || "error"
    res.render('plateau', { title: 'Plateau', line, column, zoom, caseSize, map });
}