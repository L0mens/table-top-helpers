const mongoose = require('mongoose');
const HorrorMiniCards = mongoose.model('HorrorMiniCards');
const HorrorEncounterCards = mongoose.model('HorrorEncounterCards');

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

/*
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
*/
exports.horrorAddCardInBase = async (req,res) => {
    
    const[hidden] = Object.values(req.body); //First value must be the hidden input 

    try{
        var myCard;
        switch(hidden){
            case "mini":
                myCard = createMiniCard(req.body);
                break;
            case "encounter":
                myCard = createEncounterCard(req.body);
                break;
            default : 
                req.flash('error', 'Erreur de formulaire');
                res.redirect('/horror/add-card');
        }

        if(myCard != undefined){
            await myCard.save();
            req.flash('success', 'Carte crée');
        }
        else{
            req.flash('error', 'Erreur carte undefined');
        }
        
        
        res.redirect('/horror/add-card');
    }catch(err){
        console.log(err);
        const key = Object.keys(err.errors);
        key.forEach(element => {
            req.flash('error', 'Erreur ' + err.errors[element].message);
        });
        
        res.redirect('/horror/add-card');
    }
    
    
}

function createMiniCard(body){
    const [hidden,origin,name,cardType,cardSousType,text,backText,trigger] = Object.values(body);
    const card = new  HorrorMiniCards({
        name:name,
        cardType:cardType,
        cardSousType:cardSousType,
        text:text,
        backText:backText,
        origin:origin,
        trigger:trigger
    });
    return card;
}

function createEncounterCard(body){
    
    const [hidden,origin,name,type,lieux,titleOne,contentOne,titleTwo,contentTwo,titleThree,contentThree,num] = Object.values(body);
    const texts = [
        {title: titleOne,content: contentOne}, 
        {title: titleTwo,content: contentTwo}, 
        {title: titleThree,content: contentThree}
    ];
    console.log(texts)
    const card = new HorrorEncounterCards({
        questName : name,
        cardType : type,
        place : lieux,
        texts : texts,
        numero : num,
        origin : origin
    });
    console.log(card);
    return card;
}


