const mongoose = require('mongoose');
const HorrorCards = mongoose.model('HorrorCards')

exports.horrorDefault = async (req,res) => {
    res.render('horror/main', { title: 'Les contrées de l\'horreur'});
}

exports.horrorListCard = async (req,res) => {
    const list = await HorrorCards.find();
    res.render('horror/listcard', { title: 'Les contrées de l\'horreur - Liste des cartes', listCard : list});
}

exports.horrorAddCard = (req,res) => {
    res.render('horror/addcard', { title: 'Ajouter une carte'});
}


exports.horrorAddCardInBase = async (req,res) => {
    const [origin,name,cardType,text,backText] = Object.values(req.body);
    try{
        const card = await (new  HorrorCards({name:name,cardType:cardType,text:text,backText:backText,origin:origin })).save();
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
