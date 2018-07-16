const mongoose = require('mongoose');
const HorrorMiniCards = mongoose.model('HorrorMiniCards')

exports.horrorDefault = async (req,res) => {
    res.render('horror/main', { title: 'Les contrées de l\'horreur'});
}

exports.horrorListCard = async (req,res) => {
    const list = await HorrorMiniCards.find();
    res.render('horror/listcard', { title: 'Les contrées de l\'horreur', listCard : list});
}

exports.horrorAddCard = (req,res) => {
    res.render('horror/addcard', { title: 'Ajouter une carte'});
}


exports.horrorAddCardInBase = async (req,res) => {
    const [origin,name,cardType,cardSousType,text,backText,trigger] = Object.values(req.body);
    try{
        const card = await (new  HorrorMiniCards({
            name:name,
            cardType:cardType,
            cardSousType:cardSousType,
            text:text,
            backText:backText,
            origin:origin,
            trigger:trigger
        })).save();
        req.flash('success', 'Carte crée');
        console.log(card);
        res.redirect('/horror/add-card');
    }catch(err){
        const key =Object.keys(err.errors);
        key.forEach(element => {
            req.flash('error', 'Erreur ' + err.errors[element].message);
        });
        
        res.redirect('/horror/add-card');
    }
    
}
